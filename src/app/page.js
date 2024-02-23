"use client";
import {
  Box,
  Card,
  CardHeader,
  Text,
  Button,
  CardBody,
  Stack,
  Divider
} from "@chakra-ui/react";
import TableComponent from "@/components/molecules/TableComponent";

export default function Home() {
  return (
    <Box w="full">
      <Card>
        <CardHeader
          display="flex"
          justifyContent="space-between"
          alignContent="center"
        >
          <Box>
            <Text variant={"h1"} fontWeight={"bold"}>
              Resi
            </Text>
            <Text variant={"h2"}>
              Resi pengiriman untuk setiap status perjalanan
            </Text>
          </Box>
          <Box>
            <Button mb={2} colorScheme="blue" size={"sm"}>
              Tambah Data Baru
            </Button>
          </Box>
        </CardHeader>
        <Divider color={"gray.300"} />
        <CardBody>
          <Stack direction="row" spacing={4} align="center">
            <Button colorScheme="teal" variant="outline" size={"sm"} minWidth={"150px"}>
              Scan Depo (20)
            </Button>
            <Button colorScheme="blue" variant="outline" size={"sm"} minWidth={"150px"}>
              Sudah Dikemas (15)
            </Button>
            <Button colorScheme="yellow" variant="outline" size={"sm"} minWidth={"150px"}>
              Dalam Perjalanan (32)
            </Button>
            <Button colorScheme="green" variant="outline" size={"sm"} minWidth={"150px"}>
              Selesai
            </Button>
          </Stack>
          <TableComponent />
        </CardBody>
      </Card>
    </Box>
  );
}
