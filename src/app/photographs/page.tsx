"use client";

// import Image from "next/image";
// import artAssetIcon from "@public/ArtAsset_Logo.svg";
// import { client } from "../../consts/client";
// import { chain } from "../../consts/chains";
import { inAppWallet } from "thirdweb/wallets";
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
import { SideMenu } from "../../components/shared/SideMenu";

const links = [
  { name: "Paintings", href: "/paintings" },
  { name: "Photographs", href: "/photographs" },
  { name: "Crafts", href: "/crafts" },
  { name: "Trade", href: "../", target: "_blank" },
];

// import Navbar from "../../components/Navbar";
// import Footer from "@/components/Footer";
// import ArticleCardResorces from "@/components/ArticleCardResorces";

export default function Home() {
  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="py-20">
        {/* <Navbar /> */}
        <Header />

        <div className="flex justify-center mb-20">
          <p>
          <b><u>ภาพถ่าย</u></b> จากตากล้องทั้งมืออาชีพและผู้คลั่งไคล้การถ่ายภาพเป็นงานอดิเรก สามารถนำขึ้นมาเก็บไว้บน Digital Gallery ทำทำการพิมพ์ซ้ำ ได้หลายครั้ง และใช้ NFT Token Digital เป็น Identity เพื่อแยกแยะภาพต้นฉบับและภาพ Re-Print ออกจากกันได้รวมทั้งพิสูจน์ทราบตัวตนของผู้ถือครองผลงานต้นฉบับได้ด้วย CryptoSignature
          </p>
        </div>

        {/* <ArticleCardResorces /> */}
        {/* <Footer /> */}
      </div>
    </main>
  );
}

function Header() {
  return (
    <header className="flex flex-col items-center mb-20 md:mb-20">
      {/* <Image
        src={artAssetIcon}
        alt=""
        className="mb-6 size-[150px] md:size-[150px]"
        style={{
          filter: "drop-shadow(0px 0px 24px #a726a9a8)",
        }}
      /> */}

      <h1 className="justify-items-center text-xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-6 text-zinc-100">
        ArtAsset.ai{" "}
        <p></p>
        <span className="inline-block -skew-x-6 text-4xl text-blue-500"> Studio </span>
        <span className="text-zinc-300 inline-block mx-1 text-4xl"> and </span>
        <span className="inline-block -skew-x-6 text-blue-500 text-4xl"> Academy </span>
      </h1>

      <p className="text-zinc-300 text-base">
        ที่ซึ่ง{" "}
        <code className="bg-zinc-800 text-zinc-300 px-2 rounded py-1 text-sm mx-1">
        งานศิลปะ
        </code>{" "}
        บนโลกจริงเชื่อมโยงกับโลกดิจิทัล
      </p>
    </header>
  );
}