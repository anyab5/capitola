import { post } from "./http-client";

export const updateCarrierForLayer = (towerId, data) => {
  return post(`tower/${towerId}/update-layer`, data);
};
