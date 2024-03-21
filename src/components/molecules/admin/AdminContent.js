/* eslint-disable react-hooks/exhaustive-deps */
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
  Box,
  Divider,
  ButtonGroup,
  IconButton,
  Flex,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
// import { useRouter } from "next/router";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import TableComponent from "@/components/molecules/TableComponent";
import { useForm } from "@/hooks/useForm";
import { UserMutation } from "@/mutation/UserMutation";

const dummyUser = {
  name: "",
  email: "",
  phone: "",
};

const AdminContent = () => {
  // const router = useRouter();
  // const { data, error, isLoading } = useSWR("/api/users", fetcher);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentUser, setCurrentUser] = useState(dummyUser);
  const { data, error, isLoading, createUser, updateUser, removeUser } =
    UserMutation(setCurrentUser);

  const submit = async () => {
    try {
      if (currentUser && currentUser.id) {
        await updateUser(formState);
      } else {
        await createUser(formState);
      }
      toast({
        position: "bottom-left",
        title: `Submit ${currentUser ? 'update' : 'create'}`,
        description: "Looks great",
        status: "success",
        isClosable: true
      });
      onClose();
      setCurrentUser(undefined);
      handleReset(dummyUser);
    } catch (error) {
      console.log('error', error)
      toast({
        position: "bottom-left",
        title: "Failed to submit",
        description: error.message || "Something wrong",
        status: "error",
        isClosable: true
      });
      return;
    }
  };

  const { formState, handleChange, handleReset, handleSubmit } = useForm(
    currentUser,
    submit
  );

  const onAdd = () => {
    setCurrentUser(undefined);
    handleReset(dummyUser);
    onOpen();
  };

  const onEdit = async (user) => {
    setCurrentUser(user);
    handleReset(user);
    onOpen();
  };

  const onDelete = async (user) => {
    try {
      await removeUser(user);
      toast({
        position: "bottom-left",
        title: "Delete success",
        description: "Looks great",
        status: "success",
        isClosable: true
      });
    } catch (error) {
      console.log('error', error)
      toast({
        position: "bottom-left",
        title: "Failed to submit",
        description: error.message || "Something wrong",
        status: "error",
        isClosable: true
      });
      return;
    }
  };

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
            onClick={() => onEdit(row)}
          />
          <IconButton
            colorScheme="red"
            variant="outline"
            icon={<BsFillTrashFill />}
            aria-label="Delete"
            onClick={() => onDelete(row)}
          />
        </ButtonGroup>
      ),
    },
  ];

  useEffect(() => {
    if (!error) return;
    console.log('error', error);
    toast({
      position: "bottom-left",
      title: "Failed fetch data",
      description: error.message || "Something wrong",
      status: "error",
      isClosable: true
    })
  }, [error])

  console.log('currentUser', currentUser)

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
            <Button mb={2} colorScheme="blue" size={"sm"} onClick={onAdd}>
              Tambah Data Baru
            </Button>
          </Box>
        </CardHeader>
        <Divider color={"gray.300"} />
        <CardBody>
          {isLoading ? (
            <Flex gap={2}>
              <Spinner />
              <Text>Loading...</Text>
            </Flex>
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
                {!currentUser && (
                  <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      name="password"
                      id="inputPassword"
                      required={!currentUser}
                      value={formState.password}
                      onChange={handleChange}
                    />
                  </FormControl>
                )}
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
