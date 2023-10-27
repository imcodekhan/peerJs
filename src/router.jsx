import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Onboarding from "./Pages/Onboarding";
import { ROUTES } from "./constants";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.ONBOARDING} element={<Onboarding />} />
        <Route path={ROUTES.HOMEPAGE} element={<Homepage />} />
        <Route path={ROUTES.ANY} element={<Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
