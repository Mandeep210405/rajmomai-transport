import type { IconName } from "@/components/Icon";

export interface Advantage {
  title: string;
  text: string;
  icon: IconName;
}

export const advantages: Advantage[] = [
  { title: "16+ Years of Industry Experience", text: "Long-standing experience in industrial transportation and material trading.", icon: "clock" },
  { title: "Own Fleet + Extended Transport Network", text: "Our own vehicles, complemented by independently owned trucks from partner transporters.", icon: "truck" },
  { title: "5–10 Trucks Arranged Per Day, Subject to Availability", text: "Arranged with 4–5 hours’ advance notice, depending on operational requirements.", icon: "layers" },
  { title: "Industrial Material Sourcing Network", text: "Sourcing relationships for coal, salt, glass materials, minerals and sand.", icon: "network" },
  { title: "Gujarat-Based, Pan-India Service", text: "Based in Bhavnagar; routes across India are arranged on requirement and subject to availability.", icon: "globe" },
  { title: "Reliable Transportation Coordination", text: "Clear coordination from loading through to delivery.", icon: "route" },
  { title: "Flexible Solutions Based on Customer Requirements", text: "Vehicle type, quantity and schedule shaped around your needs.", icon: "sliders" },
];
