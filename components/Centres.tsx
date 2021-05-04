import axios from "axios";
import useSWR from "swr";
import { District } from "../types";
import CentresTable from "./CentresTable";
const Centres: React.FC<{ district: number; age: number }> = (props) => {
  const { data, error } = useSWR(
    [
      "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict",
      props.district,
    ],
    async (url, district_id) => {
      const data = await axios.get(url, {
        params: { district_id, date: "04-05-2021" },
      });
      return data.data;
    }
  );
  console.log("Data", data);
  return <CentresTable age={props.age} centers={data?.centers}></CentresTable>;
};

export default Centres;
