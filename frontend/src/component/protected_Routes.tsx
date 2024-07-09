import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

type Props = {
  children?: ReactElement;
  admin?: boolean;
  adminOnly?: boolean;
  isAuthenticated: boolean;
  redirect?: string;
};

const Pr̥otectedRoute = ({
  children,
  admin,
  adminOnly,
  redirect = "/",
  isAuthenticated,
}: Props) => {
  if (!isAuthenticated) return <Navigate to={redirect} />;
  if(adminOnly && ! admin) return <Navigate to={redirect}/>

  return children?children : <Outlet/>;
// <Outlet/>:- so, basically outlet is used as element ,
 // where we wraps multple route in a single route as chilrens 
 // so,with the help of outlet we use them

};

export default Pr̥otectedRoute;
