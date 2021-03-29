import Vue from 'vue'
import axios from 'axios'


const localBaseURL = "http://localhost:3000";
const uniBaseURL = "https://unit.uni-yaz.com:8383/unit-ui/rest/binary";
const uniBaseURL2 = "https://unit.uni-yaz.com:1883/unit-allatik/rest/binary";
const mainBaseURL = "https://unit.uni-yaz.com:1883/unit-allatik/api/v1"

let baseURL = "";

String(document.location.search).slice(2).split("&").forEach(parameter => {
  const [key, value] = parameter.split("=")
  if (key === "baseURL") {
    console.log(value)
    baseURL = value
  }
})

Vue.prototype.$axios = axios;
const api = axios.create({baseURL: baseURL});
Vue.prototype.$api = api;

export {axios, api}
