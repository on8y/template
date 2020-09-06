import React from "react";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return <div>
    <h3> Home Page </h3>
    <button onClick={()=>{
      console.log('JS is Running')
    }}>Home</button>
  </div>;
};

export default Home;
