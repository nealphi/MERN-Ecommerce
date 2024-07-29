// import useGetProducts from "../../hooks/useGetProducts"
import "./styles.css";
import Product from "../../components/Product";
import useGetProducts from "../../hooks/useGetProducts";
import { useContext } from "react";
import { IShopContext, ShopContext } from "../../context/shop-contex";
import { Navigate } from "react-router-dom";
import YoutubeEmbed from "../../components/YoutubeEmbed";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import products from '/Users/negin/Desktop/MERN-eCommerce/client/public/product.json'
const ShopPage = () => {
  const { products } = useGetProducts();
  const { isAuthenticated } = useContext<IShopContext>(ShopContext)

  if (!isAuthenticated) {
    return <Navigate to="/auth" />
  }
  return (

    <Box>
      <Grid  templateColumns={{
      sm: "repeat(2, 1fr)",
      md: "repeat(3, 1fr)",
      lg: "repeat(4, 1fr)",
    }}>
        {products.map((product) => (
          <GridItem >
            <Product product={product} key={product.productName}/>
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
