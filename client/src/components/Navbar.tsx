import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { IShopContext, ShopContext } from "../context/shop-contex";

export const Navbar = () => {
  const { availableMoney, isAuthenticated, setIsAuthenticated } =
    useContext<IShopContext>(ShopContext);
  const username = localStorage.getItem("username")
  const logout = () => {
  
    setIsAuthenticated(false)
  };
  return (
    <div className="navbar">
      <div className="navbarTitle">
        <h1>NEALPHI Shop</h1>
      </div>
      <div className="navbarLinks">
        {isAuthenticated && (
          <>
            <Link to="/">Shop</Link>
            <Link to="/purchased-items">Purchases</Link>
            <Link to="/checkout">
              <FontAwesomeIcon icon={faShoppingCart} />
            </Link>
            <Link to="/auth" onClick={logout}>
              Logout
            </Link>
            <span> ${availableMoney.toFixed(2)} </span>
            <span> Hi {username}  </span>
          </>
        )}
      </div>
    </div>
  );
};
