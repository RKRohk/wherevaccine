import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Center, Session } from "../types";
type propsType = {
  centers: Center[];
  age: number;
};

const CentresTable: React.FC<propsType> = (props) => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>{"Center Name"}</Th>
          <Th>{"Block"}</Th>
          <Th>{"Date"}</Th>
          <Th>{"Available Doses"}</Th>
        </Tr>
      </Thead>
      <Tbody>
        {props?.centers
          ?.filter((center) =>
            center.sessions.some(
              (session) => session.min_age_limit == props.age
            )
          )
          ?.map((center) => {
            const session: Session | undefined = center?.sessions
              ?.filter((session) => session.min_age_limit == props.age)
              .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))[0];
            return (
              <Tr>
                <Td>{center.name}</Td>
                <Td>{center.block_name}</Td>
                <Td>{session.date}</Td>
                <Td>{session.available_capacity}</Td>
              </Tr>
            );
          })}
      </Tbody>
    </Table>
  );
};

export default CentresTable;
