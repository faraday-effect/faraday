<template>
  <span>
    {{ currentTime }}
  </span>
</template>

<script lang="ts">
import { defineComponent, toRef, ref, watch, onMounted } from 'vue';
import { DateTime } from 'luxon';

export default defineComponent({
  name: 'WallClock',
  props: {
    clockRunning: { type: Boolean, default: false },
  },
  setup(props) {
    const clockRunning = toRef(props, 'clockRunning');
    const currentTime = ref('');
    let intervalId = -Infinity;

    const getCurrentTime = (): string => DateTime.now().toFormat('hh:mm:ss a');

    const updateClock = () => {
      currentTime.value = getCurrentTime();
    };

    const startClock = () => {
      intervalId = window.setInterval(updateClock, 1000);
    };

    const stopClock = () => {
      if (intervalId > -Infinity) {
        window.clearInterval(intervalId);
      }
    };

    onMounted(updateClock);
    watch(clockRunning, (newValue: boolean) => {
      if (newValue) {
        startClock();
      } else {
        stopClock();
      }
    });

    return { currentTime };
  },
});
</script>
