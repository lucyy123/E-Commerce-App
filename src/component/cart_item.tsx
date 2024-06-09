import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

type CartItmeProp = {
  cartItem: any;
};

const CartItem = ({ cartItem }: CartItmeProp) => {
  const { name, photo, price, quantity, productId } = cartItem;
  return (
    <div className="flex m-6 gap-12">
      <img src={photo} alt="name" className="h-[5rem] w-[5rem]" />
      <article className="flex flex-col justify-center gap-2">
        <Link to={`/product/${productId}`}>{name}</Link>
        <span className="font-bold">₹{price}</span>
      </article>
      <div className="ml-auto flex justify-between items-center gap-4">
        <button className="h-6  w-6  flex justify-center items-center bg-slate-100 font-bold hover:bg-black hover:text-white">-</button>
        <span className="font-bold">{quantity}</span>
        <button className="h-6  w-6  flex justify-center items-center bg-slate-100 font-bold hover:bg-black hover:text-white">+</button>
      </div>
      <button >
        <FaTrash className="hover:text-red-900" />
      </button>
    </div>
  );
};

export default CartItem;
