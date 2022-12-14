import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

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
  const { data, error } = useSWR(
    () => (policyId ? `tower/${policyId}` : null),
    get
  );
  return { tower: data, error };
};

export const useGetCarriers = () => {
  const { data, error } = useSWRImmutable(`carrier/get-all`, get);
  return { carriers: data, error };
};
