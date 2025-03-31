export const getContrastColorByHexColor = (color: string, darkColor: string, lightColor: string): string => {
  color = color.substring(1);

  const r = parseInt(color.substring(0, 2), 16); // 0 ~ 255
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);

  const srgb = [r / 255, g / 255, b / 255];
  const x = srgb.map((i) => (i <= 0.04045 ? i / 12.92 : Math.pow((i + 0.055) / 1.055, 2.4)));

  const luminance = 0.2126 * x[0] + 0.7152 * x[1] + 0.0722 * x[2];

  return luminance > 0.179 ? darkColor : lightColor;
};
