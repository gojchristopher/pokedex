import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import "@fontsource/inter";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
import { BsFillHandbagFill } from "react-icons/bs";
import { SiZcash } from "react-icons/si";
import { IoLogOut } from "react-icons/io5";
import { useSession, signOut } from "next-auth/react";
import { useQuery } from "@apollo/client";
import "@fontsource/inter";
import { GET_ME } from "src/graphql/queries/profile/me";
import { getMe } from "src/types/getMe";
import useStore from "src/hooks/useStore";
import { useRouter } from "next/router";
import Head from "next/head";

const Header = () => {
  const { data: session } = useSession({ required: true });
  const router = useRouter();
  const numberFormat = new Intl.NumberFormat("en-US");
  const setCurrentPage = useStore((state) => state.setCurrentPage);
  ///get the current user points
  const user_points = useStore((state) => state.points);
  ///resetStore on logout
  const resetStore = useStore((state) => state.clearStore);
  const { data } = useQuery<getMe>(GET_ME);

  return (
    <Box h="7.25rem" background="background.gray500">
      <Head>
        <title>Pokedex App</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Flex
        justifyContent="space-between"
        ml={{ lg: 16, base: 10 }}
        mr={{ lg: 32, base: 10 }}
      >
        <Link passHref href="/home">
          <Heading
            as="a"
            pt={8}
            pb={8}
            color="text.header"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="700"
            fontSize="40px"
            lineHeight="52px"
          >
            Pokedex
          </Heading>
        </Link>
        <HStack>
          <Text
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="400"
            fontSize="16px"
            lineHeight="19px"
            color="text.default"
            mr={5}
          >
            Welcome, {data ? data?.me.firstname : session?.user?.name}
          </Text>
          <Flex
            alignItems={"center"}
            //  mr={32}
            pt={7}
            pb={7}
          >
            <Box zIndex={5}>
              <Menu gutter={10}>
                <MenuButton
                  _focus={{ borderColor: "transparent" }}
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                  rightIcon={
                    <Icon
                      color="light"
                      alignSelf="center"
                      // ml={4}
                      as={FaChevronDown}
                    />
                  }
                >
                  <Avatar
                    w="3.5rem"
                    h="3.5rem"
                    src={
                      session
                        ? `${session.user?.image}`
                        : "https://avatars.dicebear.com/api/male/username.svg"
                    }
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <HStack>
                    <Text pl={4} fontFamily="Inter" fontWeight="semibold">
                      Points:{" "}
                    </Text>
                    <Text
                      fontFamily="Inter"
                      fontWeight="bold"
                      fontStyle="italic"
                    >
                      {numberFormat.format(user_points)}
                    </Text>
                    <Icon as={SiZcash} w={4} h={4} />
                  </HStack>
                  <Center mt={3}>
                    <Avatar
                      w="5rem"
                      h="5rem"
                      src={
                        session
                          ? `${session.user?.image}`
                          : "https://avatars.dicebear.com/api/male/username.svg"
                      }
                    />
                  </Center>
                  <Center>
                    <Text fontWeight="600" fontFamily="Inter">
                      {data ? data?.me.firstname : session?.user?.name}
                    </Text>
                  </Center>
                  <MenuDivider />
                  <MenuItem
                    fontWeight="600"
                    fontFamily="Inter"
                    icon={<BsFillHandbagFill size={25} />}
                    onClick={() => router.push("/home/collections")}
                  >
                    Collections
                  </MenuItem>
                  <Divider height="inherit" orientation="horizontal" />
                  <MenuItem
                    fontWeight="600"
                    fontFamily="Inter"
                    icon={<SiZcash size={25} />}
                    onClick={() => router.push("/home/earn-points")}
                  >
                    Earn Points
                  </MenuItem>
                  <Divider height="inherit" orientation="horizontal" />
                  <MenuItem
                    fontWeight="600"
                    fontFamily="Inter"
                    icon={<IoLogOut size={25} />}
                    onClick={() => {
                      signOut({ callbackUrl: "/" });
                      resetStore();
                      setCurrentPage(1);
                    }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Flex>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
