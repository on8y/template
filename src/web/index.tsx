import React from "react";
import ReactDOM from "react-dom";

import App from "./app.tsx";

ReactDOM.hydrate(<App />, document.querySelector("#root"));
