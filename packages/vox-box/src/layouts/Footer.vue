<template>
  <v-footer app>
    <span class="title text-uppercase font-weight-light"> Faraday </span>
    <v-spacer />
    <span class="caption text-uppercase">
      &copy; Copyright 2019&ndash;{{ theYear }} Tom Nurkkala
    </span>
  </v-footer>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Footer",

  computed: {
    theYear() {
      return new Date().getFullYear();
    },
  },
});
</script>
