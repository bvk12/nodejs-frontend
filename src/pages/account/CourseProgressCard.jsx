import { useIonRouter } from "@ionic/react";
import { Badge, Card } from "react-bootstrap";
import ProgressBar from 'react-bootstrap/ProgressBar';

const CourseProgressCard = (props) => {
  const {
    title,
    id,  
    courseType='course', 
    shortDescription,
    thumbnailUrl,
    progress
  } = props;

  const router = useIonRouter();

  function handleClick() {
    if(courseType==='course')
    router.push(`/course/${id}`);
    if(courseType==='program')
    router.push(`/program/${id}`);
  }

  return (
    <Card className="course-card" onClick={handleClick}>
      <Badge variant="primary" className="card-badge">
        <i className="fas fa-book" />
        <span style={{ fontSize: "0.6rem" }}>{courseType=="course"?"Course":"Program"}</span>
      </Badge>
      <Card.Body style={{ padding: 15 }}>
        <Card.Img className="card-image" variant="top" src={thumbnailUrl} />
        <Card.Title>{title}</Card.Title>
       
        {progress >=0 ? <>
        <ProgressBar label="" animated now={progress}></ProgressBar>
        <span style={{ fontSize: "1rem" }}>&nbsp; &nbsp;Completed {progress}%</span>
        </> : <></>
        }
      </Card.Body>      
    </Card>
  );
};

export default CourseProgressCard;
