// import useGetProducts from "../../hooks/useGetProducts"
import './styles.css'
import Product from "../../components/Product";
import useGetProducts from "../../hooks/useGetProducts";
import { useContext } from 'react';
import { IShopContext, ShopContext } from '../../context/shop-contex';
import { Navigate } from 'react-router-dom';

const ShopPage = () => {
  const { products } = useGetProducts();
  const { isAuthenticated } = useContext<IShopContext>(ShopContext)
 
  if (!isAuthenticated) {
    return <Navigate to="/auth" />
  }
  
  return (
    <div className="shop">
      <div className="products">
        {products.map((product) => (
          <Product product={product} />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
