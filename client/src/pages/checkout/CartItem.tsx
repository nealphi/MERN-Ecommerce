import React, { useContext } from "react";
import { IProduct } from "../../models/interfaces";
import { IShopContext, ShopContext } from "../../context/shop-contex";
import { Button, Flex, Image, Input, Stack, Text } from "@chakra-ui/react";

interface Props {
  product: IProduct;
}
const CartItem = (props: Props) => {
  const { _id, productName, price, imageURL } = props.product;
  const { addToCart, getCartItemCount, removeFromCart, updateCartItemCount } =
    useContext<IShopContext>(ShopContext);
  const cartItemCount = getCartItemCount(_id);
  return (
      <Flex width={'60vw'} padding={'30px'} bg={'gray.100'} marginY={'20px'} borderRadius={'20px'} justifyContent={'space-between'} alignItems={'center'}>
        <Image width={'20%'} src={imageURL} alt={productName} borderRadius={'20px'}/>
        <Text fontSize={["16px","24px"]}  >{productName}</Text>
        <Text>Price ${price}</Text>
        <Stack>
          <Button bg={'lightGreen'} onClick={() => removeFromCart(_id)}> - </Button>
          <Input  type="number"
          value={cartItemCount}
          onChange={(e) => updateCartItemCount(Number(e.target.value), _id)} />
          <Button bg={'lightGreen'} onClick={() => addToCart(_id)}> + </Button>
        </Stack>
      </Flex>
  );
};

export default CartItem;
