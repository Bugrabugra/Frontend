import {createStore} from "vuex";
import users from "./modules/users";
import general from "./modules/general";


const store = createStore({
  modules: {
    users,
    general
  }
});

export default store;