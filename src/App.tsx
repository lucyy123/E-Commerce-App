import { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./component/header";
import Loader from "./component/loader";


/*//* use  Lazy ==> becouse app is open first time then its import all compenents or routes eg - /about, /cart  it will affect the performance*/
const Home = lazy(() => import("./pages/home"));
const Search = lazy(() => import("./pages/search"));
const Cart = lazy(() => import("./pages/cart"));
const Shipping = lazy(() => import("./pages/shipping"));

/*//* SUSPENCE  ==> when one of the childrens routes is loading then it will show the loader */
const App = () => {
  return (
    <Router>
      {/*Headers [Navbar]*/}
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<Search />} />
          <Route path="cart" element={<Cart />} />

          {/* Logged in user routes */}
          <Route>
            <Route path="/shipping" element={<Shipping/>}/>
          </Route>


        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
