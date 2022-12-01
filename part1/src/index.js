import React from "react";
import ReactDOM from "react-dom/client";

const Hello = () => {
  return (
    <div>
      <p>Hello World</p>
    </div>
  )
}

const App = () => {
  return (
    <div>
     <h1>Greetings</h1>
     <Hello />
    </div>
  )
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
