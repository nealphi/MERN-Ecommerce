import axios from "axios";
import { useEffect, useState } from "react";
import { useGetToken } from "./useGetToken";
import { IProduct } from "../models/interfaces";
import { useCookies } from "react-cookie";

const useGetProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { headers } = useGetToken();
  const [cookies, setCookies] = useCookies(["access_token"]);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    cookies.access_token !== null
  );
  const api = "https://nealphi-server.vercel.app/"

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await axios.get(`${api}/product`, {
        headers,
      });
      setProducts(fetchedProducts.data.products);
    } catch (err) {
      console.log("ERROR: fetchProducts!");
    }
  };
  
  useEffect(() => {
    if (isAuthenticated)
    fetchProducts();
  }, [isAuthenticated]);


  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.clear();
      setCookies("access_token", null);
    }
  }, [isAuthenticated]);

  return {products, fetchProducts}
};

export default useGetProducts;
