"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  RotateCcw, 
  ChevronUp, 
  ChevronDown, 
  Download, 
  Loader2, 
  FileText, 
  AlertCircle,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    pdfjsLib?: any;
  }
}

interface PdfDocumentViewerProps {
  url: string;
  title?: string;
  className?: string;
  onDownload?: () => void;
}

// Helper to dynamically load local PDF.js script & worker
function loadPdfJs(): Promise<any> {
  if (typeof window === "undefined") return Promise.reject(new Error("Window undefined"));
  if (window.pdfjsLib) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = "/vendor/pdfjs/pdf.worker.min.js";
    return Promise.resolve(window.pdfjsLib);
  }

  return new Promise((resolve, reject) => {
    const existing = document.getElementById("pdfjs-script") as HTMLScriptElement | null;
    if (existing) {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = "/vendor/pdfjs/pdf.worker.min.js";
        return resolve(window.pdfjsLib);
      }
      existing.addEventListener("load", () => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = "/vendor/pdfjs/pdf.worker.min.js";
        resolve(window.pdfjsLib);
      });
      existing.addEventListener("error", reject);
      return;
    }

    const script = document.createElement("script");
    script.id = "pdfjs-script";
    script.src = "/vendor/pdfjs/pdf.min.js";
    script.async = true;
    script.onload = () => {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = "/vendor/pdfjs/pdf.worker.min.js";
        resolve(window.pdfjsLib);
      } else {
        reject(new Error("pdfjsLib not found on window"));
      }
    };
    script.onerror = () => {
      // Fallback to CDN if local fails
      const fallbackScript = document.createElement("script");
      fallbackScript.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
      fallbackScript.onload = () => {
        if (window.pdfjsLib) {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
          resolve(window.pdfjsLib);
        } else {
          reject(new Error("Fallback pdfjsLib failed"));
        }
      };
      fallbackScript.onerror = reject;
      document.head.appendChild(fallbackScript);
    };
    document.head.appendChild(script);
  });
}

export function PdfDocumentViewer({
  url,
  title = "Document Preview",
  className,
  onDownload,
}: PdfDocumentViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Zoom scale (1.0 = 100%)
  const [scale, setScale] = useState<number>(1.0);
  const [fitWidthScale, setFitWidthScale] = useState<number>(1.0);

  // Load PDF Document
  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    setError(null);

    loadPdfJs()
      .then((pdfjs) => {
        if (isCancelled) return;
        const loadingTask = pdfjs.getDocument({
          url,
          cMapUrl: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/",
          cMapPacked: true,
        });

        return loadingTask.promise;
      })
      .then((doc) => {
        if (isCancelled || !doc) return;
        setPdfDoc(doc);
        setNumPages(doc.numPages);
        setCurrentPage(1);

        // Calculate initial fit-width scale based on Page 1
        doc.getPage(1).then((firstPage: any) => {
          if (isCancelled) return;
          const viewport = firstPage.getViewport({ scale: 1.0 });
          const containerWidth = containerRef.current?.clientWidth || window.innerWidth;
          // Leave comfortable padding on sides
          const targetWidth = Math.max(300, containerWidth - (containerWidth < 640 ? 24 : 64));
          const calculatedFit = Math.min(2.0, Math.max(0.5, targetWidth / viewport.width));
          setFitWidthScale(calculatedFit);
          // Default to Fit Width so mobile phones display perfectly from edge to edge
          setScale(calculatedFit);
          setLoading(false);
        }).catch(() => {
          setLoading(false);
        });
      })
      .catch((err) => {
        if (isCancelled) return;
        console.error("Failed to load PDF:", err);
        setError("Unable to preview document directly. You can download or view it in an external tab.");
        setLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [url]);

  // Recalculate fit width on window resize
  useEffect(() => {
    const handleResize = () => {
      if (!pdfDoc) return;
      pdfDoc.getPage(1).then((firstPage: any) => {
        const viewport = firstPage.getViewport({ scale: 1.0 });
        const containerWidth = containerRef.current?.clientWidth || window.innerWidth;
        const targetWidth = Math.max(300, containerWidth - (containerWidth < 640 ? 24 : 64));
        const calculatedFit = Math.min(2.0, Math.max(0.5, targetWidth / viewport.width));
        setFitWidthScale(calculatedFit);
      }).catch(() => {});
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pdfDoc]);

  // Zoom handlers
  const handleZoomIn = () => setScale((s) => Math.min(2.8, +(s + 0.2).toFixed(2)));
  const handleZoomOut = () => setScale((s) => Math.max(0.5, +(s - 0.2).toFixed(2)));
  const handleFitWidth = () => setScale(fitWidthScale);
  const handleResetZoom = () => setScale(1.0);

  // Page jump
  const scrollToPage = (pageNum: number) => {
    const target = document.getElementById(`pdf-page-${pageNum}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Touch Pinch-to-zoom tracking
  const touchStartDistRef = useRef<number | null>(null);
  const touchStartScaleRef = useRef<number>(scale);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchStartDistRef.current = dist;
      touchStartScaleRef.current = scale;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchStartDistRef.current !== null) {
      const currentDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const ratio = currentDist / touchStartDistRef.current;
      const newScale = Math.min(2.8, Math.max(0.5, +(touchStartScaleRef.current * ratio).toFixed(2)));
      setScale(newScale);
    }
  };

  const handleTouchEnd = () => {
    touchStartDistRef.current = null;
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative w-full h-full flex flex-col bg-[#0b1523] text-white select-none overflow-hidden",
        className
      )}
    >
      {/* Top Controls Toolbar */}
      <div className="z-20 w-full px-3 sm:px-5 py-2.5 bg-[#0D2440]/95 backdrop-blur-md border-b border-[#7BA4D0]/20 flex items-center justify-between gap-2 shrink-0">
        {/* Left: Document info & Page Counter */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-[#2563EB]/20 border border-[#2563EB]/40 flex items-center justify-center text-[#7BA4D0] shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-heading font-bold text-white truncate max-w-[140px] xs:max-w-[200px] sm:max-w-md">
              {title}
            </h4>
            {numPages > 0 && (
              <span className="text-[10px] font-mono text-[#7BA4D0] block">
                Page {currentPage} of {numPages}
              </span>
            )}
          </div>
        </div>

        {/* Right: Zoom & Navigation Toolbar */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Page Up / Down Quick Nav */}
          {numPages > 1 && (
            <div className="hidden xs:flex items-center bg-white/5 border border-white/10 rounded-lg p-0.5 mr-1">
              <button
                onClick={() => scrollToPage(Math.max(1, currentPage - 1))}
                disabled={currentPage <= 1}
                title="Previous Page"
                className="p-1 rounded text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => scrollToPage(Math.min(numPages, currentPage + 1))}
                disabled={currentPage >= numPages}
                title="Next Page"
                className="p-1 rounded text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Zoom Buttons */}
          <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-0.5">
            <button
              onClick={handleZoomOut}
              title="Zoom Out"
              aria-label="Zoom Out"
              className="p-1 sm:p-1.5 rounded text-white/80 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
            >
              <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <span className="px-1.5 text-[11px] font-mono text-[#93C5FD] min-w-[42px] text-center hidden sm:inline-block">
              {Math.round(scale * 100)}%
            </span>

            <button
              onClick={handleZoomIn}
              title="Zoom In"
              aria-label="Zoom In"
              className="p-1 sm:p-1.5 rounded text-white/80 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
            >
              <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Fit Width Button */}
          <button
            onClick={handleFitWidth}
            title="Fit to Width"
            aria-label="Fit Width"
            className="p-1.5 sm:p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white active:scale-95 transition-all"
          >
            <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Reset Zoom Button */}
          <button
            onClick={handleResetZoom}
            title="Reset Scale"
            aria-label="Reset Scale"
            className="p-1.5 sm:p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white active:scale-95 transition-all hidden md:flex items-center"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Download Button (Optional Action) */}
          <a
            href={url}
            download
            onClick={onDownload}
            title="Download Document"
            className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-heading font-bold flex items-center gap-1.5 transition-all shadow-sm shrink-0 ml-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download</span>
          </a>
        </div>
      </div>

      {/* Main Document Canvas Scroll Area */}
      <div 
        ref={scrollAreaRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="flex-1 w-full h-full overflow-y-auto overflow-x-auto p-2 sm:p-4 md:p-6 bg-[#07111e] flex flex-col items-center gap-4 scroll-smooth"
      >
        {/* Loading State */}
        {loading && (
          <div className="flex-1 w-full min-h-[360px] flex flex-col items-center justify-center p-8 text-center">
            <Loader2 className="w-9 h-9 text-[#2563EB] animate-spin mb-3" />
            <p className="text-xs sm:text-sm font-medium text-white/80">Rendering Document Preview...</p>
            <p className="text-[11px] text-[#7BA4D0] mt-1 font-mono">Zero downloads triggered</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex-1 w-full min-h-[360px] flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h4 className="text-base font-heading font-bold text-white mb-2">
              Preview Fallback Notice
            </h4>
            <p className="text-xs text-white/70 leading-relaxed mb-6 font-light">
              {error}
            </p>
            <div className="flex items-center gap-3">
              <a 
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-heading font-bold transition-all flex items-center gap-2"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Open File Directly
              </a>
              <a 
                href={url}
                download
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-heading font-bold transition-all flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                Download PDF
              </a>
            </div>
          </div>
        )}

        {/* Multi-Page Canvas Stack */}
        {!loading && !error && pdfDoc && (
          <div 
            className="flex flex-col items-center gap-4 sm:gap-6 py-2 transition-transform duration-100"
            style={{ width: "100%", maxWidth: "100%" }}
          >
            {Array.from({ length: numPages }, (_, i) => i + 1).map((pageNum) => (
              <PdfCanvasPage 
                key={pageNum}
                pdfDoc={pdfDoc}
                pageNum={pageNum}
                scale={scale}
                onVisible={() => setCurrentPage(pageNum)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Floating Bottom Status Pill for Mobile */}
      {numPages > 1 && !loading && !error && (
        <div className="sm:hidden absolute bottom-3 left-1/2 -translate-x-1/2 z-20 px-3 py-1.5 rounded-full bg-[#0D2440]/90 backdrop-blur-md border border-[#7BA4D0]/30 shadow-lg text-[10px] font-mono text-white/90 flex items-center gap-2">
          <span>{currentPage} / {numPages}</span>
          <span className="text-white/30">•</span>
          <span>{Math.round(scale * 100)}%</span>
        </div>
      )}
    </div>
  );
}

// Subcomponent for each rendered page canvas
function PdfCanvasPage({
  pdfDoc,
  pageNum,
  scale,
  onVisible,
}: {
  pdfDoc: any;
  pageNum: number;
  scale: number;
  onVisible: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderTaskRef = useRef<any>(null);
  const [pageRendered, setPageRendered] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  // IntersectionObserver to only render when page is near screen
  const [isVisible, setIsVisible] = useState(pageNum <= 2);

  useEffect(() => {
    if (pageNum <= 2) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            onVisible();
          }
        });
      },
      { rootMargin: "400px 0px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [pageNum, onVisible]);

  // Render page onto canvas
  useEffect(() => {
    if (!isVisible || !pdfDoc || !canvasRef.current) return;
    let isCancelled = false;
    setPageLoading(true);

    if (renderTaskRef.current) {
      try {
        renderTaskRef.current.cancel();
      } catch (_) {}
    }

    pdfDoc.getPage(pageNum).then((page: any) => {
      if (isCancelled || !canvasRef.current) return;

      const viewport = page.getViewport({ scale });
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      // Handle High DPI / Retina crispness
      const outputScale = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
      canvas.width = Math.floor(viewport.width * outputScale);
      canvas.height = Math.floor(viewport.height * outputScale);
      canvas.style.width = Math.floor(viewport.width) + "px";
      canvas.style.height = Math.floor(viewport.height) + "px";

      ctx.save();
      ctx.scale(outputScale, outputScale);

      const renderContext = {
        canvasContext: ctx,
        viewport,
      };

      const renderTask = page.render(renderContext);
      renderTaskRef.current = renderTask;

      renderTask.promise
        .then(() => {
          ctx.restore();
          if (!isCancelled) {
            setPageRendered(true);
            setPageLoading(false);
          }
        })
        .catch((err: any) => {
          ctx.restore();
          if (err?.name !== "RenderingCancelledException") {
            console.error(`Page ${pageNum} render error:`, err);
          }
          if (!isCancelled) {
            setPageLoading(false);
          }
        });
    });

    return () => {
      isCancelled = true;
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch (_) {}
      }
    };
  }, [isVisible, pdfDoc, pageNum, scale]);

  return (
    <div
      id={`pdf-page-${pageNum}`}
      ref={containerRef}
      className="relative flex flex-col items-center rounded-lg sm:rounded-xl shadow-2xl bg-white transition-all overflow-hidden border border-white/10"
      style={{ minHeight: pageRendered ? undefined : "360px", minWidth: "260px" }}
    >
      {pageLoading && !pageRendered && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60 z-10 backdrop-blur-xs">
          <Loader2 className="w-6 h-6 text-[#2563EB] animate-spin" />
        </div>
      )}
      <canvas 
        ref={canvasRef} 
        className="block bg-white transition-opacity duration-300"
        style={{ opacity: pageRendered ? 1 : 0.6 }}
      />
    </div>
  );
}
