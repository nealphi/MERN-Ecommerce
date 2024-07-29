import { createContext, useEffect, useState } from "react";
import useGetProducts from "../hooks/useGetProducts";
import { IProduct } from "../models/interfaces";
import axios from "axios";
import { useGetToken } from "../hooks/useGetToken";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export interface IShopContext {
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemCount: (newAmount: number, itemId: string) => void;
  getCartItems: () => void;
  getCartItemCount: (itemId: string) => number;
  getTotalCartAmount: () => number;
  checkout: () => void;
  availableMoney: number;
  fetchAvailableMoney: () => void;
  purchasedItems: IProduct[];
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthentcated: boolean) => void;
  selectedTab: string;
  setSelectedTab: (selectedTab: string) => void;
}

const defaultVal: IShopContext = {
  addToCart: () => null,
  removeFromCart: () => null,
  updateCartItemCount: () => null,
  getCartItems: () => null,
  getCartItemCount: () => 0,
  getTotalCartAmount: () => 0,
  checkout: () => null,
  availableMoney: 0,
  fetchAvailableMoney: () => null,
  purchasedItems: [],
  isAuthenticated: false,
  setIsAuthenticated: () => null,
  selectedTab: "top",
  setSelectedTab: () => null,
};

export const ShopContext = createContext<IShopContext>(defaultVal);

export const ShopContextProvider = (props) => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [cartItems, setCartItems] = useState<{ [key: string]: number } | {}>(
    {}
  );
  const [availableMoney, setAvailableMoney] = useState<number>(0);
  const [purchasedItems, setPurchasedItems] = useState<IProduct[]>([]);
  const { products, fetchProducts } = useGetProducts();
  const { headers } = useGetToken();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    cookies.access_token !== null
  );
  const[selectedTab, setSelectedTab] = useState<string>("top")

  const fetchAvailableMoney = async () => {
    try {
      const res = await axios.get(
        `/user/available-money/${localStorage.getItem(
          "userID"
        )}`,
        { headers }
      );
      setAvailableMoney(res.data.availableMoney);
    } catch (err) {
      alert("ERROR: fetchAvailableMoney");
    }
  };
  const fetchPurchasedItems = async () => {
    try {
      const res = await axios.get(
        `/product/purchased-items/${localStorage.getItem(
          "userID"
        )}`,
        { headers }
      );
      setPurchasedItems(res.data.purchasedItems);
    } catch (err) {
      alert("ERROR: fetchPurchasedItems!");
    }
  };

  const getCartItemCount = (itemId: string): number => {
    if (cartItems && itemId in cartItems) {
      return cartItems[itemId];
    }
    return 0;
  };

  

  const addToCart = async (itemId: string) => {
    setCartItems((prev) => {
      const updatedCartItems = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
      const body = { customerID: localStorage.getItem("userID"), cartItems: updatedCartItems };
      
      // Make sure to use updatedCartItems here
      axios.post("/product/cart/edit", body, { headers })
        .catch(error => console.error("Error adding to cart", error));
      
      return updatedCartItems;
    });
  };
  
  const removeFromCart = async (itemId: string) => {
    setCartItems((prev) => {
      if (!prev[itemId]) return prev;
      const updatedCartItems = { ...prev, [itemId]: prev[itemId] - 1 };
      const body = { customerID: localStorage.getItem("userID"), cartItems: updatedCartItems };
        axios.post("/product/cart/edit", body, { headers })
        .catch(error => console.error("Error removing from cart", error));
      return updatedCartItems;
    });
  };
  const updateCartItemCount = async (newAmount: number, itemId: string) => {
    if (newAmount < 0) return;
  
    setCartItems((prev) => {
      const updatedCartItems = { ...prev, [itemId]: newAmount };
      const body = { customerID: localStorage.getItem("userID"), cartItems: updatedCartItems };
  
      // Make sure to use updatedCartItems in the API call
      axios.post("/product/cart/edit", body, { headers })
        .catch(error => console.error("Error updating cart item count", error));
  
      return updatedCartItems;
    });
  };

  const getCartItems = async () => {
    try {
      const response = await axios.get(
        `/product/cart/${localStorage.getItem("userID")}`,  { headers }
      );
      if (response.data.success) {
        setCartItems(response.data.cartItems); // Update your state with retrieved cart items
      }
    } catch (error) {
      console.error("Error getting cart items", error);
    }
  };


  const getTotalCartAmount = () => {
    if (products.length === 0) return 0;

    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo: IProduct = products.find(
          (product) => product._id === item
        );
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return Number(totalAmount.toFixed(2));
  };

  const checkout = async () => {
    const body = { customerID: localStorage.getItem("userID"), cartItems };
    try {
      await axios.post("/product/checkout", body, {
        headers,
      });
      setCartItems({});
      fetchAvailableMoney();
      fetchPurchasedItems();
      fetchProducts();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    if (isAuthenticated) {
      fetchAvailableMoney();
      fetchPurchasedItems();
      getCartItems();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.clear();
      setCookies("access_token", null);
    }
  }, [isAuthenticated]);


  const contextValue: IShopContext = {
    addToCart,
    removeFromCart,
    updateCartItemCount,
    getCartItems,
    getCartItemCount,
    getTotalCartAmount,
    checkout,
    availableMoney,
    fetchAvailableMoney,
    purchasedItems,
    isAuthenticated,
    setIsAuthenticated,
    selectedTab,
    setSelectedTab,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
