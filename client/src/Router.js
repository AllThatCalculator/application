import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./pages/Header";
import Calculet from "./pages/Calculet";
import Register from "./pages/Register";
import BookmarkBar from "./components/global-component/BookmarkBar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import {
  CALCULET,
  CALCULET_LIST,
  LOGIN,
  REGISTER,
  SIGN_UP,
} from "./components/PageUrls";
import CalculetList from "./pages/CalculetList";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={CALCULET} element={<Calculet />} />
        <Route path={CALCULET + "/:id"} element={<Calculet />} />
        <Route path={REGISTER} element={<Register />} />
        <Route path={LOGIN} element={<Login />} />
        <Route path={SIGN_UP} element={<SignUp />} />
        <Route path={SEARCH} element={<Search />} />
        <Route path={CALCULET_LIST} element={<CalculetList />} />
      </Routes>
      <BookmarkBar />
    </BrowserRouter>
  );
};

export default AppRouter;
