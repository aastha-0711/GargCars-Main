import React from "react";
import img from "../images/logo.png";
import {
  PushpinOutlined,
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
  FacebookFilled,
  TwitterSquareFilled,
  LinkedinFilled,
} from "@ant-design/icons";

const Footer = () => {
  return (
    <div className="mt-5">
      <footer className="footer-section ">
        <div className="container">
          <div className="footer-cta pt-5 pb-5">
            <div className="row">
              <div className="col-xl-4 col-md-4 mb-30">
                <div className="single-cta">
                  <div className="cta-text">
                    <PushpinOutlined className="f-icons" />
                    <h4>Find us</h4>
                    <span>Shop Number 2, Sonipat Road, Rohtak</span>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-4 mb-30">
                <PhoneOutlined className="f-icons" />
                <div className="single-cta">
                  <div className="cta-text">
                    <h4>Call us</h4>
                    <span>+919315102174</span>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-4 mb-30">
                <MailOutlined className="f-icons" />
                <div className="single-cta">
                  <div className="cta-text">
                    <h4>Mail us</h4>
                    <span>aasthagarg0711@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-content pt-5 pb-5">
            <div className="row">
              <div className="col-xl-4 col-lg-4 mb-50">
                <div className="footer-widget">
                  <div className="footer-logo">
                    <a href="#">
                      <img
                        src={img}
                        className="img-fluid"
                        style={{ height: "80px", width: "80px" }}
                        alt="logo"
                      />
                      <h3 style={{ color: "#B1C4A5", fontFamily: "Barrio" }}>
                        Garg Cars
                      </h3>
                    </a>
                  </div>
                  <div className="footer-text">
                    <p>
                      Don’t fear the bumps, they’re proof you’re on your way.
                      Keep going. You're closer than you think.
                    </p>
                  </div>
                  <div className="footer-social-icon">
                    <span>Follow us</span>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: "9px",
                      }}
                    >
                      <a
                        href="https://www.facebook.com/aastha.garg.9469545"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => console.log("Facebook clicked")}
                      >
                        <FacebookFilled className="f-social-icons facebook" />
                      </a>

                      <a
                        href="https://x.com/AasthaG47008315"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => console.log("Twitter clicked")}
                      >
                        <TwitterSquareFilled className="f-social-icons twitter" />
                      </a>

                      <a
                        href="https://www.linkedin.com/in/aastha-garg-b38ab4257/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => console.log("LinkedIn clicked")}
                      >
                        <LinkedinFilled className="f-social-icons linkedIn" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
                <div className="footer-widget">
                  <div className="footer-widget-heading">
                    <h3 style={{ textAlign: " initial", marginLeft: "68px" }}>
                      Useful Links
                    </h3>
                  </div>
                  <ul>
                    <li>
                      <a href="/">Home</a>
                    </li>
                    <li>
                      <a href="#">about</a>
                    </li>
                    <li>
                      <a href="#">services</a>
                    </li>
                    <li>
                      <a href="#">portfolio</a>
                    </li>
                    <li>
                      <a href="/contact">Contact</a>
                    </li>
                    <li>
                      <a href="#">About us</a>
                    </li>
                    <li>
                      <a href="#">Our Services</a>
                    </li>
                    <li>
                      <a href="#">Expert Team</a>
                    </li>
                    <li>
                      <a href="/contact">Contact us</a>
                    </li>
                    <li>
                      <a href="#">Latest News</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
                <div className="footer-widget">
                  <div className="footer-widget-heading">
                    <h3 style={{ textAlign: " initial" }}>Subscribe</h3>
                  </div>
                  <div className="footer-text mb-25">
                    <p>
                      Don’t miss to subscribe to our new feeds, kindly fill the
                      form below.
                    </p>
                  </div>
                  <div className="subscribe-form">
                    <form action="#">
                      <input type="text" placeholder="Email Address" />
                      <button>
                        <HomeOutlined
                          style={{ color: "white", fontSize: "18px" }}
                        />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright-area">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-6 text-center text-lg-left">
                <div className="copyright-text">
                  <p>
                    Copyright &copy; 2025, All Right Reserved by
                    <a href="#"> Aastha</a>
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 d-none d-lg-block text-right">
                <div className="footer-menu">
                  <ul>
                    <li>
                      <a href="/">Home</a>
                    </li>
                    <li>
                      <a href="#">Terms</a>
                    </li>
                    <li>
                      <a href="#">Privacy</a>
                    </li>
                    <li>
                      <a href="#">Policy</a>
                    </li>
                    <li>
                      <a href="/contact">Contact</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
