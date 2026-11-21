import type { IconName } from "@/components/Icon";

export interface Industry {
  name: string;
  icon: IconName;
  blurb: string;
}

export const industries: Industry[] = [
  { name: "Glass Manufacturing", icon: "glass", blurb: "Raw material sourcing and transport support for glass producers." },
  { name: "Mining & Minerals", icon: "pickaxe", blurb: "Bulk movement and supply coordination for mining and mineral businesses." },
  { name: "Salt Manufacturing", icon: "waves", blurb: "Transportation and supply coordination for salt manufacturers." },
  { name: "Industrial Manufacturing", icon: "factory", blurb: "Dependable inbound material movement for manufacturing units." },
  { name: "Wholesale & Distribution", icon: "store", blurb: "Bulk cargo movement for wholesalers and distributors." },
  { name: "Industrial Trading", icon: "handshake", blurb: "Sourcing and logistics support for industrial traders." },
];
