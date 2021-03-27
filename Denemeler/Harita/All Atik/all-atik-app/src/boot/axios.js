import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios;

const localBaseURL = "http://localhost:3000";
const uniBaseURL = "https://unit.uni-yaz.com:8383/unit-ui/rest/binary";
const uniBaseURL2 = "https://unit.uni-yaz.com:1883/unit-allatik/rest/binary";

const api = axios.create({baseURL: uniBaseURL});
Vue.prototype.$api = api;

export {axios, api}
