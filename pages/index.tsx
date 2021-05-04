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

const Home = ({ states }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [state, setState] = useState<number>();
  const [district, setDistrict] = useState<number>();
  const { data, error } = useSWR(`${DISTRICT_META_URL}/${state}`);
  const [age, setAge] = useState<number>();
  return (
    <div>
      <Box mt={"20"}>
        <Flex px="72">
          <Select
            placeholder="Select a state"
            onChange={(e) => setState(parseInt(e.target.value))}
          >
            {states.map((state) => (
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

export async function getStaticProps() {
  const res = await fetch(STATES_META_URL);
  const data = await res.json();
  const states: State[] = data.states;
  return {
    props: { states },
  };
}

export default Home;
