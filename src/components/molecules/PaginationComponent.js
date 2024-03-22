import React from "react";
import { Flex, Text } from "@chakra-ui/react";
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
        showTotal={(total) => <Text fontWeight={"bold"} color={"gray.500"} textAlign={"left"}>Total: {total} items</Text>}
        pageSize={5}
        defaultPage={1}
        defaultCurrent={5}
        onChange={(page) => setCurrentPage(page - 1)}
        paginationProps={{ display: "flex" }}
      />
    </Flex>
  );
};
