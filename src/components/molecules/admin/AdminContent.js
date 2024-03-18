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
  Divider,
  ButtonGroup,
  IconButton,
  Flex
} from "@chakra-ui/react";
// import { useRouter } from "next/router";
import { HOST } from "@/common/config/constant";
import TableComponent from "@/components/molecules/TableComponent";
import { AiFillEdit } from "react-icons/ai";
import { BsBoxArrowUpRight, BsFillTrashFill } from "react-icons/bs";

const AdminContent = ({ users }) => {
  // const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log('users content >>> ', users.length);

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

  const columns = [
    {
      id: "name",
      label: "Name",
      selector: (row) => row.name,
    },
    {
      id: "email",
      label: "Email",
      selector: (row) => row.email,
    },
    {
      id: "phone",
      label: "Telp",
      selector: (row) => row.phone,
    },
    {
      id: "action",
      label: "Action",
      selector: (row) => (
        <ButtonGroup variant="solid" size="sm" spacing={3} id={`action-${row.id}`}>
          <IconButton
            colorScheme="blue"
            icon={<BsBoxArrowUpRight />}
            aria-label="Up"
          />
          <IconButton
            colorScheme="green"
            icon={<AiFillEdit />}
            aria-label="Edit"
          />
          <IconButton
            colorScheme="red"
            variant="outline"
            icon={<BsFillTrashFill />}
            aria-label="Delete"
          />
        </ButtonGroup>
      ),
    }
  ]

  return (
    <Flex h="100vh" flexDirection="column">
      <Card>
        <CardHeader display="flex" justifyContent="space-between" alignContent="center">
          <Box>
            <Text variant={"h1"} fontWeight={"bold"}>Admin</Text>
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
          <TableComponent data={users} columns={columns} />
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
    </Flex>
  )
}

export default AdminContent;