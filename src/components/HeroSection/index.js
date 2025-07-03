import React, { useState } from "react";
import Video from "./video.mp4";
import {
  HeroContainer,
  HeroBg,
  VideoBg,
  HeroContent,
  HeroH1,
  HeroP,
  HeroBtnWrapper,
  ArrowForward,
  ArrowRight,
  ButtonT,
} from "./HeroElements";

const HeroSection = () => {
  const [hover, setHover] = useState(false);

  const onHover = () => {
    setHover(!hover);
  };

  return (
    <HeroContainer id="home">
      <HeroBg>
        <VideoBg autoPlay loop muted src={Video} type="video/mp4" />
      </HeroBg>
      <HeroContent>
        <HeroH1>
          <span style={{ color: "white" }}> Booking Cars Made Easy</span>
        </HeroH1>
        <HeroP>
          Book your favourite car in very low price and enjoy the ride.
        </HeroP>
        <HeroBtnWrapper>
          <ButtonT
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-80}
            onMouseEnter={onHover}
            onMouseLeave={onHover}
            onClick={() => {
              window.scrollTo({ top: 570, behavior: "smooth" });
            }}
          >
            Get Started {hover ? <ArrowForward /> : <ArrowRight />}
          </ButtonT>
        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
