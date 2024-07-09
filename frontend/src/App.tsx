// importing packages and utilities
import { onAuthStateChanged } from "firebase/auth";
import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { auth } from "./firebase";

// importing components
import Header from "./component/header";
import Loader from "./component/loader";
import Pr̥otectedRoute from "./component/protected_Routes";
import { getUser } from "./redux/apis/userApi";
import { userExist, userNotExist } from "./redux/reducer/userReducer";
import { UserReducerInitState } from "./types/userApiTypes";

// Import user Routes
/*//* use  Lazy ==> becouse app is open first time then its import all compenents or routes eg - /about, /cart  it will affect the performance*/
const Home = lazy(() => import("./pages/home"));
const Search = lazy(() => import("./pages/search"));
const Cart = lazy(() => import("./pages/cart"));
const Shipping = lazy(() => import("./pages/shipping"));
const Login = lazy(() => import("./pages/login"));
const Orders = lazy(() => import("./pages/order"));

// Imports Admin Routes 
const Dashboard = lazy(() => import("./pages/admin/dashboard"));
const Products = lazy(() => import("./pages/admin/products"));
const Customers = lazy(() => import("./pages/admin/customers"));
const Transaction = lazy(() => import("./pages/admin/transactions"));
const Discount = lazy(() => import("./pages/admin/discount"));
const Barcharts = lazy(() => import("./pages/admin/charts/barCharts"));
const Piecharts = lazy(() => import("./pages/admin/charts/pieCharts"));
const Linecharts = lazy(() => import("./pages/admin/charts/lineCharts"));
const Coupon = lazy(() => import("./pages/admin/apps/coupon"));
const Stopwatch = lazy(() => import("./pages/admin/apps/stopWatch"));
const Toss = lazy(() => import("./pages/admin/apps/toss"));
const NewProduct = lazy(() => import("./pages/admin/management/newProduct"));
const ProductManagement = lazy(
  () => import("./pages/admin/management/productManagment")
);
const TransactionManagement = lazy(
  () => import("./pages/admin/management/transactionManagement")
);
const DiscountManagement = lazy(
  () => import("./pages/admin/management/discountManagment")
);

const NewDiscount = lazy(() => import("./pages/admin/management/newDiscount"));





/*//* SUSPENCE  ==> when one of the childrens routes is loading then it will show the loader */
const App = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(
    (state: { userReducer: UserReducerInitState }) => state.userReducer
  );
  useEffect(() => {
    // user= firebase retured user
    onAuthStateChanged(auth, async (user) => {
      console.log("user:", user);
      if (user) {
        const data = await getUser(user.uid);
        dispatch(userExist(data.user));
      } else {
        dispatch(userNotExist());
      }
    });
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Router>
      {/*Headers [Navbar]*/}
      <Header user={user} />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />

          {/*  not Logged in user routes */}
          <Route
            path="/login"
            element={
              <Pr̥otectedRoute isAuthenticated={user ? false : true}>
                <Login />
              </Pr̥otectedRoute>
            }
          />

          {/* Logged in user routes */}
          <Route element={<Pr̥otectedRoute isAuthenticated={user? true:false}/>} >
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/orders" element={<Orders />} />
          </Route>

          {/* admin routes */}
            {/* Admin Routes */}
            <Route
            element={
              <Pr̥otectedRoute
                isAuthenticated={true}
                adminOnly={true}
                admin={user?.role === "admin" ? true : false}
              />
            }
          >
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/product" element={<Products />} />
            <Route path="/admin/customer" element={<Customers />} />
            <Route path="/admin/transaction" element={<Transaction />} />
            <Route path="/admin/discount" element={<Discount />} />

            {/* Charts */}
            <Route path="/admin/chart/bar" element={<Barcharts />} />
            <Route path="/admin/chart/pie" element={<Piecharts />} />
            <Route path="/admin/chart/line" element={<Linecharts />} />
            {/* Apps */}
            <Route path="/admin/app/coupon" element={<Coupon />} />
            <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
            <Route path="/admin/app/toss" element={<Toss />} />

            {/* Management */}
            <Route path="/admin/product/new" element={<NewProduct />} />

            <Route path="/admin/product/:id" element={<ProductManagement />} />

            <Route
              path="/admin/transaction/:id"
              element={<TransactionManagement />}
            />

            <Route path="/admin/discount/new" element={<NewDiscount />} />

            <Route
              path="/admin/discount/:id"
              element={<DiscountManagement />}
            />
          </Route>

        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </Router>
  );
};

export default App;
