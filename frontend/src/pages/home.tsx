import { Link } from "react-router-dom";
import bannerImage from "../assets/banner1.jpeg";
import ProductCard from "../component/productCard";
import { useLatestProductsQuery } from "../redux/apis/productApi";
import { Product } from "../types/types";
import Loader, { ShadowLoader } from "../component/loader";

const Home = () => {
  const { data, isError, isLoading } = useLatestProductsQuery("");
  console.log("data:", data);

  const addtocartHanlder = () => {};
  return (
    <div className="px-10 h-[calc(100vh - 8rem)]">
      {/* Banner image */}
      <section
        style={{
          backgroundImage: `url(${bannerImage})`,
          height: "40vh",
          width: "full",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          margin: "2rem 0 2.5rem 0",
        }}
      ></section>

      {/* heading and more button */}
      <div className="flex justify-between items-center mb-9">
        <h2 className="font-semibold text-[2rem]">LATEST PRODUCTS</h2>
        <Link to="/searchProducts" className="p-1 bg-blue-100 rounded-sm">
          MORE
        </Link>
      </div>

      {/* cards rows */}

      <main>




        {isError?(<ShadowLoader></ShadowLoader>):(
  data?.latestProducts.map((ele:Product)=> 
    <ProductCard
    key={ele._id}
    productsId={ele._id}
    name={ele.name}
    price={ele.price}
    photo="https://m.media-amazon.com/images/I/81vxWpPpgNL._SL1500_.jpg"
    handler={addtocartHanlder}
    stock={ele.stock}
  />)
        )
        
        }
       
      </main>
    </div>
  );
};

export default Home;
