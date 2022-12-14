export function debounce(fn, wait) {
  let timeoutID = null;
  return function () {
    if (timeoutID != null) clearTimeout(timeoutID);
    timeoutID = setTimeout(fn, wait);
  };
}
