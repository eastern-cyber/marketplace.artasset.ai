"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Image,
  Stack,
  IconButton,
  useColorMode,
  useDisclosure,
  Collapse,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { FaRegMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";
import { FiUser, FiMenu, FiX } from "react-icons/fi";
import { client } from "@/consts/client";
import {
  ConnectButton,
  useActiveAccount,
  useActiveWallet,
  useDisconnect,
} from "thirdweb/react";
import type { Wallet } from "thirdweb/wallets";
import { blo } from "blo";
import { useGetENSName } from "@/hooks/useGetENSName";
import { useGetENSAvatar } from "@/hooks/useGetENSAvatar";
import { Link } from "@chakra-ui/next-js";
import { SideMenu } from "./SideMenu";

const links = [
  { name: "Paintings", href: "/paintings" },
  { name: "Photographs", href: "/photographs" },
  { name: "Crafts", href: "/crafts" },
  { name: "Trade", href: "./" },
];

export function Navbar() {
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const { colorMode } = useColorMode();
  const { isOpen, onToggle } = useDisclosure();
  const pathname = usePathname();

  return (
    <Box py="30px" px={{ base: "20px", lg: "50px" }}>
      <Flex justify="space-between" align="center">
        <Heading
          as={Link}
          href="/"
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontWeight="extrabold"
          _hover={{ textDecoration: "none" }}
        >
          ArtAsset
        </Heading>

        {/* Desktop Nav */}
        <Flex display={{ base: "none", md: "flex" }} align="center" gap={6}>
          {links.map((link) => {
            const isActive = pathname === link.href;
            return link.target === "_blank" ? (
              <ChakraLink
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                fontSize="lg"
                fontWeight={isActive ? "bold" : "normal"}
                color={isActive ? "blue.300" : "gray.200"}
                _hover={{ color: "yellow.400" }}
              >
                {link.name}
              </ChakraLink>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                fontSize="lg"
                fontWeight={isActive ? "bold" : "normal"}
                color={isActive ? "blue.300" : "gray.200"}
                _hover={{ color: "yellow.400" }}
              >
                {link.name}
              </Link>
            );
          })}
        </Flex>

        {/* Right section */}
        <Flex align="center" gap={2}>
          <ToggleThemeButton />
          {account && wallet ? (
            <ProfileButton address={account.address} wallet={wallet} />
          ) : (
            <ConnectButton
              client={client}
              theme={colorMode}
              connectButton={{ style: { height: "56px" } }}
            />
          )}
          {/* Mobile Menu Toggle */}
          <IconButton
            icon={isOpen ? <FiX /> : <FiMenu />}
            display={{ base: "flex", md: "none" }}
            onClick={onToggle}
            aria-label="Toggle navigation"
            variant="ghost"
          />
        </Flex>
      </Flex>

      {/* Mobile Nav Links */}
      <Collapse in={isOpen} animateOpacity>
        <Stack mt={4} spacing={4} display={{ md: "none" }}>
          {links.map((link) => {
            const isActive = pathname === link.href;
            return link.target === "_blank" ? (
              <ChakraLink
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                fontSize="lg"
                fontWeight={isActive ? "bold" : "normal"}
                color={isActive ? "blue.300" : "gray.200"}
                _hover={{ color: "yellow.400" }}
                display="block"
              >
                {link.name}
              </ChakraLink>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                fontSize="lg"
                fontWeight={isActive ? "bold" : "normal"}
                color={isActive ? "blue.300" : "gray.200"}
                _hover={{ color: "yellow.400" }}
                display="block"
              >
                {link.name}
              </Link>
            );
          })}
        </Stack>
      </Collapse>
    </Box>
  );
}

function ToggleThemeButton() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button onClick={toggleColorMode} height="56px" width="56px">
      {colorMode === "light" ? <FaRegMoon /> : <IoSunny />}
    </Button>
  );
}

function ProfileButton({
  address,
  wallet,
}: {
  address: string;
  wallet: Wallet;
}) {
  const { disconnect } = useDisconnect();
  const { data: ensName } = useGetENSName({ address });
  const { data: ensAvatar } = useGetENSAvatar({ ensName });
  const { colorMode } = useColorMode();

  return (
    <Menu>
      <MenuButton as={Button} height="56px">
        <Flex gap={2} align="center">
          <FiUser size={24} />
          <Image
            src={ensAvatar ?? blo(address as `0x${string}`)}
            height="40px"
            rounded="8px"
            alt="Avatar"
          />
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem>
          <ConnectButton client={client} theme={colorMode} />
        </MenuItem>
        <MenuItem as={Link} href="/profile">
          Profile {ensName ? `(${ensName})` : ""}
        </MenuItem>
        <MenuItem onClick={() => disconnect(wallet)}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
}
