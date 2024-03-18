import React from "react";
import { Flex } from "@chakra-ui/react";
import Pagination from "@choc-ui/paginator";

export default function PaginationComponent({ total }){
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
        total={total}
        paginationProps={{ display: "flex" }}
      />
    </Flex>
  );
};
