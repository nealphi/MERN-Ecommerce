import React, { useContext } from "react";
import { IProduct } from "../models/interfaces";
import { IShopContext, ShopContext } from "../context/shop-contex";
interface Props {
  product: IProduct;
}
const Product = (props: Props) => {
  const { _id, productName, description, price, stockQuantity, imageURL } =
    props.product;
  const { addToCart, getCartItemCount } = useContext<IShopContext>(ShopContext);
  const count = getCartItemCount(_id);
  console.log(count);
  return (
    <div className="product">
      <img src={imageURL} alt={productName} />
      <div className="description">
        <h3>{productName}</h3>
        <p>{description}</p>
        <p>${price}</p>
      </div>
      <button className="add-to-cart-bttn" onClick={() => addToCart(_id)}>
        Add To Cart { count > 0 && <>{count}</>}
      </button>
      <div className="stock-quantity">
        {stockQuantity === 0 && <h1>Out Of Stock</h1>}
      </div>
    </div>
  );
};

export default Product;
