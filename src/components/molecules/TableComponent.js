import React from "react";
import {
  ButtonGroup,
  Flex,
  IconButton,
  Image,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import PaginationComponent from "./PaginationComponent";

export default function TableComponent({ data, columns }) {
  return (
    <Flex
      w="full"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      {!!data.length ? (
        <Table
          w="full"
          bg="white"
          display={{
            base: "block",
            md: "table",
          }}
          sx={{
            "@media print": {
              display: "table",
            },
          }}
        >
          <Thead
            display={{
              base: "none",
              md: "table-header-group",
            }}
            sx={{
              "@media print": {
                display: "table-header-group",
              },
            }}
          >
            <Tr>
              {columns.map((col) => (
                <Th key={col.id}>{col.label}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody
            display={{
              base: "block",
              lg: "table-row-group",
            }}
            sx={{
              "@media print": {
                display: "table-row-group",
              },
            }}
          >
            {data.map((token, tid) => {
              return (
                <Tr
                  key={tid}
                  display={{
                    base: "grid",
                    md: "table-row",
                  }}
                  sx={{
                    "@media print": {
                      display: "table-row",
                    },
                    gridTemplateColumns: "minmax(0px, 35%) minmax(0px, 65%)",
                    gridGap: "10px",
                  }}
                >
                  {columns.map((x) => {
                    return (
                      <React.Fragment key={`${tid}${x.id}`}>
                        <Td
                          display={{
                            base: "table-cell",
                            md: "none",
                          }}
                          sx={{
                            "@media print": {
                              display: "none",
                            },
                            textTransform: "uppercase",
                            fontSize: "md",
                            fontWeight: "bold",
                            letterSpacing: "wider",
                            fontFamily: "heading",
                          }}
                        >
                          {x.label}
                        </Td>
                        <Td
                          fontSize="sm"
                          sx={{
                            letterSpacing: "wider",
                            fontFamily: "heading",
                          }}
                        >
                          {x.selector(token)}
                        </Td>
                      </React.Fragment>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      ) : (
        <Flex w="full" flexDirection="column" alignItems="center">
          <Image src="/Box.svg" alt="Empty Box" height={150} />
          <Text color="black.500" fontWeight="bold">Data Tidak Ditemukan</Text>
          <Text color="black.500">Silahkan coba ubah pencarian atau tambahkan data baru</Text>
        </Flex>
      )}
      {!!data.length && <PaginationComponent total={data.length} />}
    </Flex>
  );
}
