<template>
  <q-page padding>
    <h1>I'm on the Big Screen</h1>
    <div>[{{ response }}]</div>
    <ul>
      <li>{{ result }}</li>
      <li>{{ loading }}</li>
      <li>{{ error }}</li>
    </ul>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

export default defineComponent({
  name: 'ProjectorPage',

  data() {
    return {
      response: 'NOTHING YET',
    };
  },

  setup() {
    const { result, loading, error } = useQuery(gql`
      query getStatus {
        readStatus {
          status
        }
      }
    `);
    return { result, loading, error };
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
