import React, { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { Link } from "react-router-dom";
import CartItem from "../component/cart_item";

const cartDetails = {
  cartItems: [
    {
      productId: "kjdfjkldfj",
      photo: "https://m.media-amazon.com/images/I/81vxWpPpgNL._SL1500_.jpg",
      name: "Samsung Galaxy S24 Ultra",
      price: 102199,
      quantity: 4,
      stock: 10,
    },
  ],
  subtotal: 15200,
  shippingCharges: 250,
  tax: function () {
    return this.subtotal * 0.18;
  },
  discount: 400,
  total: function () {
    const sum = this.subtotal + this.shippingCharges + this.tax();
    const totalRupess = sum - this.discount;
    return totalRupess;
  },
};

const Cart = () => {
  const [couponCode, setCouponCode] = useState<String>("");
  const [isValidcouponCode, setIsValidCouponCode] = useState<boolean>(false);

  const handltToDiscount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponCode(e.target.value);
  };

  useEffect(() => {
    //*----------------------------- Debouncing-------------------------------//
    const timeOutId = setTimeout(() => {
      if (Math.random() > 0.5) setIsValidCouponCode(true);
      else setIsValidCouponCode(false);
    }, 1000);

    //*------------------------------------- clean up funtion-----------------------------//
    return () => {
      clearTimeout(timeOutId);
      setIsValidCouponCode(false);
    };
  }, [couponCode]); //?----------------------------- use effect call only then user enter the coupon code------------------------

  return (
    <div className="h-[calc(100vh - 5rem )]  py-8 px-20 flex flex-row items-start  gap-16">
      <main id="mainContent" className="w-[70%] overflow-y-auto">
        {cartDetails.cartItems.length > 0 ? (
          cartDetails.cartItems.map((ele, i) => (
            <CartItem cartItem={ele} key={i} />
          ))
        ) : (
          <h1 className="tracking=[2px]">No items are added</h1>
        )}
      </main>

      <aside className="pt-28 w-[30%] flex flex-col gap-5 &>[p]:text-[1.1rem]">
        {/* -----------------sub total----------------- */}
        <p>Subtotal : ₹{cartDetails.subtotal} </p>
        {/* -----------------Shipping Charges----------------- */}
        <p>Shipping Charges : ₹{cartDetails.shippingCharges}</p>
        {/* -----------------sTax----------------- */}
        <p>Tax : ₹{cartDetails.tax()}</p>
        {/* ----------------- Discount----------------- */}
        <p>
          Discount :<em className="text-[red]">₹{cartDetails.discount}</em>{" "}
        </p>
        {/* ----------------- Total----------------- */}
        <p className="font-bold">Totol : ₹{cartDetails.total()}</p>
        {/* -----------------coupon input----------------- */}
        <input
          className="p-2 rounded-[5px] border-gray-400 border-2 outline-none mt-8"
          type="text"
          name="discount"
          placeholder="Coupon Code "
          id="discount"
          onChange={(e) => handltToDiscount(e)}
        />
        {/* is user fill or type the coupen , then show the coupen message or  coupon invalid error */}

        {couponCode &&
          (isValidcouponCode ? (
            <span className="ml-2 justify-center items-center gap-1 text-[green] font-medium mt-[-1.5rem] [&>code]:font-[900] [&>code]:uppercase text-center">
              ₹{cartDetails.discount} off using the code{" "}
              <code>{couponCode}</code>
            </span>
          ) : (
            <span className="ml-2 justify-center items-center gap-1 text-[red] font-medium mt-[-1.5rem] [&>code]:font-[900] [&>code]:uppercase text-center ">
              Invalid Coupon <VscError style={{ display: "inline" }} />
            </span>
          ))}
        {/* -----------------place order----------------- */}
        <button className="flex justify-center items-center bg-[#2f9cca] text-white font-medium py-2 rounded-[5px]">
          <Link to="/shipping">Checkout</Link>
        </button>
      </aside>
    </div>
  );
};

export default Cart;
