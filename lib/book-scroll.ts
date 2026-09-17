type ScrollMetrics = { scrollTop: number; scrollHeight: number; clientHeight: number };

// Fractional positions occur with browser zoom and trackpads.
export function canScrollInDirection(element: ScrollMetrics, delta: number) {
  if (!Number.isFinite(delta) || delta === 0) return false;
  const maximum = Math.max(0, element.scrollHeight - element.clientHeight);
  if (maximum <= 1) return false;
  return delta > 0 ? element.scrollTop < maximum - 1 : element.scrollTop > 1;
}

export function wheelPixels(delta: number, mode: number, pageHeight: number) {
  return delta * (mode === 1 ? 16 : mode === 2 ? pageHeight : 1);
}
