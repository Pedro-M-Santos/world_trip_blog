import { Box, Divider, Flex, Text, Grid } from "@chakra-ui/layout";
import type { GetServerSideProps, NextPage } from "next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Header } from "../../components/Header/Header";
import TravelTypesSvg from "../public/travelTypes.svg";
import EuropeCoverImg from "../public/EuropeCoverImg.png";
import Image from "next/image";
import Link from "next/link";
import { ContextType, useEffect, useState } from "react";
import React from "react";
import { useRouter } from "next/router";

type CityInfo = {
  name: string;
  city_tag: string;
  country: string;
  country_tag: string;
};

type StatsItem = {
  [key: string]: string;
};

type UnsplashImageProps = {
  urls: {
    raw: string;
  };
};

interface ContinentProps {
  data: { results: UnsplashImageProps[] } | undefined;
  continentData:
    | {
        id: string;
        info: string;
        name: string;
        stats: StatsItem[];
        cities: [CityInfo];
      }
    | undefined;
}

function CoverImage(props: {
  imgUrl: string | undefined;
  continentName: string | undefined;
}) {
  return (
    <Box
      width="100%"
      height="500px"
      position="relative"
      backgroundImage={`url('${props.imgUrl}')`}
      backgroundRepeat={"round"}
    >
      <Text
        fontWeight="semibold"
        fontSize="4xl"
        position="absolute"
        color={"lightHeadings"}
        width="173px"
        height="72px"
        bottom="60px"
        left="140px"
      >
        {props.continentName}
      </Text>
    </Box>
  );
}

function ContinentInfo(props: { info: string | undefined }) {
  return (
    <Box w={"50%"}>
      <Text fontSize="xl" w="100%" color={"headingsAndText"}>
        {props.info}
      </Text>
    </Box>
  );
}

function ContinentStatsItem(props: { statsItem: StatsItem }) {
  return (
    <Flex
      w="1/3"
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Text color={"highlight"} fontSize={"3rem"} fontWeight={"500"}>
        {props.statsItem[Object.keys(props.statsItem)[0]]}
      </Text>
      <Text color={"headingsAndText"} fontSize={"1rem"} fontWeight={"normal"}>
        {Object.keys(props.statsItem)[0]}
      </Text>
    </Flex>
  );
}

function ContinentStatsList(props: { stats: StatsItem[] | undefined }) {
  return (
    <Box w={"50%"} h="100px">
      <Flex w="100%" flexDir={"row"} justifyContent={"space-evenly"}>
        {props.stats?.map((e, i) => (
          <ContinentStatsItem statsItem={e} key={i} />
        ))}
      </Flex>
    </Box>
  );
}

const useFetchData = (tag: string, type: "city" | "flag" = "city") => {
  const [data, setData] = useState<Response>();
  const [loading, setLoading] = useState(true);
  const link =
    type === "city"
      ? `https://api.unsplash.com/search/photos?client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}&page=1&per_page=1&query=${tag}`
      : `https://countryflagsapi.com/png/${tag}
  `;
  useEffect(() => {
    const fetchData = async () => {
      try {
        let res: Response = await fetch(link);
        res = await res.json();
        console.log(process.env.NODE_ENV, res);
        setData(res);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, [tag, link]);

  return {
    data,
    loading,
  };
};

function CityCard(props: { cityInfo: CityInfo }) {
  const { cityInfo } = props;
  const { data }: { data: any } | undefined = useFetchData(cityInfo.city_tag);
  return (
    <Flex
      position={"relative"}
      w="256px"
      h="279px"
      bg={"white"}
      flexDirection={"column"}
      borderRadius={"4px"}
      overflow={"hidden"}
    >
      <Box
        w="256px"
        h="173px"
        backgroundImage={`url('${data?.results?.[0]?.urls?.raw}')`}
        backgroundRepeat={"round"}
      />
      <Flex
        flexDirection={"column"}
        w="100%"
        h="106px"
        px="25px"
        justifyContent={"space-evenly"}
      >
        <Box
          position={"absolute"}
          bgColor={"highlight"}
          w="30px"
          h="30px"
          rounded={"100%"}
          right={"24px"}
          bottom={"38px"}
          backgroundImage={`url('https://countryflagsapi.com/png/${cityInfo.country_tag}')`}
          backgroundRepeat={"round"}
        />

        <Flex>
          <Text fontSize={"20px"} color="headingsAndText">
            {cityInfo.name}
          </Text>
        </Flex>
        <Flex>
          <Text fontSize={"16px"} color={"info"}>
            {cityInfo.country}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

const MemoizedCityCard = React.memo(CityCard);

function OtherCities(props: { cities: CityInfo[] | undefined }) {
  return (
    <Box position={"relative"} w="100%" h="700px">
      <Text
        fontSize="3xl"
        position="absolute"
        color="gray.600"
        width="246px"
        height="54px"
        top="0px"
        left="0px"
      >
        Cidades + 100
      </Text>
      <Flex
        mt={"54px"}
        py={"40px"}
        w="100%"
        // templateColumns={"repeat(4,1fr)"}
        // gap={"48px"}
        flexWrap={"wrap"}
        justifyContent={"flex-start"}
      >
        {props.cities?.map((e, i) => (
          <Flex key={i} p={"12px"}>
            <MemoizedCityCard cityInfo={e} />
          </Flex>
        ))}
      </Flex>
    </Box>
  );
}

const Continent: React.FC<ContinentProps> = ({
  data,
  continentData,
}: ContinentProps) => {
  return (
    <Flex maxWidth="1440px" justifyContent="center" flexDir="column" mx="auto">
      <Header />
      <CoverImage
        continentName={continentData?.name}
        imgUrl={data?.results?.[2].urls.raw}
      />
      <Flex justifyContent="center" alignItems={"center"} py="80px" px="140px">
        <ContinentInfo info={continentData?.info} />
        <ContinentStatsList stats={continentData?.stats} />
      </Flex>
      <Flex justifyContent="center" alignItems={"center"} px="140px">
        <OtherCities cities={continentData?.cities} />
      </Flex>
    </Flex>
  );
};

// This gets called on every request
export async function getServerSideProps(context: any) {
  // Fetch data from external API
  const { slug } = context.query;
  const res = await fetch(
    `https://api.unsplash.com/search/photos?client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}&page=1&per_page=5&query=${slug}`
  );
  const data = await res.json();

  const res2 = await fetch(`http://localhost:3004/continents?id=${slug}`);
  let continentData = await res2.json();
  continentData = continentData[0];

  // Pass data to the page via props
  return { props: { data, continentData } };
}

export default Continent;
