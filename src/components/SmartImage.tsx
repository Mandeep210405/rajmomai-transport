import Image, { type ImageProps } from "next/image";

/**
 * next/image wrapper. SVG placeholders skip the optimiser (they are already tiny
 * vectors); real JPG/PNG/WebP photos get full Next.js optimisation.
 */
export default function SmartImage(props: ImageProps) {
  const isSvg = typeof props.src === "string" && props.src.toLowerCase().endsWith(".svg");
  return <Image {...props} unoptimized={isSvg || props.unoptimized} />;
}
