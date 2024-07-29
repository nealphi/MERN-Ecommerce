import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import { useContext, useEffect, useRef } from "react";
import { IShopContext, ShopContext } from "../../context/shop-contex";
import { useNavigate } from "react-router-dom";
import VideoComponent from "../../components/Video";
const NealphiPage = () => {
  const imageSrc = [
    { "src" :"../1.jpeg"},
    { "src" :"../2.jpeg"},
    { "src" :"../3.jpeg"},
    { "src" :"../4.jpeg"},
    { "src" :"../5.jpeg"},
    { "src" :"../6.jpeg"},
    { "src" :"../7.jpeg"},
    { "src" :"../8.jpeg"}
   ]
  const { selectedTab, setSelectedTab, isAuthenticated } =
    useContext<IShopContext>(ShopContext);
  const topRef = useRef(null);
  const tutorialsRef = useRef(null);
  let navigate = useNavigate();
  const redirect = () => {
    isAuthenticated ? navigate("/shop") : navigate("/auth");
  };

  useEffect(() => {
    const scrollToRef = (ref) => {
      if (ref && ref.current) {
        window.scrollTo({
          top: ref.current.offsetTop,
          behavior: "smooth",
        });
      }
    };

    if (selectedTab === "tutorials") {
      scrollToRef(tutorialsRef);
    }
    return setSelectedTab(" ");
  }, [selectedTab]);

  useEffect(() => {
    window.scrollTo({ top: 10, behavior: "smooth" });
  }, []);

  return (
    <Box>
      <Grid
        className="intro"
        backgroundColor={"#a09b94"}
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(2, 1fr)",
        }}
      >
        <GridItem ref={topRef}>
          <Image
            p={5}
            transition={"all, linear, 0.1s"}
            src="../collection.jpeg"
          />
        </GridItem>
        <GridItem h={"100%"} textAlign={"center"} alignContent={"center"} p={5}>
          <Text fontFamily={"headings"} fontSize={"24px"}>
            Hey Bag Lovers! Welcome to the
          </Text>
          <Text fontFamily={"headings"} fontSize={"68px"}>
            SUMMER PARTY!
          </Text>
          <Button
            fontSize={["24px"]}
            onClick={redirect}
            px={"20%"}
            py={"5%"}
            my={10}
            backgroundColor={"lightGreen"}
            _hover={{ backgroundColor: "darkGreen" }}
            transition={"all, linear, 0.1s"}
          >
            SHOP NEALPHI!
          </Button>
        </GridItem>
      </Grid>
      <Grid
        backgroundColor={"beige"}
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(2, 1fr)",
        }}
      >
        <GridItem p={5}></GridItem>
        <GridItem display={"flex"} justifyContent={"end"} p={5}>
          <VideoComponent />
        </GridItem>
      </Grid>
      <Box backgroundColor={"lightBeige"} ref={tutorialsRef}>
        <Flex justifyContent={'center'} alignItems={'center'} h={"200px"} color={"black"}>
          <Text fontFamily={"headings"} fontSize={"36px"}>
            For more inspiration, follow us at{" "}
            <Link href="https://www.instagram.com/nealphi/"> @nealphi. </Link>
          </Text>
        </Flex>

        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
        >
          {imageSrc.map((image) => (
            <GridItem p={2}>
              <Image src={image.src} />
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default NealphiPage;

/* {YouTubeVideos.map((video) => (
          <GridItem
            // filter="grayscale(100%)"
            // _hover={{ filter: "grayscale(0%)" }}
            justifyContent={"center"}
            alignItems={"center"}
            p={10}
          >
            <Text color={"black"}>{video.description}</Text>
            <YoutubeEmbed embedId={video.embedId} />
          </GridItem>
        ))} */
