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
  const [district, setDisctrict] = useState<number>();

  const { data, error } = useSWR(`${DISTRICT_META_URL}/${district}`);
  return (
    <div>
      <Select
        placeholder="Select a state"
        onChange={(e) => setDisctrict(parseInt(e.target.value))}
      >
        {states.map((state) => (
          <option value={state.state_id}>{state.state_name}</option>
        ))}
      </Select>
      <Select
        placeholder="Select a District"
        onChange={(e) => console.log(e.target.value)}
      >
        {data?.districts.map((district: District) => {
          return (
            <option value={district.district_id}>
              {district.district_name}
            </option>
          );
        })}
      </Select>
      <Centres district={district}></Centres>
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
