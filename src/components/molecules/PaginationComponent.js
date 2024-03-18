import React from "react";
import { Flex } from "@chakra-ui/react";
import Pagination from "@choc-ui/paginator";

export default function PaginationComponent(){
  return (
    <Flex
      w="full"
      bg="white"
      alignItems="center"
      justifyContent="right"
      mt={5}
    >
      <Pagination
        defaultCurrent={1}
        total={50}
        paginationProps={{ display: "flex" }}
      />
    </Flex>
  );
};
