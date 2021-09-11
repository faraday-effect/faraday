import { boot } from 'quasar/wrappers';
import { io, Socket } from 'socket.io-client';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $sio: Socket;
  }
}

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ app }) => {
  console.log('BOOT SOCKET IO');
  app.config.globalProperties.$sio = io('http://localhost:3000');
  console.log('SIO IS', app.config.globalProperties.$sio);
});
