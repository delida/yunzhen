const fonts = {
  SonglcyFont: {
    fontWeights: {
      300: "Light",
      400: "Regular",
      700: "Bold",
      900: "Black",
      normal: "Regular",
      bold: "Bold",
    },
    fontStyles: {
      normal: "",
      italic: "Italic",
    },
  },
};

/**
 * 返回不同的字体
 * @param {*} baseFontFamily
 * @param {*} styles
 */
const getFontFamily = (baseFontFamily, styles = {}) => {
  const { fontWeight, fontStyle } = styles;
  const font = fonts[baseFontFamily];
  const weight = fontWeight ? font.fontWeights[fontWeight] : font.fontWeights.normal;
  const style = fontStyle ? font.fontStyles[fontStyle] : font.fontStyles.normal;

  if (style === font.fontStyles.italic && weight === font.fontWeights.normal) {
    return `${baseFontFamily}-${style}`;
  }

  return `${baseFontFamily}-${weight}${style}`;
};

export default getFontFamily;
