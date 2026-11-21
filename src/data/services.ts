import type { IconName } from "@/components/Icon";

export type EnquiryType = "Transportation" | "Material Supply" | "Both";

export interface Service {
  id: string;
  title: string;
  icon: IconName;
  description: string;
  listTitle: string;
  items: string[];
  /** Optional important note shown beneath the list. */
  note?: string;
  enquiryType: EnquiryType;
}

export const services: Service[] = [
  {
    id: "transportation",
    title: "Transportation & Logistics",
    icon: "truck",
    description:
      "We provide dependable transportation solutions for industrial materials and bulk cargo through our own fleet and an established network of transport partners.",
    listTitle: "Capabilities",
    items: [
      "10–14 wheel trucks",
      "Body trucks",
      "Heavy-duty vehicles based on customer requirements",
      "Bulk material transportation",
      "Industrial cargo movement",
      "Loading and unloading coordination",
      "Transportation across Gujarat and India",
    ],
    note: "Approximately 5–10 trucks can be arranged per day with 4–5 hours’ advance notice, subject to availability and operational requirements. Capacity is met through our own fleet together with independently owned vehicles from our transport partner network.",
    enquiryType: "Transportation",
  },
  {
    id: "trading",
    title: "Industrial Material Trading & Supply",
    icon: "boxes",
    description:
      "We connect industrial buyers with material suppliers through our sourcing network, helping businesses arrange the raw materials they need.",
    listTitle: "Materials",
    items: ["Coal", "Industrial Salt", "Raw Glass Materials", "Minerals", "Sand"],
    note: "All material supply is quotation-based. Share your requirement and we will respond with a quote.",
    enquiryType: "Material Supply",
  },
];
