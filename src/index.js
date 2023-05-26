import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { PetsContext } from "./context/PetsContext";
import { UserContext } from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <PetsContext>
      <UserContext>
        <App />
      </UserContext>
    </PetsContext>
  </BrowserRouter>
);
