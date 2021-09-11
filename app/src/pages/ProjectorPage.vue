<template>
  <q-page padding>
    <h1>I'm on the Big Screen</h1>
    <div>[{{ response }}]</div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProjectorPage',

  data() {
    return {
      response: '<...>',
    };
  },

  mounted() {
    console.log('SOCKET', this.$sio.id);
    this.$sio.on('message', (response: string) => {
      console.log('RESPONSE', response);
      this.response = response;
    });
    this.$sio.send('hello from quasar');
  },
});
</script>
