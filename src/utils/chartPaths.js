/** Build SVG path for a closed area under a polyline (viewBox 0 0 100 100). */
export function areaPathFromPolyline(pointsStr) {
  const coords = pointsStr
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((pair) => pair.split(',').map(Number))

  if (!coords.length) return ''

  let d = `M ${coords[0][0]} ${coords[0][1]}`
  for (let i = 1; i < coords.length; i++) {
    d += ` L ${coords[i][0]} ${coords[i][1]}`
  }
  const lastX = coords[coords.length - 1][0]
  const firstX = coords[0][0]
  d += ` L ${lastX} 100 L ${firstX} 100 Z`
  return d
}
