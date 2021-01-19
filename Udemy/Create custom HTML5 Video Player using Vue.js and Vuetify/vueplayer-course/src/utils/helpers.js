import clamp from "lodash/clamp";

export function offsetX(el) {
  const {left} = el.getBoundingClientRect();
  const {scrollLeft} = document.documentElement;
  return left + scrollLeft;
}

export function getRelativeXPosition(e, target) {
  const elOffsetX = offsetX(target);
  const elWidth = target.offsetWidth;
  const value = e.pageX - elOffsetX;
  return clamp(value, 0, elWidth);
}