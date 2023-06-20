import { useState, useEffect, useContext } from "react";
import { CourseDataAPI } from "../../services/apis/CourseDataAPI";
import { ProgramDataAPI } from "../../services/apis/ProgramDataAPI";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";
import { PriceAPI } from "../../services/apis/PriceAPI";
import _ from "lodash";
import { CartAPI } from "../../services/apis/CartAPI";
import { useIonRouter } from "@ionic/react";
import { routes, ToastVariants } from "../../utils/constants";
import useToast from "../../hooks/useToast";


const useProgramInfo = (id) => {
  var { programId } = useParams();
  if (!programId) {
    console.log("Current program id is", programId);
    programId = id;
  }
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [courses, setCourses] = useState([]);
  const [program, setProgram] = useState();
  const { user, auth, updateCartItemCount } = useContext(AuthContext);
  const [programPostOfferPrice, setProgramPrice] = useState();
  const [programBasicPrice, setProgramBasicPrice] = useState();
  const router = useIonRouter();

  const checkoutProgram = async (e) => {
    e.preventDefault();
    // await CartAPI.clearCartItems(user.userId);
    var currentCartItems = await CartAPI.getCartItems(user.userId);
    console.log("Cartitems", currentCartItems);
    console.log("User id,programid", user.userId, program.id);
    var programItem = await CartAPI.createCartItem(
      program.id,
      "program",
      user.userId
    );
    console.log("Program Added...", programItem);
    showToast("Program Successfully added to cart.", ToastVariants.success);
    // get latest count from backend
    updateCartItemCount(programItem.data.count);
    // router.push(routes.checkout, "forward", "push");
    //alert("Want to subsribe to platform ?")
  };

  const getCourses = (courseIds) => {
    var coursesFiltered = [];
    if (Array.isArray(courseIds)) {
      courseIds.forEach((element) => {
        var found = courses.find((item) => {
          return item.id === element;
        });
        if (found) {
          coursesFiltered.push(found);
        }
      });
    } else {
      console.log(
        "invalid params passed for getCourses expected array",
        courseIds
      );
    }
    console.log("Courses found....", coursesFiltered);
    return coursesFiltered;
  };

  const loadCourses = async (courseIds) => {
    var params = new URLSearchParams();
    params.append("showPrices", true);
    courseIds.forEach((course) => {
      params.append("id", course);
      console.log("Params:", ...Array.from(params.entries()));
    });

    var coursesRes = await CourseDataAPI.getCoursesProg(params);
    console.log("Retrieved courses data..", coursesRes.data.data.courses);
    var coursesExtract = coursesRes.data.data.courses;
    // var transformedCourses = coursesExtract.map((course)=>{
    //   return  { value: course.id , label: course.title }
    // })
    setCourses(coursesExtract);
  };

  const getProgramData = async () => {
    try {
      setLoading(true);
      setError(false);

      console.log("Getting data for programId", programId);

      const { data: programResponseData } =
        await ProgramDataAPI.getProgramDetails(programId, {});
      console.log("Recieved program data:", programResponseData);
      if (programResponseData.status === "SUCCESS") {
        setProgram(programResponseData.data.programs[0]);
        console.log(
          "CourseIds:",
          programResponseData.data.programs[0].courseIds
        );
        await loadCourses(programResponseData.data.programs[0].courseIds);
        await fetchProgramPriceData();
      } else {
        throw programResponseData.message;
      }
    } catch (error) {
      setError(true);
      console.error(
        "useProgramInfo: getProgramData: getting data failed, error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const getData = async () => {
    try {
      setLoading(true);
      setError(false);
      await getProgramData();
    } catch (error) {
      setError(true);
      console.error(
        "useProgramsInfo: getCourses: getting data failed, error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  async function fetchProgramPriceData() {
    // You can await here
    const programPrice = await PriceAPI.getPriceDetails(programId, "program");
    console.log("Platform price is", programPrice[0]);
    if (programPrice) {
      setProgramPrice(programPrice[0].postOfferPrice);
      setProgramBasicPrice(programPrice[0].basicPrice);
    } else {
      console.log("unable to retrive program price.");
    }

    // ...
  }

  // useEffect(() => {
  //   getData();
  // }, [programId]);

  // useEffect(() => {
  //   //first check if local user object exists
  //   if (user && !_.isEmpty(user)) {
  //     // alert("Seems you are already loogged in.. wanna go whre you left off.");
  //     // 1) Verify if accees token is valid -
  //     console.log(user, auth);

  //     //then push the user to landing page/ courses.
  //   }

  //   // 2) If access token is not valid then

  //   // 3) Send refresh token to get new access token.

  //   // 4) if we got new access token then - push to user landign page / courses.

  //   // 5) if we get refresh token is expired then redirect to login page...

  //   return () => {};
  // }, []);

  useEffect(() => {
    getData();
  }, []);

  return {
    loading,
    program,
    courses,
    programBasicPrice,
    programPostOfferPrice,
    checkoutProgram,
  };
};

export default useProgramInfo;
