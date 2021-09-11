<template>
  <canvas ref="canvasElement" v-if="visible" @click="$emit('click')"></canvas>
</template>

<script lang="ts">
import { defineComponent, PropType, toRef, ref, onMounted, watch } from 'vue';

export default defineComponent({
  name: 'PdfPage',
  emits: ['click'],
  props: {
    canvas: {
      type: Object as PropType<HTMLCanvasElement>,
      required: true,
    },
    visible: {
      type: Boolean,
      default: true,
    },
  },

  setup(props) {
    const canvasElement = ref<HTMLCanvasElement>();
    const canvasProp = toRef(props, 'canvas');

    const updateCanvas = () => {
      if (canvasElement.value) {
        const canvasContext = canvasElement.value.getContext('2d');
        if (!canvasContext) {
          throw new Error('Something went haywire with the canvas or context');
        }
        canvasElement.value.height = canvasProp.value.height;
        canvasElement.value.width = canvasProp.value.width;
        canvasElement.value.style.height = canvasProp.value.style.height;
        canvasElement.value.style.width = canvasProp.value.style.width;
        canvasContext.drawImage(canvasProp.value, 0, 0);
      }
    };

    onMounted(updateCanvas);
    watch(canvasProp, updateCanvas);

    return {
      canvasElement,
    };
  },
});
</script>

<style scoped>
canvas {
  border: teal solid thin;
  border-radius: 8px;
}
</style>
