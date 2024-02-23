"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Button,
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
  useDisclosure,
  Box,
  Divider
} from "@chakra-ui/react";
import TableComponent from "@/components/molecules/TableComponent";

export default function Customer() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Card>
        <CardHeader display="flex" justifyContent="space-between" alignContent="center">
          <Box>
            <Text variant={"h1"} fontWeight={"bold"}>Penerima</Text>
            <Text variant={"h2"}>Penerima setiap resi pengiriman</Text>
          </Box>
          <Box>
            <Button mb={2} colorScheme="blue" size={"sm"} onClick={onOpen}>
              Tambah Data Baru
            </Button>
          </Box>
        </CardHeader>
        <Divider color={"gray.300"} />
        <CardBody>
          <TableComponent />
        </CardBody>
        <CardFooter></CardFooter>
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
    </Box>
  );
}
