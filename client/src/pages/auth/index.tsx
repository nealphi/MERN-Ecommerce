import { SyntheticEvent, useContext, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { UserErrors } from "../../models/errors";
import "./styles.css";
import { IShopContext, ShopContext } from "../../context/shop-contex";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  chakra,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const CFaUserAlt = chakra(FaUserAlt);
const MdEmailAlt = chakra(MdEmail);
const CFaLock = chakra(FaLock);

const AuthPage = () => {
  const [isVisible, setIsVisible] = useState<string>("login");

  return (
    <div className="auth">
      <Register isVisible={isVisible} setIsVisible={setIsVisible} />
      <Login isVisible={isVisible} setIsVisible={setIsVisible} />
    </div>
  );
};

const Register = ({ isVisible, setIsVisible }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const api = "https://nealphi-ecommerce-server.vercel.app";
  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    try {
      await axios.post(`${api}/user/register`, {
        email,
        username,
        password,
      });

      alert("registration completed! Now login!");
      setEmail(" ");
      setUsername(" ");
      setPassword(" ");
      setIsVisible("login");
    } catch (err) {
      if (err?.respose?.data?.type === UserErrors.USERNAME_ALREADY_EXISTS) {
        alert("Error: Username already in use");
      } else if (err?.respose?.data?.type === UserErrors.EMAIL_ALREADY_EXISTS) {
        alert("Error: Email already in use");
      } else {
        alert("Error: Something went wrong");
      }
    }
  };

  return (
    <Flex
      display={isVisible === "register" ? "block" : "none"}
      flexDirection="column"
      width="100wh"
      height="100vh"
      alignContent={"center"}
      justifyContent="center"
      alignItems="center"
      color="gray.300"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<MdEmailAlt color="gray.300" />}
                  />
                  <Input
                    placeholder={"Email"}
                    type="email"
                    id="email"
                    focusBorderColor="darkGreen"
                    borderColor="lightGreen"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    placeholder={"Username"}
                    type="text"
                    id="username"
                    focusBorderColor="darkGreen"
                    borderColor="lightGreen"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    id="password"
                    focusBorderColor="darkGreen"
                    borderColor="lightGreen"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={handleShowClick}
                      color={"darkGreen"}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                fontSize={["20px"]}
                px={"20%"}
                py={"5%"}
                my={10}
                color={"white"}
                backgroundColor={"lightGreen"}
                _hover={{ backgroundColor: "darkGreen" }}
                transition={"all, linear, 0.1s"}
                type="submit"
                variant="solid"
                width="full"
              >
                Register
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Already a member?{" "}
        <Link color="teal.500" href="#" onClick={() => setIsVisible("login")}>
          Login
        </Link>
      </Box>
    </Flex>
  );
};

const Login = ({ isVisible, setIsVisible }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext<IShopContext>(ShopContext);
  const api = "https://nealphi-ecommerce-server.vercel.app";

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    try {
      const result = await axios.post(`${api}/user/login`, {
        username,
        password,
      });

      setCookies("access_token", result.data.token);
      window.localStorage.setItem("userID", result.data.userID);
      window.localStorage.setItem("username", username);
      setIsAuthenticated(true);
      navigate("/");
    } catch (err) {
      let errorMessage: string = "";
      switch (err?.response?.data?.type) {
        case UserErrors.USERNAME_ALREADY_EXISTS:
          errorMessage = "User already exists";
          break;
        case UserErrors.WRONG_CREDENTIALS:
          errorMessage = "Wrong username/password combination";
          break;
        default:
          errorMessage = "Something went wrong";
      }

      alert(`ERROR: ${errorMessage}`);
    }
  };

  return (
    <Flex
      display={isVisible === "login" ? "block" : "none"}
      flexDirection="column"
      width="100wh"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      alignContent={"center"}
      color="gray.300"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="text"
                    id="username"
                    focusBorderColor="darkGreen"
                    borderColor="lightGreen"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    focusBorderColor="darkGreen"
                    borderColor="lightGreen"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={handleShowClick}
                      color={"darkGreen"}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {/* <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText> */}
              </FormControl>
              <Button
                fontSize={["20px"]}
                px={"20%"}
                py={"5%"}
                my={10}
                backgroundColor={"lightGreen"}
                color={"white"}
                _hover={{ backgroundColor: "darkGreen" }}
                transition={"all, linear, 0.1s"}
                type="submit"
                variant="solid"
                width="full"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to NEALPHI?{" "}
        <Link
          color="teal.500"
          href="#"
          onClick={() => setIsVisible("register")}
        >
          Register
        </Link>
      </Box>
    </Flex>
  );
};

export default AuthPage;
