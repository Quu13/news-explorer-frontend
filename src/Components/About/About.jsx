import './About.css';
import React from 'react';
import authorImage from '../../assets/profile.svg';

function About() {
  return (
    <section className="about">
      <div className="about__image-container">
        <img src={authorImage} alt="Author" className="about__image" />
      </div>
      <div className="about__info">
        <h2 className="about__title">About the author</h2>
        <p className="about__paragraph">
          This block describes the project author. Here you should indicate your name,
          what you do, and which development technologies you know.
        </p>
        <p className="about__paragraph">
          You can also talk about your experience with TripleTen, what you learned
          there, and how you can help potential customers.
        </p>
      </div>
    </section>
  );
}

export default About;