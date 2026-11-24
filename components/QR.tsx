"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

/* رمز QR بصيغة SVG يُولَّد في المتصفح */
export default function QR({ value, className = "", color = "#003d55" }: { value: string; className?: string; color?: string }) {
  const [svg, setSvg] = useState("");
  useEffect(() => {
    QRCode.toString(value, { type: "svg", margin: 0, color: { dark: color, light: "#0000" }, errorCorrectionLevel: "M" })
      .then(setSvg)
      .catch(() => setSvg(""));
  }, [value, color]);
  return <div className={`[&>svg]:h-full [&>svg]:w-full ${className}`} aria-hidden="true" dangerouslySetInnerHTML={{ __html: svg }} />;
}
