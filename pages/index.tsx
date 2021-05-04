import { Box, Container, Flex, Spacer } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import useSWR from "swr";
import Centres from "../components/Centres";
import { DISTRICT_META_URL, STATES_META_URL } from "../constants";
import styles from "../styles/Home.module.css";
import { District, State } from "../types";

const Home = ({ states }: InferGetStaticPropsType<typeof getInitialProps>) => {
  const [state, setState] = useState<number>();
  const [district, setDistrict] = useState<number>();
  const { data, error } = useSWR(`${DISTRICT_META_URL}/${state}`);
  const [age, setAge] = useState<number>(18);
  return (
    <div>
      <Box mt={"20"}>
        <Flex px="72">
          <Select
            placeholder="Select a state"
            onChange={(e) => setState(parseInt(e.target.value))}
          >
            {states?.map((state) => (
              <option value={state.state_id}>{state.state_name}</option>
            ))}
          </Select>
          <Spacer />
          <Select
            placeholder="Select a District"
            onChange={(e) => setDistrict(parseInt(e.target.value))}
          >
            {data?.districts.map((district: District) => {
              return (
                <option value={district.district_id}>
                  {district.district_name}
                </option>
              );
            })}
          </Select>
          <Spacer />
          <Select
            placeholder="Age bracket"
            onChange={(e) => setAge(parseInt(e.target.value))}
          >
            <option value={45}> {"45 or above"} </option>
            <option value={18}>{"18 to 45"}</option>
          </Select>
        </Flex>
      </Box>
      <Box h={"20"} />
      <Centres age={age} district={district}></Centres>
    </div>
  );
};

export async function getInitialProps() {
  const states: State[] = [
    { state_id: 1, state_name: "Andaman and Nicobar Islands" },
    { state_id: 2, state_name: "Andhra Pradesh" },
    { state_id: 3, state_name: "Arunachal Pradesh" },
    { state_id: 4, state_name: "Assam" },
    { state_id: 5, state_name: "Bihar" },
    { state_id: 6, state_name: "Chandigarh" },
    { state_id: 7, state_name: "Chhattisgarh" },
    { state_id: 8, state_name: "Dadra and Nagar Haveli" },
    { state_id: 37, state_name: "Daman and Diu" },
    { state_id: 9, state_name: "Delhi" },
    { state_id: 10, state_name: "Goa" },
    { state_id: 11, state_name: "Gujarat" },
    { state_id: 12, state_name: "Haryana" },
    { state_id: 13, state_name: "Himachal Pradesh" },
    { state_id: 14, state_name: "Jammu and Kashmir" },
    { state_id: 15, state_name: "Jharkhand" },
    { state_id: 16, state_name: "Karnataka" },
    { state_id: 17, state_name: "Kerala" },
    { state_id: 18, state_name: "Ladakh" },
    { state_id: 19, state_name: "Lakshadweep" },
    { state_id: 20, state_name: "Madhya Pradesh" },
    { state_id: 21, state_name: "Maharashtra" },
    { state_id: 22, state_name: "Manipur" },
    { state_id: 23, state_name: "Meghalaya" },
    { state_id: 24, state_name: "Mizoram" },
    { state_id: 25, state_name: "Nagaland" },
    { state_id: 26, state_name: "Odisha" },
    { state_id: 27, state_name: "Puducherry" },
    { state_id: 28, state_name: "Punjab" },
    { state_id: 29, state_name: "Rajasthan" },
    { state_id: 30, state_name: "Sikkim" },
    { state_id: 31, state_name: "Tamil Nadu" },
    { state_id: 32, state_name: "Telangana" },
    { state_id: 33, state_name: "Tripura" },
    { state_id: 34, state_name: "Uttar Pradesh" },
    { state_id: 35, state_name: "Uttarakhand" },
    { state_id: 36, state_name: "West Bengal" },
  ];
  return {
    props: { states },
  };
}

export default Home;
