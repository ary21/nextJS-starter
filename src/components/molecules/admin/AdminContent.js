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
// import { useRouter } from "next/router";
import { HOST } from "@/common/config/constant";
import TableComponent from "@/components/molecules/TableComponent";

const AdminContent = ({ users }) => {
  // const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log('users content :> ', users);

  const onDelete = async (id) => {
    // await fetch(`${HOST}/api/users/${id}`, { method: API_METHOD.DELETE });
    // alert(`Succes delete : ${id}`);
    // router.push("/users");
  };

  const onEdit = async (id) => {
    // get data
    // modal
  }

  const submit = async () => {
    // post
    // put
  }

  return (
    <>
      <Card>
        <CardHeader display="flex" justifyContent="space-between" alignContent="center">
          <Box>
            <Text variant={"h1"} fontWeight={"bold"}>User Admin</Text>
            <Text variant={"h2"}>Menampilkan semua user admin</Text>
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
    </>
  )
}

export default AdminContent;