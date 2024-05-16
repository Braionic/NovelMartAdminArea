import React, { useEffect, useLayoutEffect } from "react";
import TextInput from "../components/TextInput";
import { FaUser, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Form from "../components/Form";
import { adminSignIn } from "../store/features/auth/userSlice";

//Login page render starts here
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, error } = useSelector((state) => state.user);
  console.log(error, isLoading, user);

  //helps to navigate to the admin panels if user is signed in
  useEffect(() => {
    if (user) {
      return navigate("/admin");
    }
  }, [isLoading, user]);

  //function that handles the Admin sign in
  const handleAdmin = (userCredentials) => {
    dispatch(adminSignIn(userCredentials))
      .then((data) => {
        if (data?.payload) {
          console.log(data.payload);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="login-container">
      <div className="container child-container d-flex align-items-center justify-content-center c-rounded px-0 overflow-hidden">
        <div className="p-2 logo-area d-flex align-items-center justify-content-center ">
          {/* <img
            src="../../public/pngtree-man-working-at-the-office-in-front-of-laptop-png-image_6668055.jpg"
            alt="woman"
            className="img-fluid h-50"
  /> */}
        </div>
        <div
          className=" d-flex flex-column align-items-center justify-content-center gap-3"
          style={{ backgroundColor: "#D6EAEC" }}
        >
          <div className=" rounded-circle py-5 shadow">
            <h2 className="c-color m-2">NovelMart</h2>
          </div>

          <h4 className="text-center c-color">Login Your Account</h4>
          <div className="form w-75">
            <p className="text-danger">{error && error}</p>
            <Form handleAdmin={handleAdmin} />
            <div className="text-end c-text">
              <Link to="/forgot-password">Forgot password</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
