import React, { useEffect } from "react";
import { gsap } from "gsap";
// import Button from "../../ui/Button/Button";
// import { useNavigate } from "react-router-dom";
import "./componentCSS/hero.css";

const HeroSection = ({
  title = "Help Us Make a Difference",
  subtitle = "Join SICARDO in our mission to create positive change in communities around the world.",

  backgroundImage = "images/bg.jpeg",
}) => {
  // const navigate = useNavigate();
  useEffect(() => {
    gsap.from(".hero-content h1", {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "power3.out",
      delay: 0.3,
    });

    gsap.from(".hero-content p", {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "power3.out",
      delay: 0.6,
    });
  }, []);

  return (
    <section
      className="hero-section"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </section>
  );
};

export default HeroSection;
