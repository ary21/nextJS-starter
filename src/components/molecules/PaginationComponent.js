import React from "react";
import { Flex } from "@chakra-ui/react";
import Pagination from "@choc-ui/paginator";

export default function PaginationComponent({ total, currentPage, setCurrentPage }){
  return (
    <Flex
      w="full"
      bg="white"
      alignItems="center"
      justifyContent="right"
      mt={5}
    >
      <Pagination
        total={total}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        defaultCurrent={5}
        pageSize={5}
        paginationProps={{ display: "flex" }}
      />
    </Flex>
  );
};
