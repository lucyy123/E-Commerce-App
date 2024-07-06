// importing packages and utilities
import { Suspense, lazy, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector, } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";


// importing components
import Header from "./component/header";
import Loader from "./component/loader";
import { userExist, userNotExist } from "./redux/reducer/userReducer";
import { getUser } from "./redux/apis/userApi";
import { UserReducerInitState } from "./types/apiTypes";

/*//* use  Lazy ==> becouse app is open first time then its import all compenents or routes eg - /about, /cart  it will affect the performance*/
const Home = lazy(() => import("./pages/home"));
const Search = lazy(() => import("./pages/search"));
const Cart = lazy(() => import("./pages/cart"));
const Shipping = lazy(() => import("./pages/shipping"));
const Login = lazy(() => import("./pages/login"));
const Orders = lazy(() => import("./pages/order"));

/*//* SUSPENCE  ==> when one of the childrens routes is loading then it will show the loader */
const App = () => {
  const dispatch = useDispatch();
  const { user,loading } = useSelector((state:{userReducer:UserReducerInitState}) => state.userReducer)
  useEffect(() => {
    // user= firebase retured user
    onAuthStateChanged(auth, async (user) => {
      console.log('user:', user)
      if (user) {
        const data = await getUser(user.uid);
        dispatch(userExist(data.user));
      
      } else {
        dispatch(userNotExist());
      }
    });
  }, []);

  return (
    loading?<Loader/>:
    <Router>
      {/*Headers [Navbar]*/}
      <Header  user={user}/>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />

          {/* Logged in user routes */}
          <Route>
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/orders" element={<Orders />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </Router>
  );
};

export default App;
