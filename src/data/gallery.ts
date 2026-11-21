/**
 * Central gallery data.
 *
 * To use real company photographs: drop the file into /public/images/gallery/,
 * then change `src`, `alt`, and set `isPlaceholder: false` for that entry.
 * Entries flagged `isPlaceholder: true` are labelled on the site as illustrative
 * imagery so they are never presented as actual Rajmomai Transport operations.
 */
export const galleryCategories = [
  "Transportation",
  "Trucks & Fleet",
  "Coal",
  "Salt",
  "Minerals",
  "Sand",
  "Industrial Operations",
  "Glass Manufacturing",
] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: GalleryCategory;
  /** Layout hint for the asymmetric grid. */
  size?: "normal" | "wide" | "tall" | "large";
  isPlaceholder: boolean;
}

const ph = (name: string) => `/images/placeholders/${name}.svg`;

export const gallery: GalleryImage[] = [
  { id: "g1", src: ph("transportation"), alt: "Illustrative placeholder: industrial road transport", title: "Bulk Transportation", category: "Transportation", size: "large", isPlaceholder: true },
  { id: "g2", src: ph("coal"), alt: "Illustrative placeholder: coal", title: "Coal", category: "Coal", size: "normal", isPlaceholder: true },
  { id: "g3", src: ph("fleet"), alt: "Illustrative placeholder: trucks and fleet", title: "Trucks & Fleet", category: "Trucks & Fleet", size: "tall", isPlaceholder: true },
  { id: "g4", src: ph("salt"), alt: "Illustrative placeholder: salt", title: "Industrial Salt", category: "Salt", size: "normal", isPlaceholder: true },
  { id: "g5", src: ph("minerals"), alt: "Illustrative placeholder: minerals", title: "Minerals", category: "Minerals", size: "wide", isPlaceholder: true },
  { id: "g6", src: ph("sand"), alt: "Illustrative placeholder: sand", title: "Sand", category: "Sand", size: "normal", isPlaceholder: true },
  { id: "g7", src: ph("operations"), alt: "Illustrative placeholder: industrial operations", title: "Loading & Operations", category: "Industrial Operations", size: "tall", isPlaceholder: true },
  { id: "g8", src: ph("glass"), alt: "Illustrative placeholder: glass manufacturing", title: "Glass Manufacturing", category: "Glass Manufacturing", size: "wide", isPlaceholder: true },
  { id: "g9", src: ph("transportation-2"), alt: "Illustrative placeholder: highway freight movement", title: "Highway Freight", category: "Transportation", size: "normal", isPlaceholder: true },
  { id: "g10", src: ph("fleet-2"), alt: "Illustrative placeholder: heavy-duty vehicles", title: "Heavy-Duty Vehicles", category: "Trucks & Fleet", size: "normal", isPlaceholder: true },
  { id: "g11", src: ph("operations-2"), alt: "Illustrative placeholder: material handling", title: "Material Handling", category: "Industrial Operations", size: "wide", isPlaceholder: true },
];
