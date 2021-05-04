import { Table, Tbody, Td, Thead, Tr } from "@chakra-ui/table";
import { Center } from "../types";
type propsType = {
  centers: Center[];
};

const CentresTable: React.FC<propsType> = (props) => {
  return (
    <Table>
      <Thead>
        <Tr></Tr>
      </Thead>
      <Tbody>
        {props?.centers?.map((center) => (
          <Tr>
            <Td>{center.name}</Td>
            <Td>{center.block_name}</Td>
            <Td>{JSON.stringify(center.sessions)}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default CentresTable;
