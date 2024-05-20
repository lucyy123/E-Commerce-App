import { useState } from "react";
import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const user = {
  _id: "1236",
  role: "admin",
};

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav className="flex justify-end gap-3 items-center px-[2rem] py-[1rem]">
      {/*  Common Routings  */}
      <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
      <Link to="/search" onClick={() => setIsOpen(false)}>
        <FaSearch />
      </Link>
      <Link to="/cart"onClick={() => setIsOpen(false)}>
        <FaShoppingBag />
      </Link>

      {/* condition base routing -- user and Admin */}

      {user?._id ? (
        <>
          {/** USER IS LOGIN */}
          <button onClick={() => setIsOpen((pre) => !pre)}>
            <FaUser />
          </button>
          <dialog open={isOpen} style={{
            position: "absolute",
            top :"8%",
            left: "calc(100% - 100px)",
          }} >
            <div className=" flex flex-col gap-1 p-2 border">
              {user.role === "admin" && (
                <Link to="/admin/dashboard" onClick={() => setIsOpen(false)}>Admin</Link>
              )}

              <Link to="/orders" onClick={() => setIsOpen(false)}>Orders</Link>
              <button>
                <FaSignOutAlt />
              </button>
            </div>
          </dialog>
        </>
      ) : (
        <>
          <Link to="/login" onClick={() => setIsOpen(false)}>
            <FaSignInAlt />
          </Link>
        </>
      )}
    </nav>
  );
};

export default Header;
