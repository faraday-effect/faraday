<template>
  <v-app-bar app>
    <v-toolbar-title class="headline text-uppercase">
      <span>Vox</span>
      <span class="font-weight-light">Box</span>
    </v-toolbar-title>

    <v-spacer />

    <v-menu v-if="isLoggedIn" offset-y>
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on">
          <v-icon dark>mdi-account</v-icon>
          <span>{{ $store.state.claims.firstName }}</span>
          <v-icon dark>mdi-menu-down</v-icon>
        </v-btn>
      </template>

      <v-list>
        <template v-if="hasRole('admin')">
          <v-list-item :to="{ name: 'roles' }"> Roles </v-list-item>
          <v-list-item :to="{ name: 'projects' }"> Projects </v-list-item>
          <v-list-item :to="{ name: 'grader' }"> Grader </v-list-item>
        </template>
        <v-list-item :to="{ name: 'home' }" exact> Entries </v-list-item>
        <v-list-item :to="{ name: 'reports' }"> Reports </v-list-item>

        <v-divider />

        <v-list-item :to="{ name: 'password' }">
          <v-list-item-title>Change Password</v-list-item-title>
        </v-list-item>
        <v-divider />
        <v-list-item @click="logOut">
          <v-list-item-title>Log Out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <light-dark-switcher />

    <v-btn
      text
      href="https://github.com/faraday-effect/faraday"
      target="_blank"
    >
      <v-icon>mdi-github</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";
import LightDarkSwitcher from "@/layouts/LightDarkSwitcher.vue";

export default Vue.extend({
  name: "AppBar",

  components: { LightDarkSwitcher },

  methods: {
    hasRole(roleName: string) {
      return this.$store.getters.hasRole(roleName);
    },

    logOut() {
      this.$store.commit("logOut");
      this.$router.push({ name: "login" });
    },
  },

  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
});
</script>
