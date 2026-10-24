import models from "@/data/home/homeSec7.json";
import photos from "@/data/vehiclePhotos.json";
import { pickVehiclePhoto } from "@/lib/vehicleImageMatch";

// Cut-out photo for a looked-up vehicle, matched on the model name from the VRM lookup
// ("320D" -> 3 Series, "X5" -> X5, "M3" -> M3). Null when it isn't one of our models.
const norm = (v) => String(v).toUpperCase().replace(/[^A-Z0-9]/g, "");
const BY_KEY = Object.fromEntries(models.models.map((m) => [norm(m.name), m.image]));

function modelCardPhoto(make = "", model = "") {
  if (!/BMW/i.test(make) && !/BMW/i.test(model)) return null;
  const text = norm(model);
  const series = text.match(/^([1-8])\d\d/);
  if (series) return BY_KEY[`${series[1]}SERIES`] ?? null;
  const seriesName = text.match(/^([1-8])SERIES/);
  if (seriesName) return BY_KEY[`${seriesName[1]}SERIES`] ?? null;
  const code = text.match(/^(X[1-7]M?|Z4|M[2-8])/);
  return code ? (BY_KEY[code[1]] ?? null) : null;
}

/**
 * Photo for a looked-up vehicle. Uses the shared tiered matcher over the photo library in
 * public/vehicle-photos (brand must match, then model, variant, year). When the library only has
 * the brand but not the model, the site's own model-card cut-out is preferred if there is one.
 * Null when the make is not ours or nothing matches.
 */
export function vehiclePhoto(make = "", model = "", year = null) {
  const y = /^(?:19|20)\d{2}$/.test(String(year ?? "")) ? Number(year) : null;
  const hit = pickVehiclePhoto(make, model, "", y, photos);
  if (hit?.tier === "model") return hit.src;
  return modelCardPhoto(make, model) ?? hit?.src ?? null;
}
