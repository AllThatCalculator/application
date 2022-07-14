import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./pages/Header";
import Calculet from "./pages/Calculet";
import Register from "./pages/Register";
import BookmarkBar from "./components/global-component/BookmarkBar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import OftenCalculet from "./pages/OftenCalculet";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Calculet />} />
        <Route path="/:id" element={<Calculet />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        {/* <Route path="/" element={<Calculet />}></Route> */}
        <Route path="/" element={<OftenCalculet />}></Route>
      </Routes>
      <BookmarkBar />
    </BrowserRouter>
  );
};

export default AppRouter;
