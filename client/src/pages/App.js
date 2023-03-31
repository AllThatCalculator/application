import AppRouter from "../Router";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { onSetCalculetCategory } from "../modules/calculetCategory";
import getCalculetCategory from "../user-actions/getCalculetCategory";
import { onSetUserInfo, onSetUserIdToken } from "../modules/userInfo";
import getUserMe from "../user-actions/users/getUserMe";

function App() {
  /** Redux State */
  const dispatch = useDispatch();

  const [init, setInit] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setInit(false);
    setIsSuccess(false);
    // console.log(auth);
    // login state
    onAuthStateChanged(auth, (user) => {
      // 회원가입 시, 이미 가입한 계정으로 회원가입하면 로그인되는 상황을 막고자 update막음
      // or off login
      if (user === null) {
        setIsLoggedIn(false);
        /** set token null */
        dispatch(onSetUserIdToken(""));
        dispatch(
          onSetUserInfo({
            userName: "",
            profileImgSrc: "",
          })
        );
        setIsSuccess(true);
      } else if (user) {
        setIsLoggedIn(false);
        // on login
        const token = user.accessToken;

        if (token !== null) {
          /** set user info */
          getUserMe(token).then((data) => {
            // console.log(data);
            dispatch(onSetUserInfo(data));
            setIsLoggedIn(true);
          });
          /** set user id token */
          dispatch(onSetUserIdToken(token));
        }
        setIsSuccess(true);
      }
    });

    // calculet category
    getCalculetCategory().then((data) => {
      /** set calculet category json */
      dispatch(onSetCalculetCategory(data));
      setInit(true);
    });
  }, [dispatch]);

  return <>{init && isSuccess && <AppRouter isLoggedIn={isLoggedIn} />}</>;
}

export default App;
