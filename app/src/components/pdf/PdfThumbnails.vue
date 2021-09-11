<template>
  <div class="pdf-container row q-gutter-sm justify-center">
    <pdf-page
      v-for="page in pdfDocAsDrawn.pages"
      :key="page.pageNumber"
      :canvas="page.canvas"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref, onMounted } from 'vue';
import { usePdf, PdfDocAsDrawn } from 'src/composables/usePdf';
import PdfPage from 'components/PdfPage.vue';

export default defineComponent({
  name: 'PdfThumbnails',

  components: { PdfPage },

  props: {
    url: { type: String, required: true },
    scale: { type: Number, default: 1.0 },
  },

  setup(props) {
    const { url, scale } = toRefs(props);
    const { loadPdf, drawAllPages } = usePdf();

    const pdfDocAsDrawn = ref<PdfDocAsDrawn>({
      scale: scale.value,
      pages: [],
    });

    onMounted(() => {
      loadPdf(url.value)
        .then((asLoaded) => drawAllPages(asLoaded, scale.value))
        .then((asDrawn) => (pdfDocAsDrawn.value = asDrawn))
        .catch((error) => {
          throw error;
        });
    });

    return {
      pdfDocAsDrawn,
    };
  },
});
</script>

<style>
.pdf-container {
  background: teal;
}
</style>
