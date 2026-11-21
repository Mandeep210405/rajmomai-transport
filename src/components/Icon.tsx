import {
  Boxes,
  Clock,
  Factory,
  Flame,
  GlassWater,
  Gem,
  Globe,
  Handshake,
  Layers,
  Mountain,
  Network,
  Package,
  Pickaxe,
  Route,
  ShieldCheck,
  SlidersHorizontal,
  Store,
  Truck,
  Waves,
  type LucideProps,
} from "lucide-react";

/**
 * Icon registry. Data files refer to icons by these string names, so content can be
 * edited without touching components. Add a new icon here, then use its name in data.
 */
const icons = {
  boxes: Boxes,
  clock: Clock,
  factory: Factory,
  flame: Flame,
  glass: GlassWater,
  gem: Gem,
  globe: Globe,
  handshake: Handshake,
  layers: Layers,
  mountain: Mountain,
  network: Network,
  package: Package,
  pickaxe: Pickaxe,
  route: Route,
  shield: ShieldCheck,
  sliders: SlidersHorizontal,
  store: Store,
  truck: Truck,
  waves: Waves,
};

export type IconName = keyof typeof icons;

export default function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Cmp = icons[name];
  return <Cmp aria-hidden="true" {...props} />;
}
