import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "../pages/welcomePage/WelcomePage";
import Signup from "../pages/login/Signup";
import MainPage from "../pages/main/MainPage";
import Match from "../pages/match/Match";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Welcome page */}
        <Route path={"/"} element={<WelcomePage />} />

        {/* Login */}
        {/* <Route path={"/signin"} element={<Signin />} /> */}
        <Route path={"/signup"} element={<Signup />} />

        {/* Main Page */}
        <Route path={"/main"} element={<MainPage />} />

        {/* Match Page */}
        <Route path={"/match"}>
          <Route path={":matchId"} element={<Match />} />
        </Route>

        {/* Create Profile */}
        {/* <Route path={"/create-profile"} element={<CreateProfile />} /> */}

        {/* Error */}
        {/* <Route path="*" element={<NotFound />} /> */}

        {/* test */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
