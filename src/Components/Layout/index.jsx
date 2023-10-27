import { Card, CardBody, Center } from "@chakra-ui/react";
import { node } from "prop-types";

const Layout = ({ children }) => {
  return (
    <Center height={"100vh"} backgroundColor={"blue.100"}>
      <Card height={400} backgroundColor={"blue.500"} width={300}>
        <CardBody>{children}</CardBody>
      </Card>
    </Center>
  );
};

Layout.propTypes = {
  children: node.isRequired,
};

export default Layout;
