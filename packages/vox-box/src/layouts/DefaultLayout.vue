<template>
  <v-app>
    <app-bar app />
    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import AppBar from "@/layouts/AppBar.vue";
import Footer from "@/layouts/Footer.vue";

export default Vue.extend({
  name: "DefaultLayout",

  components: {
    AppBar,
    Footer,
  },
});
</script>
