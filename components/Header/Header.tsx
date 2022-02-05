import React from "react";
import { Flex } from "@chakra-ui/react";
import LogoImg from "../../public/Logo.svg";
import Link from "next/link";

export function Header() {
  // const isWideVersion = useBreakpointValue({
  //   base: false,
  //   lg: true,
  // });
  return (
    <Flex
      as="header"
      w="100%"
      h={["50px", "50px", "100px", "100px"]}
      mx="auto"
      px="6"
      align="center"
      justify="center"
    >
      <Link href={`/`}>
        <a>
          <LogoImg />
        </a>
      </Link>
    </Flex>
  );
}
