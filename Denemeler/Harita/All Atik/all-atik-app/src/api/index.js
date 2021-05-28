import {api} from "boot/axios";

const containers = `/containers`;
const container = `/container`;
const neighborhoods = `/neighborhoods`;
const streets = `/streets`;
const zones = `/zones`;
const zone = `/zone`;
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
export const apiGetFilteredContainers = (filter) => {
  return api.get(`${containers}?${filter}`);
}

// Get neighborhoods
export const apiGetNeighborhoods = () => {
  return api.get(neighborhoods);
}

// Get streets => payload = neighborhoodID
export const apiGetStreets = (neighborhoodID) => {
  return api.get(`${streets}?neighborhoodID=${neighborhoodID}`);
}

// Get zones
export const apiGetZones = () => {
  return api.get(zones);
}

// Get filtered zones
export const apiGetFilteredZones = (filter) => {
  return api.get(`${zones}?ID=${filter}`);
}

// Get zone
export const apiGetZone = (zoneID) => {
  return api.get(`${zone}/${zoneID}`)
}

// Get zone
export const apiPatchZone = (zoneID, geometry) => {
  return api.patch(
    `${zones}/${zoneID}`,
    {
      geometry: geometry,
    }
  );
}

// Get container types
export const apiGetContainerTypes = () => {
  return api.get(containertypes);
}

// Get last 1 week collections => payload = id
export const apiGetLastCollections = (containerID) => {
  return api.get(`${lastCollections}/${containerID}`);
}

// Get last 5 coordinates => payload = id
export const apiGetDataStream = (containerID) => {
  return api.get(`${deviceDataStream}/${containerID}`);
}
