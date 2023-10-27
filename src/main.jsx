// import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import UserProvider from "./Context/UserProvider/index.jsx";
import Router from "./router.jsx";
import "./Services/firebase.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <UserProvider>
      <Router />
    </UserProvider>
  </ChakraProvider>
);
