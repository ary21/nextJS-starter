"use client";
import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  Tooltip,
  useColorModeValue,
  useDisclosure,
  IconButton,
  Image,
  Text,
  Avatar,
  Divider,
  Img,
} from "@chakra-ui/react";
import { BsGearFill } from "react-icons/bs";
import {
  HiOutlineLogout,
  HiCollection,
  HiUsers,
  HiUserCircle,
} from "react-icons/hi";
import { MdHome } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { FaDolly } from "react-icons/fa";
import { useRouter } from "next/navigation";
import React from "react";

export default function AppLayout({ children }) {
  const router = useRouter();
  const sidebar = useDisclosure();
  const color = useColorModeValue("gray.600", "gray.300");
  const wSideBar = 20;

  const onNavItemClick = (pageLink) => {
    router.push(pageLink);
  };

  const NavItem = (props) => {
    const { label, icon, ...rest } = props;
    return (
      <Tooltip label={label} hasArrow placement="right">
        <Flex
          align="center"
          px="4"
          pl="4"
          py="3"
          cursor="pointer"
          color="inherit"
          _dark={{ color: "gray.400" }}
          _hover={{
            bg: "gray.100",
            _dark: { bg: "gray.900" },
            color: "gray.900",
          }}
          role="group"
          fontWeight="semibold"
          transition=".15s ease"
          justifyContent={{ base: "left", md: "center" }}
          {...rest}
        >
          {icon && (
            <Icon
              mx="2"
              boxSize="4"
              _groupHover={{
                color: color,
              }}
              as={icon}
            />
          )}
          <Text display={{ base: "unset", md: "none" }}>{label}</Text>
        </Flex>
      </Tooltip>
    );
  };

  const SidebarContent = (props) => (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      w={wSideBar}
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      border
      color="inherit"
      borderRightWidth="1px"
      bg="blue.600"
      {...props}
    >
      <Flex px="4" py="5" align="center">
        <Image src="/logo.svg" alt="Choc UI" height={12} />
        {/* <Text ml="2" fontSize="1xl" color="white" fontWeight="semibold">
          AppName
        </Text> */}
      </Flex>
      <Flex
        as="nav"
        direction="column"
        fontSize="sm"
        color="white"
        aria-label="Main Navigation"
      >
        <NavItem
          icon={HiCollection}
          onClick={() => onNavItemClick("/")}
          label="Home"
        />

        <NavItem
          icon={FaDolly}
          onClick={() => onNavItemClick("/customer")}
          label="Customer"
        />

        <NavItem
          icon={HiUsers}
          onClick={() => onNavItemClick("/admin")}
          label="Admin"
        />

        <NavItem
          icon={BsGearFill}
          onClick={() => onNavItemClick("/setting")}
          label="Setting"
        />

        <NavItem
          icon={HiOutlineLogout}
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/auth/login';
          }}
          label="Logout"
        />

        {/* <NavItem icon={FaClipboardCheck} onClick={() => onNavItemClick('/manifest')}>Manifest</NavItem> */}
        {/* <NavItem icon={FaRss} onClick={() => onNavItemClick('/tracking')}>Tracking</NavItem> */}
        {/*
        <NavItem icon={HiCode} onClick={integrations.onToggle}>
          Integrations
          <Icon
            as={MdKeyboardArrowRight}
            ml="auto"
            transform={integrations.isOpen && "rotate(90deg)"}
          />
        </NavItem>
        <Collapse in={integrations.isOpen}>
          <NavItem pl="12" py="2">
            Shopify
          </NavItem>
          <NavItem pl="12" py="2">
            Slack
          </NavItem>
          <NavItem pl="12" py="2">
            Zapier
          </NavItem>
        </Collapse>
        */}
      </Flex>
      <Flex
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        gap={2}
        my={2}
        sx={{ position: "fixed", bottom: "0", width: "inherit" }}
        display={{ base: "none", md: "flex" }}
      >
        <Divider />
        <HiUserCircle
          name="ava"
          cursor="pointer"
          color="#fff"
          size="40px"
        />
      </Flex>
    </Box>
  );

  return (
    <Box as="section" bg="gray.50" _dark={{ bg: "gray.700" }} minH="100vh">
      <SidebarContent display={{ base: "none", md: "unset" }} />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>

      <Box ml={{ base: 0, md: wSideBar }} transition=".3s ease">
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="4"
          bg="white"
          borderBottomWidth="1px"
          color="inherit"
          h="14"
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            aria-label="Menu"
            display={{ base: "inline-flex", md: "none" }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size="sm"
          />
          {/* NOTE : i just want content full height
          <InputGroup w="96" display={{ base: "none", md: "flex" }}>
            <InputLeftElement color="gray.500">
              <FiSearch />
            </InputLeftElement>
            <Input placeholder="Search here..." />
          </InputGroup>
          */}
          <Flex align="center" display={{ base: "unset", md: "none" }}>
            <HiUserCircle
              ml="4"
              size="40px"
              name="ava"
              color="blue.600"
              cursor="pointer"
            />
          </Flex>
        </Flex>

        <Box as="main" p="4">
          <Box rounded="md" minH={{ base: "96", md: "3xl" }}>
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
