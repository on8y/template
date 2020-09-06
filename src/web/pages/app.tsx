import React from "react";
import Home from "./home/index.tsx";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <div>
      <h1>App Page</h1>
      <Home />
    </div>
  );
};

export default App;
