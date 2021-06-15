import {api} from "boot/axios";


const institution = `/institution`;
const containers = `/containers`;
const container = `/container`;
const neighborhoods = `/neighborhoods`;
const streets = `/streets`;
const zones = `/zones`;
const zone = `/zone`;
const containertypes = `/containertypes`;
const lastCollections = `/last-collections`;
const deviceDataStream = `/device-data-stream`;

const config = (token) => {
  return {headers: {Authorization: `Bearer ${token}`}}
}

// Get institution
export const apiGetInstitution = (token) => {
  console.log(token);
  return api.get(institution, config(token));
}

// Get all containers
export const apiGetContainers = (token) => {
  return api.get(containers, config(token));
}

// Get specific container => payload = container
export const apiGetContainer = (payload, token) => {
  return api.get(`${container}/${payload.containerID}`, config(token));
}

// Patch container lat lng => payload = clickedContainer
export const apiPatchContainer = (payload, token) => {
  return api.patch(
    `${containers}/${payload.containerID}`,
    {
      latitude: payload.latitude,
      longitude: payload.longitude
    },
    config(token)
  );
}

// Get filtered containers => payload = {filters}
export const apiGetFilteredContainers = (filter, token) => {
  return api.get(`${containers}?${filter}`, config(token));
}

// Get neighborhoods
export const apiGetNeighborhoods = (token) => {
  return api.get(neighborhoods, config(token));
}

// Get streets => payload = neighborhoodID
export const apiGetStreets = (neighborhoodID, token) => {
  return api.get(`${streets}?neighborhoodID=${neighborhoodID}`, config(token));
}

// Get zones
export const apiGetZones = (token) => {
  return api.get(zones, config(token));
}

// Get filtered zones
export const apiGetFilteredZones = (filter, token) => {
  return api.get(`${zones}?ID=${filter}`, config(token));
}

// Get zone
export const apiGetZone = (zoneID, token) => {
  return api.get(`${zone}/${zoneID}`, config(token))
}

// Get zone
export const apiPatchZone = (zoneID, geometry, token) => {
  return api.patch(
    `${zones}/${zoneID}`,
    {
      geometry: geometry,
    },
    config(token)
  );
}

// Get container types
export const apiGetContainerTypes = (token) => {
  return api.get(containertypes, config(token));
}

// Get last 1 week collections => payload = id
export const apiGetLastCollections = (containerID, token) => {
  return api.get(`${lastCollections}/${containerID}`, config(token));
}

// Get last 5 coordinates => payload = id
export const apiGetDataStream = (containerID, token) => {
  return api.get(`${deviceDataStream}/${containerID}`, config(token));
}
