export function engineLabelFromText(value) {
  const match = String(value ?? "").match(/\bBMW\s+([BMNS]\d{2}(?:TU)?)\b/i);
  return match ? `BMW ${match[1].toUpperCase()}` : "BMW engine";
}
