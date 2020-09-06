import React from "react";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return <div>
    <h3> Hello world </h3>
    <button onClick={()=>{
      console.log('JS is Running')
    }}>测试js按钮</button>
  </div>;
};

export default Home;
