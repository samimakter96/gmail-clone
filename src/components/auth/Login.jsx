import { signInWithPopup } from "firebase/auth";
import React from "react";
import GoogleButton from "react-google-button";
import { auth, provider } from "../../config/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/appSlice";

const Login = () => {
  const dispatch = useDispatch()

  const signInWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      console.log(response);
      dispatch(setUser({
        displayName: response.user.displayName,
        email: response.user.email,
        photoURL: response.user.photoURL,
      }))
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-200">
      <div className="p-8 bg-white flex flex-col gap-3 rounded-md">
        <h1 className="text-center text-xl font-medium mb-5">Login</h1>
        <GoogleButton onClick={signInWithGoogle} />
      </div>
    </div>
  );
};

export default Login;
