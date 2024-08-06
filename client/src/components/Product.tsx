import React, { useContext } from "react";
import { IProduct } from "../models/interfaces";
import { IShopContext, ShopContext } from "../context/shop-contex";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
interface Props {
  product: IProduct;
}
const Product = (props: Props) => {
  const { _id, productName, description, price, stockQuantity, imageURL } =
    props.product;
    const { isOpen, onOpen, onClose } = useDisclosure()
  // const { isAuthenticated } = useContext<IShopContext>(ShopContext)

  // if (!isAuthenticated) {
  //   return <Navigate to="/auth" />
  // }
  const { addToCart, getCartItemCount, isAuthenticated } =
    useContext<IShopContext>(ShopContext);
  const count = getCartItemCount(_id);


  return (
    <>
    <Card maxW="sm" m={3} onClick={onOpen}>
      <CardBody>
        <Image src={imageURL} alt={productName} borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Heading size="md">{productName}</Heading>
          <Text fontSize="xl">
          $ {price}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
      {isAuthenticated && (
          <Flex mt={2} width={'100%'} justifyContent={'space-between'} alignItems={'center'} >
            <Button onClick={() => addToCart(_id)}>
              {" "}
              {count === 0 ? "Add To Cart" : "Add more"}{" "}
            </Button>
            <Text margin={1} fontSize={"medium"}>
              {count === 0 ? " " : `${count} in Cart`}
            </Text>
            {stockQuantity === 0 && <Text>Out Of Stock</Text>}
          </Flex>
        )}
        {/* <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue">
            Buy now
          </Button>
          <Button variant="ghost" colorScheme="blue">
            Add to cart
          </Button>
        </ButtonGroup> */}
      </CardFooter>
    </Card>
    <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        
        <ModalContent >
          <ModalHeader>{productName}</ModalHeader>
          <Image src={imageURL} alt={productName} borderRadius="lg" marginX={"20px"}/>
          <ModalCloseButton />
          <ModalBody>
           {description}
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme='blue' onClick={() => addToCart(_id)}>
              Add to Cart
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter> */}
        </ModalContent>
        
      </Modal>
    </>
  );
};

export default Product;
