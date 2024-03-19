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
  Flex,
} from "@chakra-ui/react";
// import { useRouter } from "next/router";
import useSWR from "swr";
import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import TableComponent from "@/components/molecules/TableComponent";
import { useForm } from "@/hooks/useForm";
import { UserMutation } from "@/mutation/userMutation";

// const fetcher = (url) =>
//   fetch(url, {
//     next: { revalidate: 0 },
//     cache: "no-store",
//   }).then((res) => res.json());

const dummyUser = {
  name: "",
  email: "",
  phone: "",
};

const AdminContent = () => {
  // const router = useRouter();
  // const { data, error, isLoading } = useSWR("/api/users", fetcher);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentUser, setCurrentUser] = useState(dummyUser);
  const { data, error, isLoading, createUser, updateUser, removeUser } =
    UserMutation(setCurrentUser);

  const onDelete = async (user) => {
    // await fetch(`${HOST}/api/users/${user.id}`, { method: API_METHOD.DELETE });
    // alert(`Succes delete : ${id}`);
    // router.push("/users");
    // removeUser(user);
  };

  const onEdit = async (user) => {
    // get data
    setCurrentUser(user);
    onOpen()
  };

  const submit = async () => {
    if (currentUser.id) {
      updateUser()
    } else {
      createUser()
    }
    setCurrentUser(undefined);
  };

  const { formState, handleChange, handleSubmit } = useForm(
    currentUser,
    submit
  );

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
        <ButtonGroup
          variant="solid"
          size="sm"
          spacing={3}
          id={`action-${row.id}`}
        >
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
    },
  ];

  return (
    <Flex flexDirection="column">
      <Card h="full">
        <CardHeader
          display="flex"
          justifyContent="space-between"
          alignContent="center"
        >
          <Box>
            <Text variant={"h1"} fontWeight={"bold"}>
              Admin
            </Text>
            <Text variant={"h2"}>Menampilkan daftar semua user admin</Text>
          </Box>
          <Box>
            <Button mb={2} colorScheme="blue" size={"sm"} onClick={onOpen}>
              Tambah Data Baru
            </Button>
          </Box>
        </CardHeader>
        <Divider color={"gray.300"} />
        <CardBody>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            <TableComponent data={data.data} columns={columns} />
          )}
        </CardBody>
        <CardFooter></CardFooter>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit}>
          <ModalContent>
            <ModalHeader>Form Admin</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <Flex gap={4} direction="column">
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Phone</FormLabel>
                  <Input
                    type="text"
                    name="phone"
                    required
                    value={formState.phone}
                    onChange={handleChange}
                  />
                </FormControl>
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button variant="solid" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme="blue" type="submit">
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Flex>
  );
};

export default AdminContent;
