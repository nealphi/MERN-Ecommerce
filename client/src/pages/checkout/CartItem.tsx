import React, { useContext } from "react";
import { IProduct } from "../../models/interfaces";
import { IShopContext, ShopContext } from "../../context/shop-contex";

interface Props {
  product: IProduct;
}
const CartItem = (props: Props) => {
  const { _id, productName, price, imageURL } = props.product;
  const { addToCart, getCartItemCount, removeFromCart, updateCartItemCount } =
    useContext<IShopContext>(ShopContext);
  const cartItemCount = getCartItemCount(_id);
  return (
    <div className="cartItem">
      <img src={imageURL} alt={productName} />
      <div className="description">
        <h3>{productName}</h3>

        <p>Price ${price}</p>
      </div>
      <div className="countHandler">
        <button onClick={() => removeFromCart(_id)}> - </button>
        <input type="number" value={cartItemCount} onChange={(e) => updateCartItemCount( Number(e.target.value) , _id)}/>

        <button onClick={() => addToCart(_id)}> + </button>
      </div>
    </div>
  );
};

export default CartItem;
