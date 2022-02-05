import { Box, Divider, Flex, Text } from "@chakra-ui/layout";
import type { GetServerSideProps, NextPage } from "next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Header } from "../components/Header/Header";
import TravelTypesSvg from "../public/travelTypes.svg";
import Europe from "../public/europe.png";
import SouthAmerica from "../public/south_america.jpeg";
import NorthAmerica from "../public/north_america.jpeg";
import Asia from "../public/asia.jpeg";
import Africa from "../public/africa.jpeg";
import Image from "next/image";
import Link from "next/link";

// // import Swiper core and required modules
import SwiperCore, { Navigation, Pagination } from "swiper";
import { ReactChild } from "react";
import { useBreakpointValue } from "@chakra-ui/react";

// install Swiper modules
SwiperCore.use([Navigation, Pagination]);

function Banner() {
  return (
    <Box
      width="100%"
      height={"400px"}
      position="relative"
      backgroundImage={"url('/Background.png')"}
      backgroundRepeat={"no-repeat"}
    >
      <Text
        fontSize={["5xl", "5xl", "4xl", "4xl"]}
        lineHeight={["50px", "50px", "30px", "30px"]}
        position="absolute"
        color={"lightHeadings"}
        top={"80px"}
        left={["63px", "63px", "140px", "140px"]}
      >
        5 Continentes,
        <br /> infinitas possibilidades.
      </Text>
      <Text
        fontSize={["2xl", "2xl", "xl", "xl"]}
        position="absolute"
        color={"info"}
        width="524px"
        height="57px"
        top="208px"
        left={["63px", "63px", "140px", "140px"]}
      >
        Chegou a hora de tirar do papel a viagem que você sempre sonhou.{" "}
      </Text>
    </Box>
  );
}

function TravelTypes() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  const activiesTypes = [
    "vida noturna",
    "praia",
    "moderno",
    "clássico",
    "e mais",
  ];
  if (isWideVersion) {
    return <TravelTypesSvg />;
  }
  return (
    <Flex
      justifyContent={"space-evenly"}
      flexDirection="row"
      flexWrap="wrap"
      w="100%"
      h="275px"
    >
      {activiesTypes.map((e) => (
        <Flex
          key={e}
          flexGrow={"initial"}
          w="300px"
          h="50px"
          justifyContent={"center"}
          alignItems="center"
          gap="16px"
        >
          <Box
            w="16px"
            h="16px"
            backgroundColor={"highlight"}
            borderRadius="25px"
          />
          <Box>
            <Text fontSize={"4xl"} textAlign="center" color={"headingsAndText"}>
              {e}
            </Text>
          </Box>
        </Flex>
      ))}
    </Flex>
  );
}

let continentInfo = [
  {
    title: "Europa",
    subTitle: "O continente mais antigo",
    src: Europe,
    link: "europe",
  },
  {
    title: "America do Sul",
    subTitle: "O mais fera!",
    src: SouthAmerica,
    link: "south_america",
  },
  {
    title: "Europa",
    subTitle: "Estados Unidos e outros",
    src: NorthAmerica,
    link: "northamerica",
  },
  {
    title: "Asia",
    subTitle: "O segundo mais antigo",
    src: Asia,
    link: "asia",
  },
  {
    title: "Africa",
    subTitle: "O Egito fica aqui!",
    src: Africa,
    link: "africa",
  },
];

export default function Home() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  return (
    <Flex
      id="home"
      w={["768px", "768px", "960px", "1440px"]}
      // maxWidth={"1440px"}
      justifyContent="center"
      flexDir="column"
      mx="auto"
    >
      <Header />
      <Banner />
      <Flex justifyContent="center" py={["40px", "40px", "80px", "80px"]}>
        <TravelTypes />
      </Flex>
      <Box w="90px" mx="auto" pb="52px">
        <Divider borderBottomWidth="2px" borderBottomColor="gray.900" />
      </Box>
      <Text
        w="100%"
        fontSize={["4xl", "4xl", "3xl", "3xl"]}
        fontWeight="normal"
        color={"headingsAndText"}
        height="101px"
        textAlign="center"
      >
        Vamos nessa? <br /> Então escolha seu continente
      </Text>
      <Box pt="52px" w="100%" px="100px" pb="40px">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          centeredSlides
          onSlideChange={() => console.log("slide change")}
          navigation
          pagination
        >
          {continentInfo.map((el) => (
            <SwiperSlide
              key={el.title}
              style={{ width: isWideVersion ? "1240px" : "768px" }}
            >
              <Box position={"relative"}>
                <Link href={`continents/${el.link}`}>
                  <a>
                    <Box
                      top={["120px", "120px", "180px", "180px"]}
                      left={["150px", "150px", "310px", "310px"]}
                      w={"50%"}
                      position={"absolute"}
                      zIndex={999}
                    >
                      <Text
                        fontSize="4xl"
                        fontWeight={"bold"}
                        color="#F5F8FA"
                        textAlign="center"
                      >
                        {el.title}
                      </Text>
                      <Text
                        fontSize="2xl"
                        fontWeight={"bold"}
                        color="#DADADA"
                        textAlign="center"
                      >
                        {el.subTitle}
                      </Text>
                    </Box>
                  </a>
                </Link>
                <Image
                  src={el.src}
                  alt="continent"
                  width={isWideVersion ? "1240px" : "768px"}
                  height="450px"
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Flex>
  );
}
