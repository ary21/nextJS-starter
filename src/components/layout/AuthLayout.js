import { Flex, Heading, Stack, Box, Avatar } from "@chakra-ui/react";

function AuthLayout({ children }) {
  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>{children}</Box>
      </Stack>
    </Flex>
  );
}

export default AuthLayout;
