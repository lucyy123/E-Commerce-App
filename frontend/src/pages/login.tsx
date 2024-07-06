import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { useLoginMutation } from "../redux/apis/userApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { userMessageResponse } from "../types/apiTypes";

const Login = () => {
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [login] = useLoginMutation();

  const handleLoginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      const userResponse = await login({
        name: user.displayName!,
        email: user.email!,
        photo: user.photoURL!,
        gender: gender,
        dob: date,
        role: "user",
        _id: user.uid,
      });
if("data" in userResponse){

  toast.success(userResponse.data!.message)
}else{
  const error =userResponse.error as FetchBaseQueryError;
  const message = error.data as userMessageResponse
  toast.error(message.message)
}
  
    } catch (error) {
      console.log("error in google login:", error);
      toast.error("Sign in Fail");
    }
  };

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <main className="shadow-2xl mt-12">
        <h1 className="uppercase font-light text-[2.3rem] text-center m-8 ">
          login
        </h1>

        <form className="w-[20rem] flex flex-col gap-3 px-6 py-8 [&>label]:font-medium [&>input]:p-2 [&>input]:rounded [&>input]:outline-none [&>input]:border-2 [&>select]:p-2 [&>select]:rounded [&>select]:outline-none [&>select]:border-2">
          <label>Gender</label>
          <select name="gender" onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <label>Date of Birth</label>

          <input
            type="date"
            name="dateOfBirth"
            onChange={(e) => setDate(e.target.value)}
          />

          <h6 className="text-center mt-8 mb-6">Already Signed in Once</h6>

          <div
            onClick={handleLoginWithGoogle}
            className="flex items-center justify-center m-auto  h-[35px] cursor-pointer"
          >
            <FcGoogle
              style={{
                height: "100%",
                width: "40px",
                border: "1px solid black",
              }}
            />
            <h1 className="h-[100%] px-4 flex justify-center items-center bg-blue-600 text-white font-normal">
              Sign in with Google
            </h1>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Login;
