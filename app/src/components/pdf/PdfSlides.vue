<template>
  <div class="row justify-center">
    <div class="column">
      <q-btn label="Show Thumbnails" @click="thumbnailsVisible = true" />
      <pdf-thumbnails-dialog
        v-if="thumbnails"
        v-model="thumbnailsVisible"
        :pdf-doc-as-drawn="thumbnails"
        @click="thumbnailClicked"
      />
      Index: {{ currentPageIndex }}, Count: {{ numPages }}
    </div>
    <pdf-page-picker
      :num-pages="numPages"
      :current-page-index="currentPageIndex"
      @update:current-page-index="currentPageIndex = $event"
    />
    <pdf-page v-if="currentCanvas" :canvas="currentCanvas" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  toRef,
  onMounted,
  reactive,
  watch,
} from 'vue';
import PdfPage from 'components/PdfPage.vue';
import { PdfAsLoaded, PdfDocAsDrawn, usePdf } from 'src/composables/usePdf';
import { useQuasar } from 'quasar';
import PdfPagePicker from 'components/PdfPagePicker.vue';
import PdfThumbnailsDialog from 'components/PdfThumbnailsDialog.vue';
import * as _ from 'lodash';

export default defineComponent({
  name: 'PdfSlides',
  components: { PdfThumbnailsDialog, PdfPagePicker, PdfPage },
  props: {
    url: { type: String, required: true },
  },

  setup(props) {
    const url = toRef(props, 'url');
    const $q = useQuasar();
    const { loadPdf, drawAllPages } = usePdf();

    const pdfAsLoaded = ref<PdfAsLoaded>();
    const pdfDocAsDrawn = reactive<PdfDocAsDrawn>({
      scale: -Infinity,
      pages: [],
    });
    const numPages = computed(() => pdfDocAsDrawn.pages.length);
    const isDocLoaded = computed(() => numPages.value > 0);

    const currentPageIndex = ref(0);
    const updatePageIndex = (newIndex: number) => {
      currentPageIndex.value = newIndex;
    };

    const currentPage = computed(
      () => pdfDocAsDrawn.pages[currentPageIndex.value]
    );
    const currentCanvas = computed(() =>
      isDocLoaded.value ? currentPage.value.canvas : null
    );

    const contentSize = computed(() => {
      const windowHeight = $q.screen.height;
      const windowWidth = $q.screen.width;
      return {
        width: windowWidth,
        height: windowHeight - 50,
      };
    });

    const scale = ref(1.0);
    const calculateScale = () => {
      if (!pdfAsLoaded.value) {
        console.error('No loaded PDF');
        return;
      }
      const viewport = pdfAsLoaded.value.pdfPageProxies[
        currentPageIndex.value
      ].getViewport({ scale: 1.0 });
      const { height: contentHeight, width: contentWidth } = contentSize.value;
      const verticalScale =
        (contentHeight / viewport.height) * window.devicePixelRatio;
      const horizontalScale =
        (contentWidth / viewport.width) * window.devicePixelRatio;
      scale.value = Math.min(verticalScale, horizontalScale);
      console.log(`Calculated scale of ${scale.value}`);
    };

    onMounted(() => {
      loadPdf(url.value)
        .then((pdf) => {
          console.log('PDF Loaded');
          pdfAsLoaded.value = pdf;
        })
        .catch((error) => {
          throw error;
        });
    });

    const scaleAndDrawAllPages = () => {
      if (pdfAsLoaded.value) {
        calculateScale();
        drawAllPages(pdfAsLoaded.value, scale.value)
          .then((asDrawn) => {
            pdfDocAsDrawn.scale = asDrawn.scale;
            pdfDocAsDrawn.pages = asDrawn.pages;
          })
          .catch((error) => {
            throw error;
          });
      }
    };

    const thumbnailsVisible = ref(false);
    const thumbnails = ref<PdfDocAsDrawn>();
    const thumbnailClicked = (pageNumber: number) => {
      console.log('PdfSlides THUMBNAIL', pageNumber);
      thumbnailsVisible.value = false;
      currentPageIndex.value = pageNumber - 1;
    };

    watch(pdfAsLoaded, () => {
      // Create the slides.
      scaleAndDrawAllPages();

      // Create the thumbnails.
      if (pdfAsLoaded.value) {
        drawAllPages(pdfAsLoaded.value, 1.0)
          .then((asDrawn) => {
            thumbnails.value = asDrawn;
          })
          .catch((error) => {
            throw error;
          });
      }
    });
    watch(contentSize, _.debounce(scaleAndDrawAllPages, 500));

    return {
      currentPageIndex,
      currentCanvas,
      numPages,
      updatePageIndex,
      pdfDocAsDrawn,
      thumbnails,
      thumbnailsVisible,
      thumbnailClicked,
    };
  },
});
</script>
