/////  calculate element offsets //////
const getOffset = (el) => {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.pageXOffset,
    top: rect.top + window.pageYOffset,
    bottom: rect.bottom + window.pageXOffset,
    right: rect.right + window.pageYOffset,
    width: rect.width || el.offsetWidth,
    height: rect.height || el.offsetHeight,
  };
};

export const connectLines = (baseEle, toEle, connectorEle) => {
  let d1 = getOffset(baseEle);
  let d2 = getOffset(toEle);
  let o = getOffset(connectorEle);
  let thickness = 2;
  let width = d2.bottom - d1.bottom;

  let cy = (d1.bottom + d2.bottom) / 2 - thickness / 2;
  let cx = d2.left - width / 2;

  let ox = o.left;
  let oy = o.bottom;

  let marginTop = cy - oy;
  let marginLeft = cx - ox;

  return {
    width: width,
    marginTop: marginTop,
    marginLeft: marginLeft,
    angle: 90,
  };
};
