import useSWR from "swr";
import {get, post, patch} from "../services/http-client";


export const useGetUserTowers = () => {
    const {data, error} = useSWR("tower/get-user-towers", get);
    return {data, error};
};

export const useGetUser = () => {
    const {data, error} = useSWR("user", get);
    return {user: data, error};
};

export const useGetTower = (policyId) => {
    if (!policyId){
        return {};
    }
    const {data, error} = useSWR(`tower/${policyId}`, get);
    console.log(data);
    return {tower: data, error};
};

export const useGetCarriers = () => {
    const {data, error} = useSWR(`carrier/get-all`, get);
    console.log(data);
    return {carriers: data, error};
};

// todo: if this is not a hook this should not be here
export const addCarrierToLayer = (towerId, data) => {
    //const {mutate} = useSWRConfig();

    //todo: do I need here the whole tower ?
    ///const options = { optimisticData: user, rollbackOnError: true }

    // updates the local data immediately
    // send a request to update the data
    // triggers a revalidation (refetch) to make sure our local data is correct
    return post(`tower/${towerId}/update-layer`, data);
}


export const removeCarrierFromLayer = (policyId, data) => {
    //const {mutate} = useSWRConfig();

    //todo: do I need here the whole tower ?
    ///const options = { optimisticData: user, rollbackOnError: true }

    // updates the local data immediately
    // send a request to update the data
    // triggers a revalidation (refetch) to make sure our local data is correct
    return post(`tower/${policyId}`, data);
}
