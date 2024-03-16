"use client";
import {
  Box,
  Card,
  CardHeader,
  Text,
  Button,
  CardBody,
  Stack,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  useDisclosure
} from "@chakra-ui/react";
import TableComponent from "@/components/molecules/TableComponent";
import AppLayout from "@/components/layout/AppLayout";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <AppLayout>
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
          <Stack direction="row" spacing={4} align="center" justifyContent={"right"}>
            <Button mb={2} colorScheme="blue" size={"sm"} onClick={onOpen}>
              Tambah Data Baru
            </Button>
            <Button mb={2} colorScheme="blue" size={"sm"}>
              Import Excel Hasil Scan
            </Button>
          </Stack>
        </CardHeader>
        <Divider color={"gray.300"} />
        <CardBody>
          <Stack direction="row" spacing={4} align="center">
            <Button colorScheme="teal" variant="outline" size={"sm"} minWidth={"150px"}>
              Scan dari Depo (20)
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Form</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
              <FormHelperText>We will never share your email.</FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="solid" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={onClose}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </AppLayout>
  );
}
