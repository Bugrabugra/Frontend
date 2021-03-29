import {api} from "boot/axios";

const containers = `/containers`;
const neighborhoods = `/neighborhoods`;
const streets = `/streets`
const zones = `/zones`;
const containertypes = `/containertypes`;

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

// Sorunsuz
export const apiGetStreets = (payload) => {
  return api.get(`${streets}?neighborhoodID=${payload}`);
}

// Sorunsuz
export const apiGetZones = () => {
  return api.get(zones);
}

// Sorunsuz
export const apiGetContainerTypes = () => {
  return api.get(containertypes);
}
