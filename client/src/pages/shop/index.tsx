// import useGetProducts from "../../hooks/useGetProducts"
import "./styles.css";
import Product from "../../components/Product";
import useGetProducts from "../../hooks/useGetProducts";
import { useContext, useEffect, useState } from "react";
import { IShopContext, ShopContext } from "../../context/shop-contex";
import { Navigate } from "react-router-dom";
import { Box, Grid, GridItem } from "@chakra-ui/react";
const ShopPage = () => {
  const { products } = useGetProducts();
  const { isAuthenticated } = useContext<IShopContext>(ShopContext);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }
  return (
    <Box>
      <Grid
        templateColumns={{
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        className={`intro ${isVisible ? "fade-in" : ""}`}
      >
        {products.map((product) => (
          <GridItem key={product.productName}>
            <Product product={product}  />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
  // return (
  //   <div className="shop">
  //     <div className="products">
  //       {products.map((product) => (
  //         <Product product={product} key={product.productName}/>
  //       ))}
  //     </div>
  //   </div>
  // );
};

export default ShopPage;
