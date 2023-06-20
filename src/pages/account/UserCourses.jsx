import { Card, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { CourseDataAPI } from "../../services/apis/CourseDataAPI";
import Block from "../../components/Block/Block";
import CourseProgressCard from "./CourseProgressCard";
import CourseFavouriteCard from "./CourseFavouriteCard";
import { ProgramDataAPI } from "../../services/apis/ProgramDataAPI";

const UserCourses = () => {
  const [progressData, setProgressData] = useState([]);
  const [allCourseData, setAllCourseData] = useState([]);
  const [allProgramData, setAllProgramData] = useState([]);

  function getCourseInfo(courseId) {
    var result =  {};
    result =  allCourseData.find((item) => (item.id === courseId));
   // console.log("Result of finding course from all course", result);
    return result;
  }
 
  
  function getProgramInfo(courseId) {
    var result =  {};
    result =  allProgramData.find((item) => (item.id === courseId));
   // console.log("Result of finding program from all programs", result);
    return result;
  }

  function calculateProgramProgress(progressData,allProgramData){
    //console.log("Calculating the program level progress.",progressData,allProgramData);
     progressData.map((progressItem)=>{
      if(progressItem.courseType ==='program'){
        //console.log("Program type detected:",progressItem.courseId,allProgramData)
        var programCourses = allProgramData.find((program)=> {
          //console.log("Program",program,progressItem,progressItem.courseId === program.id)
          return progressItem.courseId === program.id
        });
       // console.log("Course ids for program",programCourses.courseIds);        
         
        let courseCount = programCourses.courseIds.length;
        let sumOfProgressPercent = 0;
        programCourses.courseIds.forEach((course) => {
         let courseProgressData = progressData.find((pgData) => {
          console.log("progres item",pgData,course)
                return (course===pgData.courseId) 
          });
          console.log("Found courseDAta progress for ",progressData,courseProgressData)
          if(courseProgressData)
            sumOfProgressPercent += courseProgressData.completedPercentage;
            console.log("Calculated sum of progress",sumOfProgressPercent)
        });
        progressItem.completedPercentage = sumOfProgressPercent/courseCount;
        console.log("Calculated sum of progress",progressItem.completedPercentage)
      }
      else if(progressItem.courseType === 'course'){
       // console.log("Course type detected:",item.courseId)
        return false;
      }
      console.log("Final Item",progressItem);
    })
    console.log("New progress data",progressData)
    return progressData;
  }

  useEffect( () => {
    async function fetchData() {
      // You can await here
    //  console.log("Fetching data....",new Date())
      var apiProgressResponse = await CourseDataAPI.getCoursesProgress();
     // console.log("Progress Data...", apiProgressResponse.data.data.progress)
      var courseData = await CourseDataAPI.getCourses();
     // console.log("Fetching courses...", courseData)
      var apiProgramsResponse = await ProgramDataAPI.getPrograms();

      //await ProgramDataAPI.getProgramDetails(programId, {});

     // console.log("Program data:",apiProgramsResponse);
      setProgressData(calculateProgramProgress(apiProgressResponse?.data?.data.progress,apiProgramsResponse?.data?.data.programs));
      setAllProgramData(apiProgramsResponse?.data?.data.programs);    
     
      //setProgressData(apiProgressResponse?.data?.data.progress);
      setAllCourseData(courseData?.data?.data.courses);
     // console.log("Recieved all courses...", courseData?.data?.data.courses);
    }
     fetchData();
  }, []);

  // useEffect(()=>{
  //   console.log("Progress Data Changed...",progressData);
   
  // },[progressData])
 
  const renderCourseCards = () => {
    return progressData.map((courseInfo) => {
    //  console.log("CoursePrg:", courseInfo);
      var course = {}
      if(courseInfo.courseType == "course"){
        course = getCourseInfo(courseInfo.courseId);
      }
      else if(courseInfo.courseType == "program"){
        var program = getProgramInfo(courseInfo.courseId);   
        course.shortDescription = program.description;
        course.thumbnailUrl = program.bannerUrl;
        course.id = program.id;   
        course.title = program.title; 
        course.courseType = "program"   
      }
      
      console.log("Looked up course info from all course",course);
      if(course ){
      return (
        <Col key={course.id} md={5} sm={6} style={{margingBottom:"10px"}}>
          <CourseProgressCard
            {...course}
            progress={courseInfo?.completedPercentage}
          />
        </Col>
      );
      }else{
        return (<></>)
      }
    });
  
  };

  return (
    <>
      <Block>
        <Card >
          <Card.Body>
            <Card.Title>My Progress</Card.Title>           
            <Row lg={9}  className="mt-4 card-listing-container">{renderCourseCards()}</Row>
          </Card.Body>
        </Card>
      </Block>
    </>
  );
};

export default UserCourses;
