import {createStore} from "vuex";
import auth from "./modules/auth";
import map from "./modules/map";
import users from "./modules/users";
import rules from "./modules/rules";
import warnings from "./modules/warnings";
import general from "./modules/general";


const store = createStore({
  modules: {
    auth,
    map,
    users,
    rules,
    warnings,
    general
  }
});

export default store;