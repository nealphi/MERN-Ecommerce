import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect } from "react";
import { IShopContext, ShopContext } from "../context/shop-contex";
import {
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();
  const {
    availableMoney,
    isAuthenticated,
    setIsAuthenticated,
    setSelectedTab,
    selectedTab,
  } = useContext<IShopContext>(ShopContext);
  const username = localStorage.getItem("username");
  const logout = () => {
    setIsAuthenticated(false);
  };

  useEffect(()=>{
    console.log("selectedTab", selectedTab)
  }, [selectedTab])

  return (
    <Flex className="navbar">
      <Link onClick={() => setSelectedTab("top")} href="/" fontSize={"24px"}  >
        NEALPHI
      </Link>
      <Flex gap={5}>
        <Link href="/shop">Shop</Link>
        { location.pathname === "/" && <Link onClick={() => setSelectedTab("tutorials")}>Tutorials</Link> }
        

        {isAuthenticated && (
          <Flex>
            <Menu>
              <MenuButton>hey {username}!</MenuButton>
              <MenuList>
                <MenuGroup>
                  <MenuItem>
                    <Link href="/checkout">
                      Cart
                      <FontAwesomeIcon icon={faShoppingCart} />
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link href="/purchased-items">Purchases</Link>
                  </MenuItem>
                  <MenuItem>
                    <Text>Wallet</Text>
                    <Text> ${availableMoney.toFixed(2)} </Text>{" "}
                  </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup>
                  <MenuItem>
                    <Link onClick={logout}>
                      Logout
                    </Link>
                  </MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Flex>
        )}

        {!isAuthenticated && <Link href="/auth">Login</Link>}
      </Flex>
    </Flex>
  );


};
