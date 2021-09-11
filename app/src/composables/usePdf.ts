import * as _ from 'lodash';
import 'pdfjs-dist/webpack';
import { getDocument } from 'pdfjs-dist';
import {
  PDFDocumentLoadingTask,
  PDFDocumentProxy,
  PDFPageProxy,
} from 'pdfjs-dist/types/display/api';
import { PageViewport } from 'pdfjs-dist/types/display/display_utils';
import { reactive } from 'vue';

const PIXEL_RATIO = window.devicePixelRatio || 1;

export interface PdfPageAsDrawn {
  pageNumber: number;
  viewport: PageViewport;
  canvas: HTMLCanvasElement;
}

export interface PdfDocAsDrawn {
  scale: number;
  pages: PdfPageAsDrawn[];
}

export interface PdfAsLoaded {
  url: string;
  pdfDocumentProxy: PDFDocumentProxy;
  pdfPageProxies: PDFPageProxy[];
}

export function usePdf() {
  async function loadPdf(url: string): Promise<PdfAsLoaded> {
    console.log(`Loading PDF from '${url}'`);

    // Fetch the PDF document.
    const loadingTask: PDFDocumentLoadingTask = getDocument(url);
    const pdfDocumentProxy = await loadingTask.promise;

    // Load all the pages.
    const numPages = pdfDocumentProxy.numPages;
    const pdfPageProxies = await Promise.all(
      _.map(_.range(1, numPages + 1), async (pageNum) =>
        pdfDocumentProxy.getPage(pageNum)
      )
    );
    console.log(`Loaded ${numPages} pages`);

    return { url, pdfDocumentProxy, pdfPageProxies };
  }

  function drawOnePage(
    pdfPageProxy: PDFPageProxy,
    scale: number
  ): Promise<PdfPageAsDrawn> {
    const viewport = pdfPageProxy.getViewport({ scale });

    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.height = Math.ceil(viewport.height);
    canvas.width = Math.ceil(viewport.width);
    canvas.style.height = `${Math.ceil(canvas.height / PIXEL_RATIO)}px`;
    canvas.style.width = `${Math.ceil(canvas.width / PIXEL_RATIO)}px`;

    const canvasContext = canvas.getContext('2d');
    if (!canvasContext) {
      throw new Error('Canvas has no context');
    }

    const pageNumber = pdfPageProxy.pageNumber;

    const renderTask = pdfPageProxy.render({
      canvasContext,
      viewport,
    });

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
