import {api} from "boot/axios";

let containers;
let neighborhoods;
let zones;
let containerTypes;

if (api.defaults.baseURL === "http://localhost:3000") {
  containers = `/containers`;
  neighborhoods = `/neighborhoods`;
  // street özel bir durum bunun için `/streets`
  zones = `/zones`;
  containerTypes = `/containerTypes`;
} else {
  containers = `/atik-map-containers`;
  neighborhoods = `/atik-map-neighborhoods`;
  // street özel bir durum `${neighborhoods}/${payload}/street`
  zones = `/atik-map-zones`;
  containerTypes = `/atik-map-containertypes`
}

// Sorunsuz
export const apiGetContainers = () => {
  return api.get(containers);
}

// Sorunsuz
export const apiPatchContainer = (payload) => {
  return api.patch(
    `${containers}/${payload.containerID}`,
    {
      latitude: payload.latitude,
      longitude: payload.longitude
    }
  );
}

// Sorunsuz
export const apiGetFilteredContainers = (payload) => {
  return api.get(`${containers}?${payload}`);
}

// Sorunsuz
export const apiGetNeighborhoods = () => {
  return api.get(neighborhoods);
}

// Sorunsuz (lokalde patlıyor)
export const apiGetStreets = (payload) => {
  return api.get(`${neighborhoods}/${payload}/streets`);
}

// Sorunsuz
export const apiGetZones = () => {
  return api.get(zones);
}

// Sorunsuz
export const apiGetContainerTypes = () => {
  return api.get(containerTypes);
}
