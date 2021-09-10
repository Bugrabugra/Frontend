import {createStore} from 'vuex'
import axios from "axios";


// Create a new store instance.
const store = createStore({
  state: {
    fields: [
      {id: 0, value: "countFloor", name: "Floor Count"},
      {id: 1, value: "countRoom", name: "Room Count"},
      {id: 2, value: "estateType", name: "Estate Type"},
      {id: 3, value: "dateBuilding", name: "Building Date"},
      {id: 4, value: "numberFloor", name: "Floor Number"},
      {id: 5, value: "tags", name: "Tags"},
    ],
    tags: [
      {value: "closeToSea", name: "Close to Sea"},
      {value: "gotElevator", name: "Got Elevator"},
      {value: "painted", name: "Painted"},
      {value: "hasGarage", name: "Has Garage"}
    ],
    filter: null,
    filters: [],
    fieldsToShow: [],
    ads: [],
    response: null
  },
  mutations: {
    addNewFilter(state) {
      state.filters.push(
        {
          selectedField: null,
          selectedCondition: null,
          selectedValue: null
        }
      );
    },
    removeFilter(state, index) {
      state.filters.splice(index, 1);
    },
    updateFilter(state, payload) {
      state.filters[payload.indexFilter] = payload.filter;
    },
    setAds(state, ads) {
      state.ads = ads;
    },
    setFieldsToShow(state, fieldsToShow) {
      state.fieldsToShow = fieldsToShow;
    },
    setResponse(state, data) {
      state.response = data;
    }
  },
  actions: {
    async filterQueries({state, commit}, payload) {
      const filterList = []
      state.filters.forEach(filter => {
        filterList.push(`${filter.selectedField}${filter.selectedCondition}${filter.selectedValue}`)
      });
      const filter = filterList.join("&");
      console.log(filter);

      const fields = state.fieldsToShow.join(",");
      console.log(fields);

      const response = await axios.get(`http://localhost:3001/ads?${filter}&fields=${fields}`);
      const data = await response.data;
      commit("setResponse", data);
      console.log(data);
    }
  }
});

export default store;