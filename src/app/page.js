import { Box } from "@chakra-ui/react";
import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <Box w="full" p={4} display="flex" flexDirection="column" alignItems={"center"} gap={4}>
      <Image
        src="/next.svg"
        alt="Next.js Logo"
        width={100}
        height={10}
        priority
      />
      <p>Home</p>
    </Box>
  );
}
