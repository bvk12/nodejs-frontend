import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import { CourseDataAPI } from "../services/apis/CourseDataAPI";
import _ from "lodash";
import { isCourseFree } from "../utils/helper";
import { CartAPI } from "../services/apis/CartAPI";
import useToast from "./useToast";
import { InstanceTypes, ToastVariants } from "../utils/constants";
import { SubscriptionContext } from "../context/SubscriptionContextProvider";

const useCoursePage = () => {
  const { courseId } = useParams();
  const { showToast } = useToast();

  const { user, isUserLoggedIn, updateCartItemCount } = useContext(AuthContext);
  const { isPartnerInstance } = useContext(SubscriptionContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // using this to forcefully retrigger state updates
  const [dummyCount, setDummyCount] = useState(0);

  const [courseData, setCourseData] = useState();

  const reactPlayerRef = useRef(null);
  const [isReactPlayerMounted, setIsReactPlayerMounted] = useState(false);

  const [selectedChapter, setselectedChapter] = useState();
  const [selectedSectionId, setselectedSectionId] = useState("");
  const [courseSubscriptions, setCourseSubscriptions] = useState();

  const getCourseSubscriptions = async () => {
    try {
      // check for course subsrciptions only if user is logged in
      if (!isUserLoggedIn()) return;

      const { data: courseSubscriptionData } =
        await CourseDataAPI.getCourseSubscription({
          courseProgBundleId: courseId,
          courseType: "course",
        });

      if (courseSubscriptionData.status === "SUCCESS") {
        setCourseSubscriptions(courseSubscriptionData.data.subscriptions);
      } else {
        throw courseSubscriptionData.message;
      }
    } catch (error) {
      console.error(
        "getCourseSubscriptions: getting subsbcriptions failed",
        error
      );

      setCourseSubscriptions();
    }
  };

  useEffect(() => {
    getCourseSubscriptions();
  }, [user]);

  const getCourseData = async () => {
    try {
      setLoading(true);
      setError(false);

      const { data: courseResponseData } = await CourseDataAPI.getCourseDetails(
        courseId
      );

      if (courseResponseData.status === "SUCCESS") {
        setCourseData(courseResponseData.data.course);

        let newCourseData = courseResponseData.data.course;
        const { lastPlayedSectionData } = newCourseData;

        if (newCourseData.chapters && newCourseData.chapters.length > 0) {
          if (lastPlayedSectionData && lastPlayedSectionData.chapterId) {
            let newChapter = newCourseData.chapters.find(
              (chapter) => chapter.id === lastPlayedSectionData.chapterId
            );

            // playing the last played video
            if (newChapter) {
              setselectedChapter(newChapter);
              setselectedSectionId(lastPlayedSectionData.sectionId);
              console.info(
                "useCoursePage: got user history, playing latest played video"
              );
            } else {
              setselectedChapter(newCourseData.chapters[0]);
              let firstChapter = newCourseData.chapters[0];

              if (firstChapter.sections && firstChapter.sections.length > 1) {
                setselectedSectionId(firstChapter.sections[0].id);
              }

              console.info(
                "useCoursePage: didn't find user history, so loading first chapter and section "
              );
            }
          } else {
            setselectedChapter(newCourseData.chapters[0]);

            let firstChapter = newCourseData.chapters[0];

            if (firstChapter.sections && firstChapter.sections.length > 1) {
              setselectedSectionId(firstChapter.sections[0].id);
            }

            console.info(
              "useCoursePage: didn't find user history, so loading first chapter and section "
            );
          }
        } else {
          throw courseResponseData.message;
        }
      }

      const { data: courseSubscriptionData } =
        await CourseDataAPI.getCourseSubscription({
          courseProgBundleId: courseId,
          courseType: "course",
        });

      if (courseSubscriptionData.status === "SUCCESS") {
        setCourseSubscriptions(courseSubscriptionData.data.subscriptions);
      } else {
        throw courseSubscriptionData.message;
      }
    } catch (error) {
      setError(true);
      console.error(
        "useCoursePage: getCourseData: getting data failed, error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourseData();
  }, []);

  const handleChapterClick = (chapterData) => {
    setselectedSectionId(0);
  };

  const handleSectionClick = (chapterData, section) => {
    setselectedChapter(chapterData);
    setselectedSectionId(section.id);
  };

  const getSelectedSection = () => {
    if (!selectedChapter || !selectedChapter.sections) return {};

    let section = selectedChapter.sections.find(
      (section) => section.id === selectedSectionId
    );

    return section || {};
  };

  const sendSectionProgress = async (progressData) => {
    // if user is not logged in, no need to track progress
    if (!isUserLoggedIn()) return;
    const playingSection = getSelectedSection();

    const completedPercentage = Math.floor(
      Math.max(
        playingSection.completedPercentage || 0,
        progressData.played * 100
      )
    );
    const completedDuration = Math.floor(
      Math.max(
        playingSection.completedDuration || 0,
        progressData.playedSeconds
      )
    );

    const sectionProgressData = {
      chapterId: selectedChapter.id,
      sectionId: selectedSectionId,
      courseId: Number(courseId),
      completedPercentage: completedPercentage,
      completedDuration: completedDuration,
      lastPlayedTime: Math.floor(progressData.playedSeconds),
      isCompleted: false,
    };

    if (progressData.played >= 0.99) {
      sectionProgressData.isCompleted = true;
    }

    try {
      await CourseDataAPI.sendSectionProgress({
        watchHistory: sectionProgressData,
      });

      playingSection.completedDuration = completedDuration;
      playingSection.completedPercentage = completedPercentage;
      playingSection.lastPlayedTime = progressData.playedSeconds;
      playingSection.isCompleted = progressData.isCompleted;

      // to update the UI state
      setDummyCount(dummyCount + 1);
    } catch (error) {
      console.error("throttledSectionProgress: sending progress failed", error);
    }
  };

  const handleSectionCheckbox = async (sectionData, checked) => {
    const sectionProgressData = {
      chapterId: selectedChapter.id,
      sectionId: sectionData.id,
      courseId: Number(courseId),
      completedPercentage: Math.floor(
        sectionData.completedPercentage ? sectionData.completedPercentage : 0
      ),
      completedDuration: Math.floor(
        sectionData.completedDuration ? sectionData.completedDuration : 0
      ),
      lastPlayedTime: Math.floor(
        sectionData.lastPlayedTime ? sectionData.lastPlayedTime : 0
      ),
      isCompleted: checked,
    };

    try {
      await CourseDataAPI.sendSectionProgress({
        watchHistory: sectionProgressData,
      });

      sectionData.isCompleted = checked;

      // to update the UI state
      setDummyCount(dummyCount + 1);
    } catch (error) {
      console.error("throttledSectionProgress: sending progress failed", error);
    }
  };

  const isCourseSectionLocked = (section) => {
    const isFreeCourse = isCourseFree(courseData.contentSpecialityTags);
    if (isFreeCourse) return false;

    // for partner instance, if user is logged in, show course
    if (isPartnerInstance() && isUserLoggedIn()) {
      return false;
    }

    return !(
      section.isFree ||
      (courseSubscriptions && courseSubscriptions.length >= 1)
    );
  };

  const showCheckbox = () => {
    return isUserLoggedIn();
  };

  const setVideoSeekProgress = () => {
    const playingSection = getSelectedSection();

    if (_.isEmpty(playingSection)) return;

    try {
      reactPlayerRef?.current?.seekTo(playingSection.lastPlayedTime);
    } catch (error) {
      console.error("useCoursePage: seeking video", error);
    }
  };

  useEffect(() => {
    setVideoSeekProgress();
  }, [selectedSectionId]);

  const handlePlayerReady = () => {
    // for the first time when user comes to course page, we need to do seek the video as ref is unavailable then.
    if (!isReactPlayerMounted) {
      setIsReactPlayerMounted(true);

      setVideoSeekProgress();
    }
  };

  // TODO: refactor and move this to a common place and use it everywhere.
  const addCourseToCart = async () => {
    var courseItem = await CartAPI.createCartItem(
      courseId,
      "course",
      user.userId
    );
    if (courseItem) {
      showToast(
        "Good Choice - Selected Item added to Cart.",
        ToastVariants.success
      );
      console.log("Course Added...", courseItem);
    }
    // get latest count from backend
    updateCartItemCount(courseItem.data.count);
  };

  return {
    loading,
    courseData,
    handleSectionClick,
    handleChapterClick,
    getSelectedSection,
    selectedSectionId,
    sendSectionProgress,
    handleSectionCheckbox,
    reactPlayerRef,
    isCourseSectionLocked,
    showCheckbox,
    addCourseToCart,
    handlePlayerReady,
  };
};

export default useCoursePage;
