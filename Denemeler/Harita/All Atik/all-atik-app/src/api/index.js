import {api} from "boot/axios";

const containers = `/containers`;
const container = `/container`;
const neighborhoods = `/neighborhoods`;
const streets = `/streets`;
const zones = `/zones`;
const containertypes = `/containertypes`;
const lastCollections = `/last-collections`;
const deviceDataStream = `/device-data-stream`


// Get all containers
export const apiGetContainers = () => {
  return api.get(containers);
}

// Get specific container => payload = container
export const apiGetContainer = (payload) => {
  return api.get(`${container}/${payload.containerID}`);
}

// Patch container lat lng => payload = clickedContainer
export const apiPatchContainer = (payload) => {
  return api.patch(
    `${containers}/${payload.containerID}`,
    {
      latitude: payload.latitude,
      longitude: payload.longitude
    }
  );
}

// Get filtered containers => payload = {filters}
export const apiGetFilteredContainers = (payload) => {
  return api.get(`${containers}?${payload}`);
}

// Get neighborhoods
export const apiGetNeighborhoods = () => {
  return api.get(neighborhoods);
}

// Get streets => payload = neighborhoodID
export const apiGetStreets = (payload) => {
  return api.get(`${streets}?neighborhoodID=${payload}`);
}

// Get zones
export const apiGetZones = () => {
  return api.get(zones);
}

// Get container types
export const apiGetContainerTypes = () => {
  return api.get(containertypes);
}

// Get last 1 week collections => payload = id
export const apiGetLastCollections = (payload) => {
  return api.get(`${lastCollections}/${payload}`);
}

// Get last 5 coordinates => payload = id
export const apiGetLastFiveCoordinates = (payload) => {
  return api.get(`${deviceDataStream}/${payload}`);
}
