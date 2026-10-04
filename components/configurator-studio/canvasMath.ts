export function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

export function calculateDragPosition(
  clientX: number,
  clientY: number,
  canvasRect: DOMRect
): { x: number; y: number } {
  const relX = ((clientX - canvasRect.left) / canvasRect.width) * 100;
  const relY = ((clientY - canvasRect.top) / canvasRect.height) * 100;
  return {
    x: Math.round(clamp(relX, 5, 95)),
    y: Math.round(clamp(relY, 5, 95)),
  };
}

export function calculateResizedDimensions(
  handle: "nw" | "ne" | "se" | "sw",
  deltaX: number,
  deltaY: number,
  currentWidth: number,
  currentHeight: number
): { width: number; height: number } {
  let newW = currentWidth;
  let newH = currentHeight;

  if (handle === "se") {
    newW = clamp(currentWidth + deltaX, 10, 100);
    newH = clamp(currentHeight + deltaY, 10, 100);
  } else if (handle === "sw") {
    newW = clamp(currentWidth - deltaX, 10, 100);
    newH = clamp(currentHeight + deltaY, 10, 100);
  } else if (handle === "ne") {
    newW = clamp(currentWidth + deltaX, 10, 100);
    newH = clamp(currentHeight - deltaY, 10, 100);
  } else if (handle === "nw") {
    newW = clamp(currentWidth - deltaX, 10, 100);
    newH = clamp(currentHeight - deltaY, 10, 100);
  }

  return { width: Math.round(newW), height: Math.round(newH) };
}
