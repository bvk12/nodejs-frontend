import React from "react";
import { useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContextProvider";
import useToast from "../../hooks/useToast";
import { Container, Row, Col } from "react-bootstrap";
import GooglePlay from "../../assets/images/google-play.png";
import AppStore from "../../assets/images/app-store.png";
import LogoFooter from "../../assets/images/Logo-footer.svg";
import VPTIcon from "../../assets/images/Logo.svg";
import VPTMobileIcon from "../../assets/images/mobileLogo.jpg";
import FacebookIcon from "../../assets/images/facebook.png";
import InstaIcon from "../../assets/images/insta.png";
import LinkedInIcon from "../../assets/images/linkeden.png";
import TwitterIcon from "../../assets/images/twitter.png";
import YoutubeIcon from "../../assets/images/youtube.png";
import { UserAPI } from "../../services/apis/UserAPI";



import "./Footer.css";

const Footer = (props) => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [footerData, setFooterData] = useState();

  useEffect(() => {
    setLoading(true);
    async function loadHeaderImages() {
      try {
        let footerData = await UserAPI.getFooterSettings();
        if (footerData) setFooterData(footerData.data.data);
        console.log("Footer Data recieved...", footerData)
        setLoading(false);
      } catch (err) {
        console.log("Error loading images.");
        setLoading(false);
      }
    }
    loadHeaderImages();
  }, []);


  if (loading) {
    return <>....</>;
  }

  return (
    <>
      <div>
        <footer class="footer-area d-print-none footer-bg ">
          <div class="container-fluid social-bg">
            <div class="row">
              <div class="col-md-12">
                <div class="social-links">
                  <h2 className="widget-title">We are Social, Follow us</h2>
                  <ul>
                    <li>
                      <a
                        href={footerData.socialLogos.facebookUrl}
                        target="_blank"
                      >
                        <img
                          data={footerData.socialLogos.facebookUrl}
                          // src= {footerData.data.socialLogos.facebookUrl ? footerData.data.socialLogos.facebookUrl : FacebookIcon}
                          src={footerData.socialLogos.facebookLogo}
                          alt="fb"
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        href={footerData.socialLogos.instagramUrl}
                        target="_blank"
                      >
                        <img
                          src={footerData.socialLogos.instagramLogo}
                          alt="In"
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        href={footerData.socialLogos.twitterUrl}
                        target="_blank"
                      >
                        <img
                          src={footerData.socialLogos.twitterLogo}
                          alt=""
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        href={footerData.socialLogos.linkedInUrl}
                        target="_blank"
                      >
                        <img
                          src={footerData.socialLogos.linkedInLogo}
                          alt=""
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        href={footerData.socialLogos.youtubeUrl}
                        target="_blank"
                      >
                        <img
                          src={footerData.socialLogos.youtubeLogo}
                          alt=""
                        />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="container-fluid  pt-40 d-flex mx-auto mx-sm-0">
            <div class="row justify-content-center align-items-start w-100">
              <div class="col-md-1 col-xs-12 d-flex justify-content-center">
                <img
                  src={footerData.logos.darkLogo}
                  class="d-flex rounded-circle avatar--m mx-auto mx-sm-0"
                  style={{ borderRadius: "50%", width: "100px"}}
                  alt="vpt-icon"
                />
              </div>
              <div class="col-md-3  col-xs-12 mobile-footer-section">
                <div>
                  <h3 class="widget-title ">Quick Links</h3>
                  <ul class="justify-content-md-end footer-menu">
                    <li class="nav-item">
                      <a class="nav-link" href="/siteinfo/aboutUs">
                        {" "}
                        About Us
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="/siteinfo/faq">
                        FAQ
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-3  col-xs-12 mobile-footer-section">
                <div>
                  <h3 class="widget-title">Other Links</h3>
                  <ul class="justify-content-md-end footer-menu">
                    <li class="nav-item">
                      <a class="nav-link" href="/siteinfo/refundPolicy">
                        Refund Policy
                      </a>
                    </li>

                    <li class="nav-item">
                      <a class="nav-link" href="/siteinfo/termsAndConditions">
                        Terms and conditions
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="/siteinfo/privacyPolicy">
                        Privacy policy
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-3 col-xs-12 mobile-footer-section">
                <div>
                  <h3 class="widget-title">Have questions?</h3>
                  <ul class="help-line">
                    <li>
                      {/*<img src="https://techbricksedu.com/uploads/system/phone (3).png" alt="" /> */}
                      {footerData.contacts.phones}
                    </li>
                    <li>
                      {/*<img src="https://techbricksedu.com/uploads/system/mail.png" alt="" />*/}{" "}
                      {footerData.contacts.email}
                    </li>
                    <li>
                      {/*<img src="https://techbricksedu.com/uploads/system/location.png" alt="" />*/}{" "}
                      {footerData.contacts.address}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="container-fluid bottom-content pt-40 pb-20">
            <div class="row">
              <div class="col-md-12">
                <div class=" bottom-content pt-10 ">
                  <div class="copyright">
                    <p>
                      {" "}
                      <hr></hr>
                    </p>
                    {/* <p>The certification names are the trademarks of their respective owners. <a href="https://techbricksedu.com/home/view_disclaimer">View Disclaimer</a></p> */}
                  </div>

                  <div class="copyright">
                    <p>© 2023- VisualPathTech Edu. All Rights Reserved.</p>
                    {/* <p>The certification names are the trademarks of their respective owners. <a href="https://techbricksedu.com/home/view_disclaimer">View Disclaimer</a></p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
