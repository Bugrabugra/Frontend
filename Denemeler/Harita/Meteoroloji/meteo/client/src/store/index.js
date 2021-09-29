import {createStore} from "vuex";
import auth from "./modules/auth";
import users from "./modules/users";
import rules from "./modules/rules";
import general from "./modules/general";


const store = createStore({
  modules: {
    auth,
    users,
    rules,
    general
  }
});

export default store;