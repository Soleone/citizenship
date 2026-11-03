import {
  MAP_SIZE,
  places,
  provinceShapes,
  type PlaceId,
  type ProvinceId,
} from "@/curriculum/canada-shapes";
import { biteVisuals } from "@/curriculum/visuals";
import { cn } from "@/lib/utils";

/** The bite's scene or map. */
export function BiteVisual({ biteId, className }: { biteId: string; className?: string }) {
  const visual = biteVisuals[biteId];
  if (!visual) return null;
  if ("map" in visual)
    return <CanadaMap highlight={visual.map} marks={visual.places ?? []} className={className} />;
  return (
    <img
      src={`${import.meta.env.BASE_URL}images/${biteId}.webp`}
      alt={visual.image}
      loading="lazy"
      className={cn("aspect-3/2 w-full rounded-lg object-cover", className)}
    />
  );
}

/** The narrowest view, as a share of the whole map, so a zoom on PEI still shows the Maritimes. */
const MIN_ZOOM_WIDTH = 0.3;

/** Frames the highlighted provinces with room around them, at the whole map's aspect ratio. */
function frame(highlight: ProvinceId[]) {
  const { width: W, height: H } = MAP_SIZE;
  const boxes = highlight.map((id) => {
    const { center, extent } = provinceShapes[id];
    return [
      center[0] - extent / 2,
      center[1] - extent / 2,
      center[0] + extent / 2,
      center[1] + extent / 2,
    ];
  });
  const left = Math.min(...boxes.map((box) => box[0]));
  const top = Math.min(...boxes.map((box) => box[1]));
  const right = Math.max(...boxes.map((box) => box[2]));
  const bottom = Math.max(...boxes.map((box) => box[3]));
  const width = Math.min(
    W,
    Math.max((right - left) * 1.4, ((bottom - top) * 1.4 * W) / H, W * MIN_ZOOM_WIDTH),
  );
  const height = (width * H) / W;
  const clamp = (value: number, max: number) => Math.min(Math.max(value, 0), max);
  return {
    x: clamp((left + right) / 2 - width / 2, W - width),
    y: clamp((top + bottom) / 2 - height / 2, H - height),
    width,
    height,
  };
}

function CanadaMap({
  highlight,
  marks,
  className,
}: {
  highlight: ProvinceId[];
  marks: PlaceId[];
  className?: string;
}) {
  const ids = Object.keys(provinceShapes) as ProvinceId[];
  const view = frame(highlight);
  /** Dots and labels keep their on-screen size whatever the zoom. */
  const scale = view.width / MAP_SIZE.width;
  const label = `Map of Canada: ${highlight.map((id) => provinceShapes[id].name).join(", ")}${
    marks.length ? `, with ${marks.map((id) => places[id].name).join(", ")}` : ""
  }`;

  return (
    <svg
      viewBox={`${view.x} ${view.y} ${view.width} ${view.height}`}
      role="img"
      aria-label={label}
      className={cn("h-auto max-h-96 w-full", className)}
    >
      {ids.map((id) => (
        <path
          key={id}
          d={provinceShapes[id].d}
          className={cn(
            "stroke-background",
            highlight.includes(id) ? "fill-primary" : "fill-foreground/15",
          )}
          strokeWidth={1.5}
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {marks.map((id) => {
        const [x, y] = places[id].at;
        // Below the dot unless that falls off the map: capitals mostly sit near their province's southern edge, so the label
        // covers water or a neighbour rather than the province itself.
        const edge = (x - view.x) / view.width;
        const anchor = edge > 0.85 ? "end" : edge < 0.15 ? "start" : "middle";
        const below = y + 60 * scale < view.y + view.height;
        return (
          <g key={id}>
            <circle
              cx={x}
              cy={y}
              r={7 * scale}
              className="fill-foreground stroke-background"
              strokeWidth={3 * scale}
            />
            <text
              x={x}
              y={below ? y + 52 * scale : y - 24 * scale}
              textAnchor={anchor}
              fontSize={44 * scale}
              paintOrder="stroke"
              strokeWidth={8 * scale}
              strokeLinejoin="round"
              className="fill-foreground stroke-background font-medium"
            >
              {places[id].name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
