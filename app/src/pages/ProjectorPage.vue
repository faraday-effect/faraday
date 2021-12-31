<template>
  <q-page padding>
    <h1>I'm on the Big Screen</h1>
    <div>[{{ fromServer }}]</div>
    <ul>
      <li>Result: {{ result }}</li>
      <li>Loading: {{ loading }}</li>
      <li>Error: {{ error }}</li>
    </ul>

    <q-btn label="Click Me" @click="sendMessage" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { io, Socket } from 'socket.io-client';

export default defineComponent({
  name: 'ProjectorPage',

  setup() {
    let fromServer = ref('NOTHING YET');

    let socket: Socket;
    onMounted(() => {
      socket = io('ws://localhost:3000/projector');

      socket.on('message', (response: string) => {
        console.log('RESPONSE', response);
        fromServer.value = response;
      });
      socket.send('hello from quasar');
    });

    const sendMessage = () => {
      socket.send('clicky');
    };

    const { result, loading, error } = useQuery(gql`
      query getStatus {
        readStatus {
          status
        }
      }
    `);
    return { result, loading, error, fromServer, sendMessage };
  },
});
</script>
