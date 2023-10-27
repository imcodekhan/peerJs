// import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import Router from "./router.jsx";
import "./Services/firebase.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <Router />
  </ChakraProvider>
);
