import {
  Box,
  Card,
  CardHeader,
  Text,
  Button,
  CardBody,
  Divider
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

export default function Setting() {
  return (
    <Box>
      <Card>
        <CardHeader
          display="flex"
          justifyContent="space-between"
          alignContent="center"
        >
          <Box>
            <Text variant={"h1"} fontWeight={"bold"}>
              Pengaturan
            </Text>
            <Text variant={"h2"}>Pengaturan umum sistem aplikasi cargo</Text>
          </Box>
          <Box>
            {/* <Button mb={2} colorScheme="blue" size={"sm"}>
              Tambah Data Baru
            </Button> */}
          </Box>
        </CardHeader>
        <Divider color={"gray.300"} />
        <CardBody>
          <Tabs>
            <TabList>
              <Tab>Armada</Tab>
              <Tab>Driver</Tab>
              <Tab>Admin</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <p>one!</p>
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
              <TabPanel>
                <p>3</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </Box>
  );
}
