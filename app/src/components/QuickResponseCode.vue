<template>
  <canvas ref="theCanvas" />
</template>

<script lang="ts">
import { defineComponent, toRefs, ref, onMounted, watchEffect } from 'vue';
import { toCanvas } from 'qrcode';

export default defineComponent({
  name: 'QuickResponseCode',
  props: {
    qrCode: { type: String, required: true },
    scale: { type: Number, default: 4 },
  },
  setup(props) {
    const theCanvas = ref<HTMLCanvasElement>();
    const { qrCode, scale } = toRefs(props);

    const drawCode = () => {
      toCanvas(theCanvas.value, qrCode.value, { scale: scale.value })
        .then((result) => console.log(result))
        .catch((error) => console.log("Something's broken: ", error));
    };

    onMounted(drawCode);
    watchEffect(drawCode);

    return {
      theCanvas,
    };
  },
});
</script>

<style>
canvas {
  border: 1px teal solid;
  border-radius: 8px;
}
</style>
