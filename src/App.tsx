import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./component/loader";
import Header from "./component/header";

/*//* use  Lazy ==> becouse app is open first time then its import all compenents or routes eg - /about, /cart  it will affect the performance*/
const Home = lazy(() => import("./pages/home"));
const Search = lazy(() => import("./pages/search"));
const Cart = lazy(() => import("./pages/cart"));

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
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
