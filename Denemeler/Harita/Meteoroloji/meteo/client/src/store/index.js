import {createStore} from "vuex";
import users from "./modules/users";
import rules from "./modules/rules";
import general from "./modules/general";


const store = createStore({
  modules: {
    users,
    rules,
    general
  }
});

export default store;