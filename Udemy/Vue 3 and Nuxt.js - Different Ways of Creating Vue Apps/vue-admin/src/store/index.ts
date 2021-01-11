import { createStore } from 'vuex'
import UserModule from "@/store/UserModule";

export default createStore({
  modules: {
    User: UserModule
  }
})
