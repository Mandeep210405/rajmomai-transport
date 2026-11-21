// Generates dark, abstract placeholder artwork. These are NOT photographs and are
// labelled as illustrative on the site. Replace them with real photos when available.
import fs from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "public/images/placeholders");
fs.mkdirSync(OUT, { recursive: true });

const W = 1600;
const H = 1000;

function rng(seed) {
  let s = seed * 9301 + 49297;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const motifs = {
  road(t, r) {
    let o = "";
    const vx = 800 + (r() - 0.5) * 200;
    const vy = 440;
    for (let x = -800; x <= 2400; x += 160) {
      o += `<line x1="${vx}" y1="${vy}" x2="${x}" y2="${H}" stroke="${t}" stroke-opacity="0.16" stroke-width="2"/>`;
    }
    for (let i = 1; i < 14; i++) {
      const y = vy + Math.pow(i / 14, 2.1) * (H - vy);
      o += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${t}" stroke-opacity="${0.04 + i * 0.008}"/>`;
    }
    o += `<rect x="0" y="${vy - 2}" width="${W}" height="3" fill="${t}" fill-opacity="0.35"/>`;
    for (let i = 0; i < 9; i++) {
      const y1 = vy + Math.pow(i / 9, 2) * (H - vy);
      const y2 = vy + Math.pow((i + 0.5) / 9, 2) * (H - vy);
      o += `<line x1="${vx + (i * 4)}" y1="${y1}" x2="${vx + (i + 0.5) * 4}" y2="${y2}" stroke="${t}" stroke-opacity="0.5" stroke-width="${2 + i * 1.4}"/>`;
    }
    return o;
  },
  pile(t, r) {
    let o = "";
    for (let i = 0; i < 4; i++) {
      const cx = 250 + i * 380 + (r() - 0.5) * 120;
      const w = 360 + r() * 260;
      const h = 220 + r() * 260;
      o += `<polygon points="${cx - w / 2},${H - 150} ${cx + (r() - 0.5) * 60},${H - 150 - h} ${cx + w / 2},${H - 150}" fill="${t}" fill-opacity="${0.12 + r() * 0.14}" stroke="${t}" stroke-opacity="0.35"/>`;
    }
    o += `<rect x="0" y="${H - 150}" width="${W}" height="150" fill="#0a0a0a" fill-opacity="0.7"/>`;
    return o;
  },
  dunes(t, r) {
    let o = "";
    for (let i = 0; i < 5; i++) {
      const y = 480 + i * 100;
      const a = 60 + r() * 80;
      o += `<path d="M0 ${y} C ${400 + r() * 100} ${y - a}, ${900 + r() * 100} ${y + a}, ${W} ${y - 20} L ${W} ${H} L 0 ${H} Z" fill="${t}" fill-opacity="${0.06 + i * 0.04}" stroke="${t}" stroke-opacity="0.25"/>`;
    }
    return o;
  },
  facets(t, r) {
    let o = "";
    const cols = 10;
    const rows = 6;
    const pts = [];
    for (let y = 0; y <= rows; y++) {
      pts[y] = [];
      for (let x = 0; x <= cols; x++) {
        pts[y][x] = [(x / cols) * W + (r() - 0.5) * 90, (y / rows) * H + (r() - 0.5) * 90];
      }
    }
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const [a, b, c, d] = [pts[y][x], pts[y][x + 1], pts[y + 1][x + 1], pts[y + 1][x]];
        o += `<polygon points="${a} ${b} ${c}" fill="${t}" fill-opacity="${r() * 0.16}" stroke="${t}" stroke-opacity="0.12"/>`;
        o += `<polygon points="${a} ${c} ${d}" fill="${t}" fill-opacity="${r() * 0.12}" stroke="${t}" stroke-opacity="0.12"/>`;
      }
    }
    return o;
  },
  grid(t, r) {
    let o = "";
    for (let x = 0; x <= W; x += 100) o += `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${t}" stroke-opacity="0.07"/>`;
    for (let y = 0; y <= H; y += 100) o += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${t}" stroke-opacity="0.07"/>`;
    for (let i = 0; i < 7; i++) {
      const w = 160 + r() * 200;
      const h = 90 + r() * 140;
      o += `<rect x="${100 + r() * 1200}" y="${300 + r() * 450}" width="${w}" height="${h}" fill="${t}" fill-opacity="${0.06 + r() * 0.1}" stroke="${t}" stroke-opacity="0.35"/>`;
    }
    return o;
  },
  blocks(t, r) {
    let o = "";
    for (let row = 0; row < 3; row++) {
      let x = 120 + r() * 80;
      for (let i = 0; i < 4; i++) {
        const w = 230 + r() * 120;
        o += `<rect x="${x}" y="${H - 190 - row * 150}" width="${w}" height="130" fill="${t}" fill-opacity="${0.08 + r() * 0.14}" stroke="${t}" stroke-opacity="0.4"/>`;
        for (let k = 1; k < 6; k++) o += `<line x1="${x + (w / 6) * k}" y1="${H - 190 - row * 150}" x2="${x + (w / 6) * k}" y2="${H - 60 - row * 150}" stroke="${t}" stroke-opacity="0.15"/>`;
        x += w + 30;
      }
    }
    return o;
  },
};

const items = {
  hero: ["#D4AF37", "road", 1],
  transportation: ["#D4AF37", "road", 2],
  "transportation-2": ["#B87333", "road", 5],
  fleet: ["#D4AF37", "blocks", 3],
  "fleet-2": ["#B87333", "blocks", 8],
  coal: ["#8a8a8a", "pile", 4],
  salt: ["#cfd8dc", "pile", 6],
  minerals: ["#B87333", "facets", 7],
  sand: ["#c9a66b", "dunes", 9],
  operations: ["#D4AF37", "grid", 10],
  "operations-2": ["#B87333", "grid", 11],
  glass: ["#7fb7c9", "facets", 12],
};

for (const [name, [tint, motif, seed]] of Object.entries(items)) {
  const r = rng(seed);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" preserveAspectRatio="xMidYMid slice">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b0b0b"/><stop offset="1" stop-color="#1c1c1c"/></linearGradient>
<radialGradient id="glow" cx="${30 + (seed % 5) * 10}%" cy="38%" r="55%"><stop offset="0" stop-color="${tint}" stop-opacity="0.3"/><stop offset="1" stop-color="${tint}" stop-opacity="0"/></radialGradient>
<radialGradient id="vig" cx="50%" cy="50%" r="75%"><stop offset="0.5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.65"/></radialGradient>
</defs>
<rect width="${W}" height="${H}" fill="url(#bg)"/>
<rect width="${W}" height="${H}" fill="url(#glow)"/>
${motifs[motif](tint, r)}
<rect width="${W}" height="${H}" fill="url(#vig)"/>
</svg>`;
  fs.writeFileSync(path.join(OUT, `${name}.svg`), svg);
}
console.log(`Generated ${Object.keys(items).length} placeholders in ${OUT}`);
