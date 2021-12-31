import _ from 'lodash';
import 'pdfjs-dist/webpack';
import { getDocument } from 'pdfjs-dist';
import { reactive } from 'vue';
import { PageViewport } from 'pdfjs-dist/types/src/display/display_utils';
import {
  PDFDocumentLoadingTask,
  PDFDocumentProxy,
  PDFPageProxy,
} from 'pdfjs-dist/types/src/display/api';

const PIXEL_RATIO = window.devicePixelRatio || 1;

/**
 * Single PDF page, drawn as an HTML `canvas` element.
 */
export interface PdfPageAsDrawn {
  pageNumber: number;
  viewport: PageViewport;
  canvas: HTMLCanvasElement;
}

/**
 * Collection of all pages (as `canvas` elements) in a PDF document.
 */
export interface PdfDocAsDrawn {
  scale: number;
  pages: PdfPageAsDrawn[];
}

/**
 * PDF file as loaded from a URL.
 */
export interface PdfAsLoaded {
  url: string;
  pdfDocumentProxy: PDFDocumentProxy;
  pdfPageProxies: PDFPageProxy[];
}

export function usePdf() {
  /**
   * Load a PDF from `url`. This function does _not_ render the PDF.
   * @param url
   */
  async function loadPdf(url: string): Promise<PdfAsLoaded> {
    console.log(`Loading PDF from '${url}'`);

    // Fetch the PDF document.
    const loadingTask: PDFDocumentLoadingTask = getDocument(url);
    const pdfDocumentProxy = await loadingTask.promise;

    // Load all the pages from the PDF as page proxy objects.
    // Pages are numbered from page 1.
    const numPages = pdfDocumentProxy.numPages;
    const pdfPageProxies = await Promise.all(
      _.map(_.range(1, numPages + 1), async (pageNum) =>
        pdfDocumentProxy.getPage(pageNum)
      )
    );
    console.log(`Loaded ${numPages} pages`);

    return { url, pdfDocumentProxy, pdfPageProxies };
  }

  /**
   * Draw a single page of the PDF.
   * @param pdfPageProxy - Proxy object containing the raw page.
   * @param scale - Scale for drawing the page.
   */
  function drawOnePage(
    pdfPageProxy: PDFPageProxy,
    scale: number
  ): Promise<PdfPageAsDrawn> {
    // Get details of the viewport for this page. We only care about the `scale`.
    const viewport = pdfPageProxy.getViewport({ scale });

    // Create a `canvas` element on which to render the page.
    // Account for non-unity pixel ratios.
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.height = Math.ceil(viewport.height);
    canvas.width = Math.ceil(viewport.width);
    canvas.style.height = `${Math.ceil(canvas.height / PIXEL_RATIO)}px`;
    canvas.style.width = `${Math.ceil(canvas.width / PIXEL_RATIO)}px`;

    // Get the 2D drawing context for the canvas.
    const canvasContext = canvas.getContext('2d');
    if (!canvasContext) {
      throw new Error('Canvas has no context');
    }
    const pageNumber = pdfPageProxy.pageNumber;

    // Create the worker task for rendering the page.
    const renderTask = pdfPageProxy.render({
      canvasContext,
      viewport,
    });

    // Render the page.
    return renderTask.promise
      .then(() => {
        console.log(`Rendered page ${pageNumber}`);
        return reactive<PdfPageAsDrawn>({
          pageNumber,
          viewport,
          canvas,
        });
      })
      .catch((error) => {
        console.error(`Failed to render page ${pageNumber}:`, error);
        throw error;
      });
  }

  /**
   * Draw all the pages in the PDF.
   * @param pdfAsLoaded - details of the raw PDF as loaded from its URL.
   * @param scale
   */
  async function drawAllPages(
    pdfAsLoaded: PdfAsLoaded,
    scale: number
  ): Promise<PdfDocAsDrawn> {
    console.log(`Drawing all pages with scale ${scale}`);
    const pages = await Promise.all(
      _.map(pdfAsLoaded.pdfPageProxies, async (pageProxy) =>
        drawOnePage(pageProxy, scale)
      )
    );
    return reactive<PdfDocAsDrawn>({
      scale,
      pages,
    });
  }

  return {
    loadPdf,
    drawAllPages,
  };
}
