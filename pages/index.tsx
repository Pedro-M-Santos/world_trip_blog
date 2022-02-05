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
        fontSize={"4xl"}
        lineHeight={"30px"}
        position="absolute"
        color={"lightHeadings"}
        // width="426px"
        // height="108px"
        top={["28px", "28px", "80px", "80px"]}
        left={["63px", "63px", "140px", "140px"]}
      >
        5 Continentes,
        <br /> infinitas possibilidades.
      </Text>
      <Text
        fontSize="xl"
        position="absolute"
        color={"info"}
        width="524px"
        height="57px"
        top="208px"
        left="140px"
      >
        Chegou a hora de tirar do papel a viagem que você sempre sonhou.{" "}
      </Text>
    </Box>
  );
}

function TravelTypes() {
  return <TravelTypesSvg />;
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
      <Flex justifyContent="center" py="80px">
        <TravelTypes />
      </Flex>
      <Box w="90px" mx="auto" pb="52px">
        <Divider borderBottomWidth="2px" borderBottomColor="gray.900" />
      </Box>
      <Text
        w="100%"
        fontSize="3xl"
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
            <SwiperSlide key={el.title} style={{ width: "1240px" }}>
              <Box position={"relative"}>
                <Link href={`continents/${el.link}`}>
                  <a>
                    <Box
                      top={"180px"}
                      left={"310px"}
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
                {/* <Box zIndex={-1} position={"absolute"}> */}
                <Image
                  src={el.src}
                  alt="Europa"
                  width="1240px"
                  height="450px"
                />
                {/* </Box> */}
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Flex>
  );
}
