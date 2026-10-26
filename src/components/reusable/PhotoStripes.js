// The diagonal BMW stripes that used to be baked into the section photos. The photo's own stripes are
// covered with a flat panel and redrawn as vector bands. Coordinates are in photo pixels, and the SVG uses
// "slice" with the same anchor as the photo's object-position, so it crops and scales exactly with it.
// A band is [topLeft, topRight, bottomLeft, bottomRight] at y = 0 and y = bottom.

const poly = (b, bottom) => `${b[0]},0 ${b[1]},0 ${b[3]},${bottom} ${b[2]},${bottom}`;

const PRESETS = {
  "used-engines": {
    viewBox: "0 0 1600 679",
    align: "xMidYMid",
    bottom: 679,
    cover: { band: [880, 998, 625, 742], vertical: [["0", "#133459"], ["0.5", "#0d2a4b"], ["1", "#05162c"]] },
    glow: { band: [926, 962, 662, 702], fill: "#4fb0ff", opacity: 0.75, blur: 8 },
    bands: [
      [[926, 942, 662, 686], "#b4c4d6"],
      [[942, 946, 684, 688], "#ffffff"],
      [[946, 962, 688, 702], "#55a8e0"],
      [[964, 978, 704, 718], "#12306a"],
      [[980, 996, 722, 740], "#d4202a"],
    ],
  },
  "timing-chain": {
    viewBox: "0 0 1600 645",
    align: "xMaxYMid",
    bottom: 508,
    cover: { band: [830, 960, 625, 746], fill: "#ffffff" },
    bands: [
      [[846, 874, 640, 662], "#eceef2"],
      [[876, 894, 664, 680], "#1f4fd0"],
      [[910, 932, 694, 716], "#0c2a7a"],
      [[934, 958, 718, 744], "#ee1c25"],
    ],
  },
  // phone photo: only the area below the glass strip is covered (soft top edge), then the red line and the
  // three logo bands are redrawn. Shapes are explicit point lists.
  "choose-us-mobile": {
    viewBox: "0 0 1536 2752",
    align: "xMidYMin",
    cover: {
      points: "-40,950 1576,1336 1576,1520 -40,1520",
      blur: 5,
      vertical: [["0", "#030a17"], ["1", "#01040c"]],
    },
    shapes: [
      ["-40,1022 1576,1396 1576,1418 -40,1044", "#ff2a3a", 9],
      ["-40,1022 1576,1396 1576,1418 -40,1044", "#e3202e"],
      ["194,964 300,964 190,1180 80,1180", "#3b97e6"],
      ["314,964 420,964 310,1180 200,1180", "#1c46b0"],
      ["424,964 530,964 430,1180 320,1180", "#e6232f"],
    ],
  },
  // dark workshop phone photo: bands end behind the car's windscreen pillar, so they and the cover are
  // clipped to the same polygon (right of the pillar line)
  "service-mobile": {
    viewBox: "0 0 1000 1792",
    align: "xMidYMin",
    bottom: 410,
    clip: "734,-5 856,-5 724,408 708,404 656,354 640,346",
    cover: {
      band: [734, 856, 634, 724],
      blur: 2,
      vertical: [["0", "#04080e"], ["0.6", "#0d1520"], ["1", "#0b121c"]],
    },
    bands: [
      [[742, 775, 634, 660], "#5298d4"],
      [[775, 812, 660, 683], "#103b68"],
      [[812, 847, 683, 718], "#db2321"],
    ],
  },
  "coverage-mobile": {
    viewBox: "0 0 1000 535",
    align: "xMinYMid",
    bottom: 430,
    fade: [330, 430],
    cover: { band: [570, 642, 396, 468], fill: "#ffffff" },
    bands: [
      [[590, 606, 416, 432], "#4f9fe0"],
      [[606, 622, 432, 448], "#12307a"],
      [[624, 640, 450, 466], "#e0202a"],
    ],
  },
  coverage: {
    viewBox: "0 0 1024 677",
    align: "xMaxYMin",
    bottom: 300,
    fade: [190, 290],
    cover: { band: [545, 616, 415, 486], fill: "#ffffff" },
    bands: [
      [[560, 574, 431, 445], "#e3e6ec"],
      [[574, 586, 445, 457], "#1f4fd0"],
      [[586, 598, 457, 469], "#0c2a7a"],
      [[598, 613, 469, 484], "#ee1c25"],
    ],
  },
};

export default function PhotoStripes({ preset, className = "" }) {
  const p = PRESETS[preset];
  const id = `ps-${preset}`;
  const [fy0, fy1] = p.fade ?? [0, 0];
  return (
    <svg className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} viewBox={p.viewBox} preserveAspectRatio={`${p.align} slice`} aria-hidden="true">
      <defs>
        {p.cover.vertical && (
          <linearGradient id={`${id}-cover`} x1="0" y1="0" x2="0" y2="1">
            {p.cover.vertical.map(([o, c]) => (
              <stop key={o} offset={o} stopColor={c} />
            ))}
          </linearGradient>
        )}
        {p.clip && (
          <clipPath id={`${id}-clip`}>
            <polygon points={p.clip} />
          </clipPath>
        )}
        <filter id={`${id}-soft`} x="-5%" y="-20%" width="110%" height="140%">
          <feGaussianBlur stdDeviation={p.cover.blur ?? 0} />
        </filter>
        <filter id={`${id}-shape-glow`} x="-5%" y="-300%" width="110%" height="700%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <filter id={`${id}-glow`} x="-50%" y="-5%" width="200%" height="110%">
          <feGaussianBlur stdDeviation={p.glow?.blur ?? 0} />
        </filter>
        {p.fade && (
          <linearGradient id={`${id}-fade`} gradientUnits="userSpaceOnUse" x1="0" y1={fy0} x2="0" y2={fy1}>
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </linearGradient>
        )}
        {p.fade && (
          <mask id={`${id}-mask`} maskUnits="userSpaceOnUse" x="0" y="0" width="2000" height="2000">
            <rect x="0" y="0" width="2000" height={fy0} fill="#fff" />
            <rect x="0" y={fy0} width="2000" height={fy1 - fy0} fill={`url(#${id}-fade)`} />
          </mask>
        )}
      </defs>
      <g clipPath={p.clip ? `url(#${id}-clip)` : undefined}>
      <polygon
        points={p.cover.points ?? poly(p.cover.band, p.bottom)}
        fill={p.cover.vertical ? `url(#${id}-cover)` : p.cover.fill}
        filter={p.cover.blur ? `url(#${id}-soft)` : undefined}
      />
      {p.shapes?.map(([points, fill, blur], i) => (
        <polygon key={`s${i}`} points={points} fill={fill} opacity={blur ? 0.7 : 1} filter={blur ? `url(#${id}-shape-glow)` : undefined} />
      ))}
      <g mask={p.fade ? `url(#${id}-mask)` : undefined}>
        {p.glow && <polygon points={poly(p.glow.band, p.bottom)} fill={p.glow.fill} opacity={p.glow.opacity} filter={`url(#${id}-glow)`} />}
        {p.bands?.map(([b, fill], i) => (
          <polygon key={i} points={poly(b, p.bottom)} fill={fill} />
        ))}
      </g>
      </g>
    </svg>
  );
}
