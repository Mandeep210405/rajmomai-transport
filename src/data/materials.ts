import type { IconName } from "@/components/Icon";

export interface Material {
  id: string;
  name: string;
  description: string;
  icon: IconName;
  /** Replace with a real photo path (e.g. "/images/materials/coal.jpg") when available. */
  image: string;
  imageAlt: string;
  /** True while the image is an illustrative placeholder. */
  isPlaceholder: boolean;
}

export const materials: Material[] = [
  {
    id: "coal",
    name: "Coal",
    description: "Bulk coal sourcing for industrial and manufacturing requirements.",
    icon: "flame",
    image: "/images/placeholders/coal.svg",
    imageAlt: "Illustrative placeholder artwork representing bulk coal",
    isPlaceholder: true,
  },
  {
    id: "industrial-salt",
    name: "Industrial Salt",
    description: "Supply coordination for industrial and salt manufacturing requirements.",
    icon: "waves",
    image: "/images/placeholders/salt.svg",
    imageAlt: "Illustrative placeholder artwork representing industrial salt",
    isPlaceholder: true,
  },
  {
    id: "raw-glass-materials",
    name: "Raw Glass Materials",
    description: "Sourcing materials for glass manufacturing industries.",
    icon: "glass",
    image: "/images/placeholders/glass.svg",
    imageAlt: "Illustrative placeholder artwork representing raw glass materials",
    isPlaceholder: true,
  },
  {
    id: "minerals",
    name: "Minerals",
    description: "Industrial mineral sourcing and supply.",
    icon: "gem",
    image: "/images/placeholders/minerals.svg",
    imageAlt: "Illustrative placeholder artwork representing industrial minerals",
    isPlaceholder: true,
  },
  {
    id: "sand",
    name: "Sand",
    description: "Bulk sand sourcing for industrial and commercial requirements.",
    icon: "mountain",
    image: "/images/placeholders/sand.svg",
    imageAlt: "Illustrative placeholder artwork representing bulk sand",
    isPlaceholder: true,
  },
];
