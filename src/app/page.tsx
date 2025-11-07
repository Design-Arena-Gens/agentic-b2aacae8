"use client";

import React, { useRef } from "react";
import Logo from "@/components/Logo";

export default function Page() {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const downloadSVG = () => {
    const link = document.createElement("a");
    link.href = "/logo.svg";
    link.download = "north-star-roofing-logo.svg";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const downloadPNG = async () => {
    const svgNode = svgRef.current;
    if (!svgNode) return;

    const cloned = svgNode.cloneNode(true) as SVGSVGElement;
    const size = 1000; // export width
    cloned.setAttribute("width", String(size));
    cloned.setAttribute("height", String(Math.round(size * 0.55)));

    const serialized = new XMLSerializer().serializeToString(cloned);
    const svgBlob = new Blob([serialized], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    const scale = 2; // 2x for crisp output
    const canvas = document.createElement("canvas");
    canvas.width = size * scale;
    canvas.height = Math.round(size * 0.55 * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = reject as any;
      img.src = url;
    });

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    URL.revokeObjectURL(url);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "north-star-roofing-logo.png";
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    }, "image/png");
  };

  return (
    <div className="container">
      <div className="header">
        <span className="badge">Brand Asset</span>
        <div className="small">North Star Roofing</div>
      </div>

      <div className="grid">
        <div className="card">
          <h2 className="cardTitle">Light preview</h2>
          <div className="previewLight">
            <Logo ref={svgRef as any} fill="#111827" accent="#2dd4bf" size={420} />
          </div>
          <div className="controls">
            <button className="button" onClick={downloadSVG}>Download SVG</button>
            <button className="button secondary" onClick={downloadPNG}>Export PNG</button>
          </div>
        </div>
        <div className="card">
          <h2 className="cardTitle">Dark preview</h2>
          <div className="previewDark">
            <Logo fill="#e5e7eb" accent="#2dd4bf" size={420} />
          </div>
          <div className="small">Colors: text #111827, accent #2dd4bf</div>
        </div>
      </div>

      <footer>
        Tip: SVG is best for print and high-resolution. Use PNG for quick sharing.
      </footer>

      {/* Hidden SVG for exporting exact vector */}
      <div style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden>
        <Logo ref={svgRef as any} fill="#111827" accent="#2dd4bf" size={600} />
      </div>
    </div>
  );
}
