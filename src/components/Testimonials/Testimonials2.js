import Carousel from 'react-bootstrap/Carousel';
import "./Testimonials.css";
import RedElement from "../../assets/images/redElement.png"
import GreenElement from "../../assets/images/greenElement.png"
import styled from 'styled-components';
import backgroundQuotes from "./Quotes.png";
import testiBackground from "./collage-customer-experience-concept.jpg"
import testiBackground2 from "../../assets/images/Testimonials.png"
import userImage from "../../assets/images/profile.svg"
import { Row, Col } from 'react-bootstrap';


const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display:flex;
    align-items: center;
    background-image: url(${testiBackground2});
    background-size: cover;
    background-repeat: no-repeat;
    --opacity: 0.8;
    `
const Wrapper = styled.div`
    width: 80%;
    height: 80%;
    display:flex;
    align-items: center;
    justify-content:center;
    margin:auto;
    background-color:#012f6b;
    position: 'absolute';  
`

const QuoteCircle = styled.div`
    border-radius:50%;
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    background-image: url(${backgroundQuotes});
    background-size: cover;
    background-repeat: no-repeat;
    background-color:yellow;
    position: absolute;
    top: -${props => props.top}px;
    left:${props => props.left}px;;
    padding:5px;
`

const TestimonialIntro = styled.div`
    display:flex;
    flex-direction: column;
    paddin:10px;
    margin:10px;
   
`

const TestimonialsIntroHeader = styled.h2`
    color: white;
    font-family: arial;
`

const TestimonialsIntoDetail = styled.p`
  color:white;
`

const TestimonialCard = styled.div`
    display:flex;
    position: relative;
    flex-direction:column;
    border: 1px solid white;
    background: white;
    border-radius:10px;
   
    padding: 10px;
    gap:5px;
`

const Image = styled.img`
    border-bottom:solid 20px #e3e3e3;
`
const User = styled.div`
    border-bottom: 10px gray;
`
const Name = styled.h3`
    padding-left: 10px;
    margin:0px;
`

const AboutUser = styled.p`
    padding-left:10px;
    margin: 0;
    color: #73756f;
`

const ReviewText = styled.p`
    position: relative;
    padding: 10px;
    margin:0px;
`

const Testimonials2 = () => {
    return (
        <>


            <Container>
                <Wrapper>
                 
                </Wrapper>
                <Row md={12}>
                        <Col md={3}>
                            <QuoteCircle size="200" top="100" left="20" />
                        </Col>
                        <Col md={3}>
                            <TestimonialIntro>
                                <TestimonialsIntroHeader>Listen to our Customers what they say</TestimonialsIntroHeader>
                                <TestimonialsIntoDetail>
                                    Dear VisualpathTech user, Thanks for your valuable review. We, VisualpathTech will always strive to give you the latest and best video courses possible.
                                </TestimonialsIntoDetail>
                            </TestimonialIntro>
                        </Col>
                        <Col md={3}>
                            <TestimonialCard>
                                <Image src={userImage}></Image>
                                <ReviewText>
                                    <QuoteCircle size="40" top="45" left="15"></QuoteCircle>
                                    <i>I could level up in my career, all credits to VisualpathTech for the informative, easy-to-understand, and self-paced video courses.</i></ReviewText>
                                <User>
                                    <Name>Venkat</Name>
                                    <AboutUser><i>FS369</i></AboutUser>
                                </User>
                            </TestimonialCard>
                        </Col>
                        <Col md={3}>
                            <TestimonialCard>
                                <Image src={userImage}></Image>
                                <ReviewText>
                                    <QuoteCircle size="40" top="45" left="15"></QuoteCircle>
                                    <i>I could level up in my career, all credits to VisualpathTech for the informative, easy-to-understand, and self-paced video courses.</i></ReviewText>
                                <User>
                                    <Name>Venkat</Name>
                                    <AboutUser><i>FS369</i></AboutUser>
                                </User>
                            </TestimonialCard>
                        </Col>
                        <Col md={3}>
                            <TestimonialCard>
                                <Image src={userImage}></Image>
                                <ReviewText>
                                    <QuoteCircle size="40" top="45" left="15"></QuoteCircle>
                                    <i>I could level up in my career, all credits to VisualpathTech for the informative, easy-to-understand, and self-paced video courses.</i></ReviewText>
                                <User>
                                    <Name>Venkat</Name>
                                    <AboutUser><i>FS369</i></AboutUser>
                                </User>
                            </TestimonialCard>
                        </Col>
                    </Row>
            </Container>

            {/* <div className='testimonials'>

                <Carousel indicators={false}>
                    <Carousel.Item interval={3000}>
                        <div className="row m-0">
                            <div className="col-md-6">
                                <div className="row blue-block shadow p-4">
                                    <div className="col-2"><img src="https://www.visualpathtech.com/assets/frontend/image/class-video.jpg" width="100%" className="rounded-circle" /></div>
                                    <div className="col-9">
                                        <h4>Jyothi Reddy</h4>
                                        <p>Developer</p>
                                    </div>
                                    <div className="col-12 text-white lh-lg"> "The DevOps video courses are well designed and helped me to update my knowledge. THANK YOU VisualpathTech." </div>
                                </div>
                            </div>
                            <div className="col-md-6 right-block">
                                <div className="mx-5 lh-lg">
                                    <h1>Review From Our Successfull Students</h1>
                                    <p>Dear VisualpathTech user, Thanks for your valuable review. We, VisualpathTech will always strive to give you the latest and best video courses possible.</p>
                                </div>
                            </div>
                        </div>

                    </Carousel.Item>
                    <Carousel.Item interval={3000}>
                        <div className="row m-0">
                            <div className="col-md-6">
                                <div className="row blue-block shadow p-4">
                                    <div className="col-2"><img src="https://www.visualpathtech.com/assets/frontend/image/class-video.jpg" width="100%" className="rounded-circle" /></div>
                                    <div className="col-9">
                                        <h4>Shoban</h4>
                                        <p>Developer</p>
                                    </div>
                                    <div className="col-12 text-white lh-lg"> "I could level up in my career, all credits to VisualpathTech for the informative, easy-to-understand, and self-paced video courses." </div>
                                </div>
                            </div>
                            <div className="col-md-6 right-block">
                                <div className="mx-5 lh-lg">
                                    <h1>Review From Our Successfull Students</h1>
                                    <p>Dear VisualpathTech user, Thanks for your valuable review. We, VisualpathTech will always strive to give you the latest and best video courses possible.</p>
                                </div>
                            </div>
                        </div>
                    </Carousel.Item>

                </Carousel>

                <img src={RedElement} className="redelement"></img>
                <img src={GreenElement} className="greenelement"></img>
            </div> */}

        </>
    )
}

export default Testimonials2