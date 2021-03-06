import Vue from "vue";
import Vuex, { GetterTree, MutationTree } from "vuex";
import createPersistedState from "vuex-persistedstate";
import {
  LogIn_login as LogInResponse,
  LogIn_login_claims as JWTClaims,
} from "@/graphql/types/LogIn";

Vue.use(Vuex);

export class State {
  token = "";
  claims: JWTClaims = {} as JWTClaims;
  socketId = "";
  darkMode = true;
}

const getters = <GetterTree<State, any>>{
  haveSocket(state) {
    return state.socketId.length > 0;
  },

  isLoggedIn(state) {
    return state.token.length > 0;
  },

  hasRole(state) {
    return function (roleName: string) {
      return state.claims.roles.some((role) => role.name === roleName);
    };
  },
};

const mutations = <MutationTree<State>>{
  logIn(state, response: LogInResponse) {
    state.token = response.token;
    state.claims = response.claims;
  },

  logOut(state) {
    state.token = "";
    state.claims = {} as JWTClaims;
  },

  socketConnected(state, socketId) {
    state.socketId = socketId;
  },

  socketDisconnected(state) {
    state.socketId = "";
  },

  setDarkMode(state, newValue: boolean) {
    state.darkMode = newValue;
  },
};

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: new State(),
  getters,
  mutations,
});

// https://stackoverflow.com/questions/53807294/how-is-the-correct-way-to-work-with-vuex-and-typescript
