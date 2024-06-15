import { ChangeEvent, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useNavigation } from "react-router-dom";

function Shipping() {
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  const { address, city, state, pincode } = shippingInfo;
   const navigation= useNavigate()

  const handlShippingInfo = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    console.log("value:", e.target.value);


    setShippingInfo((prev)=>({...prev,[e.target.name]:e.target.value}))
  };
  console.log("shipping info"+shippingInfo)

  return (
    <div className="flex justify-center items-center mt-8">
      <button  onClick={()=>navigation("/cart")}  className="fixed left-[2%] top-[5%] w-[2rem] h-[2rem] bg-black font-semibold rounded-full text-white flex justify-center items-center" >
        <BiArrowBack  />
      </button>

      <form className="max-w-[480px] w-full flex flex-col items-center gap-5 p-4 [&>input]:w-[80%] [&>input]:p-2 [&>input]:rounded [&>input]:outline-none [&>input]:border-2 [&>button]:w-[80%]  [&>button]:p-2 [&>button]:rounded [&>button]:outline-none [&>button]:border-2 [&>select]:w-[80%]  [&>select]:p-2 [&>select]:rounded [&>select]:outline-none [&>select]:border-2"   >
        <h1 className="m-[2rem]  uppercase text-[2rem] text-center font-light">Shipping<br /> Address</h1>
        <input
          type="text"
          placeholder="Address"
          onChange={handlShippingInfo}
          value={address}
          name="address"
          
        />
        <input
          type="text"
          placeholder="City"
          onChange={handlShippingInfo}
          value={city}
          name="city"
        />
        <input
          type="text"
          placeholder="State"
          onChange={handlShippingInfo}
          value={state}
          name="state"
        />

        <select name="country" onChange={handlShippingInfo} className="text-[1.05rem] text-gray-400">
          <option value="">choose your country</option>
          <option value="ind">India</option>
          <option value="usa">United States of America</option>
          <option value="uk">United Kingdom</option>
        </select>

        <input
          type="number"
          placeholder="Pin Code"
          onChange={handlShippingInfo}
          value={pincode}
          name="pincode"
        />
         <button type="submit" className="uppercase bg-teal-700 text-white">pay now</button>
      </form>
    </div>
  );
}

export default Shipping;
