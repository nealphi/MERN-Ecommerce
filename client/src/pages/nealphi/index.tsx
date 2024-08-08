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
import { useContext, useEffect, useRef, useState } from "react";
import { IShopContext, ShopContext } from "../../context/shop-contex";
import { useNavigate } from "react-router-dom";
import VideoComponent from "../../components/Video";
import { ContactUs } from "../../components/ContactUs";
import YoutubeEmbed from "../../components/YoutubeEmbed";

const NealphiPage = () => {
  // const YouTubeVideos = [
  //   {
  //     embedId: "pa0n47LARZE?si=CKk-TbWzq8L9hVHu",
  //     description: "Transparent Tote Bag Tutorial (English)",
  //   },
  //   {
  //     embedId: "llsFdu0aQ0w?si=QEJvnc98bcMCL6Uz",
  //     description: "Clear Zippered Boxy Pouch Tutorial (English)",
  //   },
  //   {
  //     embedId: "a4CPYPGOZ5Q?si=VgLJSzN7UiLyJkaF",
  //     description: "Transparent Beauty Pouch Tutorial (English)",
  //   },
  //   {
  //     embedId: "spwS0XQpS2g?si=BMTIbaAqpUm_L7Z3",
  //     description: "Clear Zippered Boxy Pouch Tutorial (Persian)",
  //   },
  //   {
  //     embedId: "SQlI8GHD4lI?si=QRbawvKnQOqHTDWO",
  //     description: "Mini Clear Pouch Tutorial (Persian) ",
  //   },
  // ];
  const imageSrc = [
    { src: "../1.jpeg", url: "/p/CV7wLvUopaZ/" },
    { src: "../2.jpeg", url: "/p/Cry06NBIH7z/" },
    { src: "../3.jpeg", url: "/p/CgbfLyioJdR/" },
    { src: "../4.jpeg", url: "/p/CaKO8gUoZTI/" },
    { src: "../5.jpeg", url: "/p/Cn9sYccI9OF/" },
    { src: "../6.jpeg", url: "/p/CiFTPAeofaL/" },
    { src: "../7.jpeg", url: "/p/CTcbIXrIi7d/" },
    { src: "../8.jpeg", url: "/p/CW50vtWoOGg/" },
  ];
  const openUrl = (url) => {
    window.open(
      `https://www.instagram.com${url}`,
      "_blank",
      "noopener,noreferrer"
    );
  };
  const { selectedTab, setSelectedTab, isAuthenticated } =
    useContext<IShopContext>(ShopContext);
  const topRef = useRef(null);
  const tutorialsRef = useRef(null);
  let navigate = useNavigate();
  const redirect = () => {
    isAuthenticated ? navigate("/shop") : navigate("/auth");
  };
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
        backgroundColor={"mocha"}
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(1, 1fr)",
          lg: "repeat(2, 1fr)",
        }}
        p={[0, 10]}
        gap={[5,10]}
      >
        <GridItem ref={topRef}>
          <VideoComponent />
        </GridItem>
        <GridItem
          className={`intro ${isVisible ? "fade-in" : ""}`}
          h={"100%"}
          minH={'200px'}
          textAlign={"center"}
          alignContent={"center"}
        >
          <Text fontFamily={"body"} fontSize={["14px", "16px", "20px"]}>
            Hey Bag Lovers! Welcome to the NEALPHI's
          </Text>
          <Text fontFamily={"headings"} fontSize={["28px", "44px", "56px"]}>
            SUMMER PARTY!
          </Text>
          <Button
            fontFamily={"body"}
            fontSize={["18px", "24px"]}
            onClick={redirect}
            p={[5, 10]}
            my={[5, 10]}
            backgroundColor={"lightGreen"}
            color={"white"}
            _hover={{ backgroundColor: "darkGreen" }}
            transition={"all, linear, 0.1s"}
          >
            SHOP NEALPHI
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
        p={[5, 10]}
        gap={10}
      >
        <GridItem></GridItem>

        <GridItem display={"flex"} justifyContent={"end"}>
          <Image transition={"all, linear, 0.1s"} src="../collection.jpeg" />
        </GridItem>
      </Grid>
      <Grid
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(1, 1fr)",
          lg: "repeat(2, 1fr)",
        }}
        p={[5, 10]}
        bgColor={"lightBeige"}
        gap={[5, 10]}
      >
        <GridItem>
          <Image
            className="fade-in"
            transition={"all, 0.1s"}
            src="../neginpanahi3.jpeg"
          />
          {/* <Flex
            // filter="grayscale(100%)"
            // _hover={{ filter: "grayscale(0%)" }}
            justifyContent={"space-between"}
            alignItems={"center"}
            p={5}
          >
            {YouTubeVideos.map((video) => (
              <YoutubeEmbed embedId={video.embedId} />
            ))}
          </Flex> */}
        </GridItem>
        <GridItem
          display={"flex"}
          flexDirection={"column"}
          textAlign={"justify"}
        >
          <Text fontSize={["14px", "16px"]}>
            After graduating from the Art University of Tehran in 2020, Negin
            Alphi started her business, NEALPHI, by turning an old garage into
            her workspace. NEALPHI offers handmade products, each showing
            Negin's dedication to quality and detail. Her focus on authenticity
            and craftsmanship helped NEALPHI quickly gain recognition and a
            loyal customer base.
          </Text>
          <Text fontSize={["14px", "16"]}>
            NEALPHI's story is not just about high quality handmade items but
            also about the strength and power of women. It highlights the
            success of a business run entirely by women and demonstrates how
            female entrepreneurship can transform simple beginnings into
            thriving ventures.
          </Text>
          <Text fontSize={["14px", "14px", "16"]}>
            Aligned with her dedication to women empowerment, Negin also
            publishes free tutorials on NEALPHI's YouTube channel and runs
            workshops to help other women start their own businesses. She
            believes in sharing her knowledge and skills to support and inspire
            other women to pursue their entrepreneurial dreams.
          </Text>
        </GridItem>
      </Grid>
      <Box backgroundColor={"lightBeige"} p={[5, 10]} ref={tutorialsRef}>
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={2}
        >
          {imageSrc.map((image) => (
            <GridItem cursor={"pointer"}>
              <Image src={image.src} onClick={() => openUrl(image.url)} />
            </GridItem>
          ))}
        </Grid>
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          h={"100px"}
          color={"black"}
          p={10}
        >
          <Text
            textAlign={"center"}
            fontFamily={"headings"}
            fontSize={{ sm: "18px", md: "24px" }}
            color={"mocha"}
          >
            For more inspiration, follow us on Instagram at{" "}
            <Link href="https://www.instagram.com/nealphi/"> @nealphi </Link>
          </Text>
        </Flex>
      </Box>
      <ContactUs />
    </Box>
  );
};

export default NealphiPage;
