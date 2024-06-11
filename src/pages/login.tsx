import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <main className="shadow-2xl mt-12">
        <h1 className="uppercase font-light text-[2.3rem] text-center m-8 ">login</h1>

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

         <div className="flex items-center justify-center m-auto  h-[35px]">
            <FcGoogle style={{
                height:"100%",
                width:"40px",
                border:"1px solid black"
            }}/>
            <h1 className="h-[100%] px-4 flex justify-center items-center bg-blue-600 text-white font-normal">Sign in with Google</h1>
         </div>
        </form>
      </main>
    </div>
  );
};

export default Login;
