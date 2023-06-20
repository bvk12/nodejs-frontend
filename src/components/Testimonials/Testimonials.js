import Carousel from 'react-bootstrap/Carousel';
import "./Testimonials.css";
import RedElement from "../../assets/images/redElement.png"
import GreenElement from "../../assets/images/greenElement.png"
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { UserAPI } from '../../services/apis/UserAPI';


function Testimonials() {

const [loading,setLoading] = useState(true);
const [testimonials,setTestimonials] = useState(true);

  async function fetchTestimonials(){
    console.log("Fetching testimonials start")
    setLoading(true)
    const testi = await UserAPI.getTestimonials();
    if(testi){
      console.log("Testimonials",testi);
      setTestimonials(testi.data.testimonials);
      setLoading(false);
    }   
    console.log("Fetching testimonials end")
  }

  useEffect(()=>{
    fetchTestimonials();
  },[])



   return (

    loading ? <></> :
    <div className='testimonials '>
      <div className='main-title text-left'>  
      {/* <i className="fa fa-quote-left" aria-hidden="true"></i> */}
       Testimonials  
      {/* <i className="fa fa-quote-right" aria-hidden="true"></i>  */}
      </div>

      <Carousel indicators={true} variant="dark" prevIcon={<span aria-hidden="true" style={{display:"none"}} />}
      nextIcon={<span aria-hidden="true" style={{display:"none"}} />}
      >
       
        <Carousel.Item interval={5000} >
          <Row lg={12} className="card-listing-container">
            <Col key={1} sm={6} md={4} lg={4}>
            <Card className=" testimonial-card" >
                <Card.Body>                
                  <Card.Title >{testimonials.userName1}</Card.Title>
                  <Card.Subtitle ><i >{testimonials.designation1}</i></Card.Subtitle>
                  <div>&nbsp;</div>
                  <Card.Text className='testimonial-card'>
                  <i className="fa fa-quote-left" aria-hidden="true"></i> &nbsp;
                  {testimonials.testimonial1} &nbsp;
                    <i className="fa fa-quote-right" style={{textAlign:"right"}} aria-hidden="true"></i>
                    </Card.Text>
             
                </Card.Body>
              </Card>

            </Col>
            <Col key={1} sm={6} md={4} lg={4}>
            <Card className=" testimonial-card" >
                <Card.Body>                
                  <Card.Title >{testimonials.userName2}</Card.Title>
                  <Card.Subtitle ><i >{testimonials.designation2}</i></Card.Subtitle>
                  <div>&nbsp;</div>
                  <Card.Text className='testimonial-card'>
                  <i className="fa fa-quote-left" aria-hidden="true"></i> &nbsp;
                  {testimonials.testimonial2} &nbsp;
                    <i className="fa fa-quote-right" style={{textAlign:"right"}} aria-hidden="true"></i>
                    </Card.Text>
             
                </Card.Body>
              </Card>

            </Col>
            <Col key={1} sm={6} md={4} lg={4}>
            <Card className=" testimonial-card" >
                <Card.Body>                
                  <Card.Title >{testimonials.userName3}</Card.Title>
                  <Card.Subtitle ><i >{testimonials.designation3}</i></Card.Subtitle>
                  <div>&nbsp;</div>
                  <Card.Text className='testimonial-card'>
                  <i className="fa fa-quote-left" aria-hidden="true"></i> &nbsp;
                  {testimonials.testimonial3} &nbsp;
                    <i className="fa fa-quote-right" style={{textAlign:"right"}} aria-hidden="true"></i>
                    </Card.Text>
             
                </Card.Body>
              </Card>
            </Col>
       

          </Row>
          <div>&nbsp;</div>
        </Carousel.Item>

        <Carousel.Item interval={5000} >
          <Row lg={12} className="card-listing-container">
            <Col key={1} sm={6} md={4} lg={4}>
            <Card className=" testimonial-card" >
                <Card.Body>                
                  <Card.Title >{testimonials.userName4}</Card.Title>
                  <Card.Subtitle ><i >{testimonials.designation4}</i></Card.Subtitle>
                  <div>&nbsp;</div>
                  <Card.Text className='testimonial-card'>
                  <i className="fa fa-quote-left" aria-hidden="true"></i> &nbsp;
                  {testimonials.testimonial4} &nbsp;
                    <i className="fa fa-quote-right" style={{textAlign:"right"}} aria-hidden="true"></i>
                    </Card.Text>
             
                </Card.Body>
              </Card>

            </Col>
            <Col key={1} sm={6} md={4} lg={4}>
            <Card className=" testimonial-card" >
                <Card.Body>                
                  <Card.Title >{testimonials.userName5}</Card.Title>
                  <Card.Subtitle ><i >{testimonials.designation5}</i></Card.Subtitle>
                  <div>&nbsp;</div>
                  <Card.Text className='testimonial-card'>
                  <i className="fa fa-quote-left" aria-hidden="true"></i> &nbsp;
                  {testimonials.testimonial5} &nbsp;
                    <i className="fa fa-quote-right" style={{textAlign:"right"}} aria-hidden="true"></i>
                    </Card.Text>
             
                </Card.Body>
              </Card>

            </Col>
            <Col key={1} sm={6} md={4} lg={4}>
            <Card className=" testimonial-card" >
                <Card.Body>                
                  <Card.Title >{testimonials.userName6}</Card.Title>
                  <Card.Subtitle ><i >{testimonials.designation6}</i></Card.Subtitle>
                  <div>&nbsp;</div>
                  <Card.Text className='testimonial-card'>
                  <i className="fa fa-quote-left" aria-hidden="true"></i> &nbsp;
                  {testimonials.testimonial6} &nbsp;
                    <i className="fa fa-quote-right" style={{textAlign:"right"}} aria-hidden="true"></i>
                    </Card.Text>
             
                </Card.Body>
              </Card>
            </Col>
       

          </Row>
          <div>&nbsp;</div>
        </Carousel.Item>
        
        <Carousel.Item interval={5000} >
          <Row lg={12} className="card-listing-container">
            <Col key={1} sm={6} md={4} lg={4}>
            <Card className=" testimonial-card" >
                <Card.Body>                
                  <Card.Title >{testimonials.userName7}</Card.Title>
                  <Card.Subtitle ><i >{testimonials.designation7}</i></Card.Subtitle>
                  <div>&nbsp;</div>
                  <Card.Text className='testimonial-card'>
                  <i className="fa fa-quote-left" aria-hidden="true"></i> &nbsp;
                  {testimonials.testimonial7} &nbsp;
                    <i className="fa fa-quote-right" style={{textAlign:"right"}} aria-hidden="true"></i>
                    </Card.Text>
             
                </Card.Body>
              </Card>

            </Col>
            <Col key={1} sm={6} md={4} lg={4}>
            <Card className=" testimonial-card" >
                <Card.Body>                
                  <Card.Title >{testimonials.userName8}</Card.Title>
                  <Card.Subtitle ><i >{testimonials.designation8}</i></Card.Subtitle>
                  <div>&nbsp;</div>
                  <Card.Text className='testimonial-card'>
                  <i className="fa fa-quote-left" aria-hidden="true"></i> &nbsp;
                  {testimonials.testimonial8} &nbsp;
                    <i className="fa fa-quote-right" style={{textAlign:"right"}} aria-hidden="true"></i>
                    </Card.Text>
             
                </Card.Body>
              </Card>

            </Col>
            <Col key={1} sm={6} md={4} lg={4}>
            <Card className=" testimonial-card" >
                <Card.Body>                
                  <Card.Title >{testimonials.userName9}</Card.Title>
                  <Card.Subtitle ><i >{testimonials.designation9}</i></Card.Subtitle>
                  <div>&nbsp;</div>
                  <Card.Text className='testimonial-card'>
                  <i className="fa fa-quote-left" aria-hidden="true"></i> &nbsp;
                  {testimonials.testimonial9} &nbsp;
                    <i className="fa fa-quote-right" style={{textAlign:"right"}} aria-hidden="true"></i>
                    </Card.Text>
             
                </Card.Body>
              </Card>
            </Col>
       

          </Row>
          <div>&nbsp;</div>
        </Carousel.Item>
     
      </Carousel>

      <img src={RedElement} className="redelement"></img>
      <img src={GreenElement} className="greenelement"></img>
    </div>
  );
}

export default Testimonials;