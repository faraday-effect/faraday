import Vue from "vue";
import VueRouter, { RouteRecord } from "vue-router";
import vuexStore from "@/store";

import get from "lodash/get";

import LogIn from "@/pages/LogIn.vue";
import SignUp from "@/pages/SignUp.vue";
import NotFound from "@/pages/NotFound.vue";
import Password from "@/pages/Password.vue";
import Roles from "@/pages/Roles.vue";
import SocketStuff from "@/pages/SocketStuff.vue";
import Home from "@/pages/Home.vue";
import Poll from "@/pages/Poll.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/sign-up", name: "signup", component: SignUp },
  { path: "/change-password", name: "password", component: Password },
  { path: "/log-in", name: "login", component: LogIn },

  { path: "/", name: "home", component: Home },

  { path: "/socket-stuff", name: "socket-stuff", component: SocketStuff },

  { path: "/poll", name: "poll", component: Poll },

  // Available to any logged-in account

  // Role-restricted routes
  {
    name: "roles",
    path: "/roles",
    component: Roles,
    meta: { roleRequired: "admin" },
  },

  { path: "*", component: NotFound },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

function roleOk(matchedRecords: RouteRecord[]) {
  for (const record of matchedRecords) {
    const roleReq = get(record, "meta.roleRequired");
    if (roleReq && !vuexStore.getters.hasRole(roleReq)) {
      return false; // Role required and not present
    }
  }
  // Either had all the roles or there were none required
  return true;
}

router.beforeEach((to, from, next) => {
  if (to.name === "signup" || to.name === "login") {
    next(); // Allow sign up and login.
  } else if (vuexStore.getters.isLoggedIn) {
    // Already logged in.
    if (roleOk(to.matched)) {
      next(); // Allowed to access this route.
    } else {
      next({ name: "home" });
    }
  } else {
    next({ name: "login" }); // Force login.
  }
});

export default router;
