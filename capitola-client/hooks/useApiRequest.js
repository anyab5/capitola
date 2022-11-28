import useSWR from "swr";
import { get } from "../services/http-client";

export const useGetUserTowers = () => {
  const { data, error } = useSWR("tower/get-user-towers", get);
  return { towers: data, error };
};

export const useGetUser = () => {
  const { data, error } = useSWR("user", get);
  return { user: data, error };
};

export const useGetTower = (policyId) => {
  const { data, error } = useSWR(`tower/${policyId}`, get);
  return { tower: data, error };
};

export const useGetCarriers = () => {
  const { data, error } = useSWR(`carrier/get-all`, get);
  return { carriers: data, error };
};
