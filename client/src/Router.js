import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./pages/Header";
import Calculet from "./pages/Calculet";
import Register from "./pages/Register";
import BookmarkBar from "./components/global-component/BookmarkBar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Search from "./pages/Search";
import {
  CALCULET,
  LOGIN,
  REGISTER,
  SIGN_UP,
  SEARCH,
} from "./components/PageUrls";

import Auth from "./hoc/auth";
const AppRouter = () => {
  const AuthRegister = Auth(Register, true);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={CALCULET} element={<Calculet />} />
        <Route path={CALCULET + "/:id"} element={<Calculet />} />
        <Route path={REGISTER} element={<AuthRegister />} />
        <Route path={LOGIN} element={<Login />} />
        <Route path={SIGN_UP} element={<SignUp />} />
        <Route path={SEARCH} element={<Search />} />
      </Routes>
      <BookmarkBar />
    </BrowserRouter>
  );
};

export default AppRouter;
