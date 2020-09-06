import React from "react";

interface AboutProps {}

const About: React.FC<AboutProps> = () => {
  return <div>
    <h3> About Page </h3>
    <button onClick={()=>{
      console.log('JS is Running')
    }}>About</button>
  </div>;
};

export default About;
