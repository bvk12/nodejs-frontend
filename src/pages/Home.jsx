import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import _ from "lodash";
import useToast from "../hooks/useToast";
import { Container, Row, Col, Card, Carousel, Ratio } from "react-bootstrap";
import { CartAPI } from "../services/apis/CartAPI";

import Testimonials from "../components/Testimonials/Testimonials";
import { AuthContext } from "../context/AuthContextProvider";
import { PriceAPI } from "../services/apis/PriceAPI";
import ProgramListing from "./programs/ProgramListing";
import Footer from "../components/Footer/Footer";
import { SubscriptionContext } from "../context/SubscriptionContextProvider";
import { ToastVariants } from "../utils/constants";
import CourseListing from "./courses/CourseListing";
import TestFormWizard from "../utilities/FormWizard/TestFormWizard";

const Home = ({}) => {
  const { showToast } = useToast();
  const router = useIonRouter();
  const { user, auth, updateCartItemCount } = useContext(AuthContext);
  const { showPlatformPricing } = useContext(SubscriptionContext);

  const [platformPrice, setPlatformPrice] = useState(-1);
  const [plafformBasicPrice, setPlatformBasicPrice] = useState(-1);
  const showPlatformPriceBanner = showPlatformPricing();

  const checkoutPlatform = async (e) => {
    e.preventDefault();
    // await CartAPI.clearCartItems(user.userId);
    if (_.isEmpty(user)) {
      //console.log("USer",user)
      showToast("You need to login first to add items to cart.");
      return;
    }
    await CartAPI.clearCartItems(user.userId);
    var currentCartItems = await CartAPI.getCartItems(user.userId);
    var platformItem = await CartAPI.createCartItem(
      -999,
      "platform",
      user.userId
    );
    showToast("Platform Subscription added to cart ", ToastVariants.success);
    updateCartItemCount(platformItem.data.count);
  };

  useEffect(() => {
    //first check if local user object exists
    if (user && !_.isEmpty(user)) {
      // alert("Seems you are already loogged in.. wanna go whre you left off.");
      // 1) Verify if accees token is valid -
      //  console.log(user, auth);
      //then push the user to landing page/ courses.
    }
    async function fetchPlatformPriceData() {
      // You can await here
      const platformPrice = await PriceAPI.getPriceDetails(-999, "platform");
      // console.log("Platform price is", platformPrice[0]);
      if (platformPrice) {
        setPlatformPrice(platformPrice[0].postOfferPrice);
        setPlatformBasicPrice(platformPrice[0].basicPrice);
      } else {
        console.log("unable to retrive platform price.");
      }

      // ...
    }
    fetchPlatformPriceData();

    // 2) If access token is not valid then

    // 3) Send refresh token to get new access token.

    // 4) if we got new access token then - push to user landign page / courses.

    // 5) if we get refresh token is expired then redirect to login page...

    return () => {};
  }, []);

  function handleClick(e) {
    e.preventDefault();
    router.push(`/programs`);
  }

  function handleClickAllCourses(e) {
    e.preventDefault();
    router.push(`/courses`);
  }

  const subscribe = () => {
    if (!showPlatformPriceBanner) return <></>;

    return (
      <section class="subscription">
        <div class="row">
          <div class="col-md-5 text-start">
            <span class="d-inline-block subscribe-get-access">
              Get access to entire <br />
              portal
            </span>
            <img src="https://www.visualpathtech.com/assets/frontend/image/ctaArrow.png" />{" "}
          </div>
          <div class="col-md-3">
            <button
              onClick={checkoutPlatform}
              className="btn btn-primary px-5 btn-md subscribe-button"
            >
              Subscribe INR {platformPrice}/-
            </button>
          </div>
          <div class="col-md-4 position-relative d-none d-md-block">
            {" "}
            <img
              src="https://www.visualpathtech.com/assets/frontend/image/footerImg.png"
              class="img-fluid footer-person-img"
            />{" "}
          </div>
        </div>
      </section>
    );
  };

  return (
    <IonPage>
      <IonContent>
        <Container fluid>
          <Row className="main-sigin-block">
            <Col md={12} className="p-0">
              <section className="bg-white hero-banner">
                <Container>
                  <Row className="">
                    {/* <Col md={12}>
                       <TestFormWizard /> 
                    </Col> */}
                    <Col md={12}>
                      <div className="banner-block">
                        <Carousel>
                          <Carousel.Item>
                            <img
                              className="d-block w-100"
                              src="https://visualpath-production-images.s3.ap-south-1.amazonaws.com/app-images/visualpathtech/Slide-1.jpg"
                              alt="First slide"
                            />
                          </Carousel.Item>
                          <Carousel.Item>
                            <img
                              className="d-block w-100"
                              src="https://visualpath-production-images.s3.ap-south-1.amazonaws.com/app-images/visualpathtech/Slide-2.png"
                              alt="Second slide"
                            />
                          </Carousel.Item>
                          <Carousel.Item>
                            <img
                              className="d-block w-100"
                              src="https://visualpath-production-images.s3.ap-south-1.amazonaws.com/app-images/visualpathtech/Slide-3.png"
                              alt="Third slide"
                            />
                          </Carousel.Item>
                        </Carousel>
                      </div>

                      <div className="banner-block mobile-banner-block">
                        <Carousel>
                          <Carousel.Item>
                            <img
                              className="d-block w-100"
                              src="https://visualpath-production-images.s3.ap-south-1.amazonaws.com/app-images/visualpathtech/Mobile-slide-1.jpg"
                              alt="First slide"
                            />
                          </Carousel.Item>
                          <Carousel.Item>
                            <img
                              className="d-block w-100"
                              src="https://visualpath-production-images.s3.ap-south-1.amazonaws.com/app-images/visualpathtech/Mobile-slide-2.jpg"
                              alt="Second slide"
                            />
                          </Carousel.Item>
                          <Carousel.Item>
                            <img
                              className="d-block w-100"
                              src="https://visualpath-production-images.s3.ap-south-1.amazonaws.com/app-images/visualpathtech/Mobile-slide-3.jpg"
                              alt="Third slide"
                            />
                          </Carousel.Item>
                        </Carousel>
                      </div>
                    </Col>
                    {/* <Col md={3} className="videos-block">
                      <Card>
                        <Card.Body className="home-right-video-section">
                          <Ratio aspectRatio="16x9" className="mb-3 br-4">
                            <iframe
                              src="https://www.youtube.com/embed/cQYePZd6SH8"
                              title="YouTube video player"
                              frameborder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowfullscreen
                            ></iframe>
                          </Ratio>

                          <Ratio aspectRatio="16x9" className="mb-3 br-4">
                            <iframe
                              src="https://www.youtube.com/embed/Vf9N8WaocF8"
                              title="YouTube video player"
                              frameborder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowfullscreen
                            ></iframe>
                          </Ratio>

                          <Ratio aspectRatio="16x9" className="mb-3 br-4">
                            <iframe
                              src="https://www.youtube.com/embed/D-XzUbfuo-g"
                              title="YouTube video player"
                              frameborder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowfullscreen
                            ></iframe>
                          </Ratio>

                          <Ratio aspectRatio="16x9" className="mb-3 br-4">
                            <iframe
                              src="https://www.youtube.com/embed/d7gEcMmUUoI"
                              title="YouTube video player"
                              frameborder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowfullscreen
                            ></iframe>
                          </Ratio>

                          <Ratio aspectRatio="16x9" className="mb-3 br-4">
                            <iframe
                              src="https://www.youtube.com/embed/kWFbOANs2O0"
                              title="YouTube video player"
                              frameborder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowfullscreen
                            ></iframe>
                          </Ratio>
                        </Card.Body>
                      </Card>
                    </Col> */}
                  </Row>
                </Container>
              </section>

              {showPlatformPriceBanner && (
                <Container>
                  <Row>
                    <a
                      className="btn btn-primary pulse-button mt-0 subscription-button"
                      href="javascript:void(0)"
                      onClick={checkoutPlatform}
                    >
                      <span style={{ lineHeight: "30px" }}>
                        Subscribe to entire platform at just Rs.{platformPrice}
                        &nbsp;&nbsp;{" "}
                        <i
                          style={{ fontSize: "24px" }}
                          className="fa fa-cart-plus"
                        ></i>
                        &nbsp;&nbsp; for 1 year
                      </span>
                    </a>
                  </Row>
                </Container>
              )}

              <section className="bg-light-primary programs">
                <Container>
                  <Row className="align-items-center mb-0 cards-container">
                    <Col md={9}>
                      <div className="main-title text-left">
                        Get program of your Choice
                      </div>
                    </Col>
                    <Col md={3} className="text-right">
                      <a
                        href="#"
                        onClick={handleClick}
                        className="btn btn-primary pull-right px-5"
                      >
                        View All
                      </a>
                    </Col>
                  </Row>

                  <ProgramListing
                    showFilters={false}
                    embed
                    showFooter={false}
                  />
                </Container>
              </section>
              <section className="bg-light-primary">
                <Container>
                  <Row className="align-items-center mb-30 cards-container">
                    <Col md={9}>
                      <div className="main-title text-left">
                        Get Trending Courses of your Choice
                      </div>
                    </Col>
                    <Col md={3} className="text-right">
                      <a
                        href="#"
                        onClick={handleClickAllCourses}
                        className="btn btn-primary pull-right px-5"
                      >
                        View All Courses
                      </a>
                    </Col>
                  </Row>
                  <Container className="mt-4 cards-container">
                    <CourseListing trendingCourses={true} />
                  </Container>
                </Container>
              </section>

              {/* <CourseCategories /> */}
              {/* Bundles/ Testinomials/ Reviews */}
              {/* 
              <section className="bg-white programs">
                <Container>
                  <Row className="align-items-center mb-30">
                    <Col md={9}>
                      <div className="main-title text-left">
                        Get bundle of your Choice
                      </div>
                    </Col>
                    <Col md={3} className="text-right">
                      <a href="" className="btn btn-primary pull-right px-5">
                        View All
                      </a>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3}>
                      <Card className="course-card">
                        <Card.Body>
                          <Card.Img
                            className="card-image"
                            variant="top"
                            src={program1}
                          />
                          <div className="share-block">
                            <div>
                              <i className="fa fa-heart" aria-hidden="true"></i>
                            </div>
                            <div className="text-primary">
                              <i className="fa fa-eye" aria-hidden="true"></i>{" "}
                              200
                            </div>
                            <div>
                              <i
                                className="fa fa-share-alt"
                                aria-hidden="true"
                              ></i>
                            </div>
                          </div>
                          <Card.Title>Bundle One</Card.Title>
                          <Card.Text className="mx-height-60">
                            MERN Full Stack + Docker, Kubernetes
                          </Card.Text>
                          <div className="price-block">
                            <div>50% Off</div>
                            <div className="price">
                              <span>₹900.00</span> ₹620.00{" "}
                            </div>
                            <div>
                              <button className="btn btn-secondry">
                                <i
                                  className="fa fa-cart-plus"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </div>
                          </div>
                        </Card.Body>
                        <Card.Footer className="bg-transparent d-flex justify-content-between">
                          <div className="btn btn-primary rounded px-4 btn-sm">
                            Popular
                          </div>
                          <div className="btn btn-dark-outline rounded px-4 btn-sm">
                            Beginner
                          </div>
                        </Card.Footer>
                      </Card>
                    </Col>
                    <Col md={3}>
                      <Card className="course-card">
                        <Card.Body>
                          <Card.Img
                            className="card-image"
                            variant="top"
                            src={program1}
                          />
                          <div className="share-block">
                            <div>
                              <i className="fa fa-heart" aria-hidden="true"></i>
                            </div>
                            <div className="text-primary">
                              <i className="fa fa-eye" aria-hidden="true"></i>{" "}
                              200
                            </div>
                            <div>
                              <i
                                className="fa fa-share-alt"
                                aria-hidden="true"
                              ></i>
                            </div>
                          </div>
                          <Card.Title>Bundle One</Card.Title>
                          <Card.Text className="mx-height-60">
                            MERN Full Stack + Docker, Kubernetes
                          </Card.Text>
                          <div className="price-block">
                            <div>50% Off</div>
                            <div className="price">
                              <span>₹900.00</span> ₹620.00{" "}
                            </div>
                            <div>
                              <button className="btn btn-secondry">
                                <i
                                  className="fa fa-cart-plus"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </div>
                          </div>
                        </Card.Body>
                        <Card.Footer className="bg-transparent d-flex justify-content-between">
                          <div className="btn btn-primary rounded px-4 btn-sm">
                            Popular
                          </div>
                          <div className="btn btn-dark-outline rounded px-4 btn-sm">
                            Beginner
                          </div>
                        </Card.Footer>
                      </Card>
                    </Col>
                    <Col md={3}>
                      <Card className="course-card">
                        <Card.Body>
                          <Card.Img
                            className="card-image"
                            variant="top"
                            src={program1}
                          />
                          <div className="share-block">
                            <div>
                              <i className="fa fa-heart" aria-hidden="true"></i>
                            </div>
                            <div className="text-primary">
                              <i className="fa fa-eye" aria-hidden="true"></i>{" "}
                              200
                            </div>
                            <div>
                              <i
                                className="fa fa-share-alt"
                                aria-hidden="true"
                              ></i>
                            </div>
                          </div>
                          <Card.Title>Bundle One</Card.Title>
                          <Card.Text className="mx-height-60">
                            MERN Full Stack + Docker, Kubernetes
                          </Card.Text>
                          <div className="price-block">
                            <div>50% Off</div>
                            <div className="price">
                              <span>₹900.00</span> ₹620.00{" "}
                            </div>
                            <div>
                              <button className="btn btn-secondry">
                                <i
                                  className="fa fa-cart-plus"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </div>
                          </div>
                        </Card.Body>
                        <Card.Footer className="bg-transparent d-flex justify-content-between">
                          <div className="btn btn-primary rounded px-4 btn-sm">
                            Popular
                          </div>
                          <div className="btn btn-dark-outline rounded px-4 btn-sm">
                            Beginner
                          </div>
                        </Card.Footer>
                      </Card>
                    </Col>
                    <Col md={3}>
                      <Card className="course-card">
                        <Card.Body>
                          <Card.Img
                            className="card-image"
                            variant="top"
                            src={program1}
                          />
                          <div className="share-block">
                            <div>
                              <i className="fa fa-heart" aria-hidden="true"></i>
                            </div>
                            <div className="text-primary">
                              <i className="fa fa-eye" aria-hidden="true"></i>{" "}
                              200
                            </div>
                            <div>
                              <i
                                className="fa fa-share-alt"
                                aria-hidden="true"
                              ></i>
                            </div>
                          </div>
                          <Card.Title>Bundle One</Card.Title>
                          <Card.Text className="mx-height-60">
                            MERN Full Stack + Docker, Kubernetes
                          </Card.Text>
                          <div className="price-block">
                            <div>50% Off</div>
                            <div className="price">
                              <span>₹900.00</span> ₹620.00{" "}
                            </div>
                            <div>
                              <button className="btn btn-secondry">
                                <i
                                  className="fa fa-cart-plus"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </div>
                          </div>
                        </Card.Body>
                        <Card.Footer className="bg-transparent d-flex justify-content-between">
                          <div className="btn btn-primary rounded px-4 btn-sm">
                            Popular
                          </div>
                          <div className="btn btn-dark-outline rounded px-4 btn-sm">
                            Beginner
                          </div>
                        </Card.Footer>
                      </Card>
                    </Col>
                  </Row>
                </Container>
              </section> */}

              {/* 
              <section className="bg-light-primary partners">
                <Container>
                  <Row className="align-items-center mb-30">
                    <Col md={9}>
                      <div className="main-title text-left">
                        Trusted by our awesome partners
                      </div>
                    </Col>
                    <Col md={3} className="text-right">
                      <a href="" className="btn btn-primary pull-right px-3">
                        <i className="fa fa-arrow-right" aria-hidden="true"></i>
                      </a>
                      <a
                        href=""
                        className="btn btn-primary pull-right px-3 me-2"
                      >
                        <i className="fa fa-arrow-left" aria-hidden="true"></i>
                      </a>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={2}>
                      <img src={Partner1} className="img-fluid" />
                    </Col>
                    <Col md={2}>
                      <img src={Partner2} className="img-fluid" />
                    </Col>
                    <Col md={2}>
                      <img src={Partner1} className="img-fluid" />
                    </Col>
                    <Col md={2}>
                      <img src={Partner2} className="img-fluid" />
                    </Col>
                    <Col md={2}>
                      <img src={Partner1} className="img-fluid" />
                    </Col>
                    <Col md={2}>
                      <img src={Partner2} className="img-fluid" />
                    </Col>
                  </Row>
                </Container>
              </section>
              */}

              {/* <section className="bg-white partners p-0">
                <Container>
                  <Row>
                    <Col md={6}>
                     
                      <i class="fa fa-quote-left" aria-hidden="true"></i>
                    </Col>
                    <Col md={6} className="py-70 px-50">
                      <Row className="align-items-center">
                        <Col md={9}>
                          <div className="main-title-2 text-left">
                            Student Testimonials
                          </div>
                        </Col>
                        <Col md={3} className="text-right">
                          <a
                            href=""
                            className="btn btn-primary pull-right px-3"
                          >
                            <i
                              className="fa fa-arrow-right"
                              aria-hidden="true"
                            ></i>
                          </a>
                          <a
                            href=""
                            className="btn btn-primary pull-right px-3 me-2"
                          >
                            <i
                              className="fa fa-arrow-left"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Container>
              </section> */}
              <section className="bg-light-primary programs">
                <Container>
                  <Testimonials />
                </Container>
              </section>
              <Footer />
            </Col>
          </Row>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default Home;
