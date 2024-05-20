import { FaPlus } from "react-icons/fa";

type ProductsProps = {
  productsId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: () => void;
};

const ProductCard = ({productsId,price,name,stock,handler,photo}:ProductsProps) => {
  return (
    <div className="flex flex-col gap-2 h-[18rem] w-[16rem] shadow-xl p-[calc(18rem - 1rem)] relative">
      {/* image */}
      <img src={photo} alt="cardImage"  style={{
        height:"12rem",
        width:"12rem",
        objectFit:"cover",
        margin:"auto",
        marginBottom:"0.5rem"

      }}/>

      {/* name  */}
      <p className="text-center">{name}</p>
      {/* price */}
      <span className="text-center mt-1 font-bold">₹ {price}</span>

      {/* overlay div */}

      <div className="absolute top-0 left-0 opacity-0  hover:opacity-95 bg-[#0000006b] h-full w-full flex items-center justify-center cursor-pointer transition-all duration-300">
        <button onClick={handler}  className="flex justify-center items-center h-12 w-12 hover:rotate-12 rounded-full text-[1.1rem] bg-blue-500 text-white ">< FaPlus /></button>
      </div>
    </div>
  );
};

export default ProductCard;
