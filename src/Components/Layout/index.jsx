import { Card, CardBody, CardHeader, Center, Text } from "@chakra-ui/react";
import { bool, node } from "prop-types";

const Layout = ({ children, showHeader }) => {
  return (
    <Center height={"100vh"} backgroundColor={"blue.100"}>
      <Card overflow={"hidden"}>
        {showHeader && (
          <CardHeader
            backgroundColor={"black"}
            color={"white"}
            fontSize={28}
            fontWeight={"extrabold"}
          >
            <Text>Pager</Text>
          </CardHeader>
        )}
        <CardBody>{children}</CardBody>
      </Card>
    </Center>
  );
};

Layout.defaultProps = {
  showHeader: false,
};

Layout.propTypes = {
  showHeader: bool,
  children: node.isRequired,
};

export default Layout;
