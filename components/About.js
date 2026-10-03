import React from "react";
import {
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillBehanceCircle,
} from "react-icons/ai";

const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center"
    >
      <div className="w-full text-center p-1">
        <h2 className="text-5xl py-2 text-teal-600 font-medium md:text-6xl">
          Vimukthi Bandaragoda
        </h2>

        <h3 className="text-2xl py-2 md:text-3xl dark:text-white">
          <span className="hidden md:inline">
            Designer - Developer - Photographer
          </span>
          <span className="md:hidden">
            Designer
            <br />
            Developer
            <br />
            Photographer
          </span>
        </h3>

        <p className="text-m py-5 leading-8 text-gray-800 md:text-xl max-w-xl mx-auto dark:text-slate-300">
          I am a Freelancer providing services for developing and design content
          needs. Join me down below and lets get cracking!
        </p>
        <div className="text-5xl flex justify-center gap-16 py-3 text-gray-600">
          <a href="https://www.linkedin.com/in/vimukthi-bandaragoda-2955641a7/">
            <AiFillLinkedin />
          </a>
          <a href="https://www.behance.net/vimukthinelanga">
            <AiFillBehanceCircle />
          </a>
          <a href="https://twitter.com/VimukthiNelang3">
            <AiFillTwitterCircle />
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
