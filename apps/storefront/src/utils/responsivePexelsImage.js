export function getResponsivePexelsSrcSet(
  source,
  widths = [320, 480, 640, 800, 1000]
) {
  if (typeof source !== "string" || !source) {
    return undefined;
  }

  try {
    const imageUrl = new URL(source);

    if (
      imageUrl.protocol !== "https:" ||
      imageUrl.hostname !== "images.pexels.com"
    ) {
      return undefined;
    }

    const candidates = [...new Set(widths)]
      .filter((width) => Number.isInteger(width) && width > 0)
      .sort((a, b) => a - b);

    if (!candidates.length) {
      return undefined;
    }

    return candidates
      .map((width) => {
        const candidate = new URL(imageUrl.href);
        candidate.searchParams.set("w", String(width));
        candidate.searchParams.set("auto", "compress,format");

        return `${candidate.href} ${width}w`;
      })
      .join(", ");
  } catch {
    return undefined;
  }
}