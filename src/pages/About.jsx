import React from "react";
import "../styles/styles.css"

function AboutUs() {
  return (
    <div className="about-us-container">
      <h1 className="about-us-title">About Us</h1>
      <p className="about-us-paragraph">
        Welcome to <span className="highlight">Estia</span> – your go-to guide for family-friendly cafés and restaurants in Brussels!
      </p>
      <p className="about-us-paragraph">
        At <span className="highlight">Estia</span>, we understand how precious quality time is for families. That’s why we’ve created a platform to help parents and caregivers find the perfect spots to enjoy a delicious meal or a peaceful coffee break while their children have fun in a safe and engaging environment.
      </p>
      <div className="about-us-mission">
        <h2 className="mission-title">Our mission is simple:</h2>
        <ul className="mission-list">
          <li><strong>For Parents:</strong> A stress-free space to relax and enjoy their time.</li>
          <li><strong>For Kids:</strong> Creative play areas and activities to keep them entertained and happy.</li>
        </ul>
      </div>
      <p className="about-us-paragraph">
        Every venue we feature is carefully selected to ensure it offers not only exceptional food and drinks but also a welcoming and safe atmosphere for children. Whether it’s a cozy café with a play corner or a restaurant with an outdoor playground, <span className="highlight">Estia</span> is here to guide you to the best places in Brussels for your family outings.
      </p>
      <p className="about-us-paragraph final-paragraph">
        Because at <span className="highlight">Estia</span>, we believe that when kids are happy, parents are even happier.
      </p>
      <p className="about-us-paragraph signature">
        Explore, relax, and enjoy – the <span className="highlight">Estia</span> way.
      </p>
    </div>
  );
}

export default AboutUs;