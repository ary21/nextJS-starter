import { Flex, Heading, Stack, Box, Avatar, Text } from "@chakra-ui/react";

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
        <Avatar bg="blue.600" />
        <Heading color="blue.400">MYAPP</Heading>
        <Text color="black.400">Please Sign in to continue</Text>
        <Box minW={{ base: "90%", md: "468px" }}>{children}</Box>
      </Stack>
    </Flex>
  );
}

export default AuthLayout;
