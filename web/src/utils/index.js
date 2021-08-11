export function debounce(fn, time) {
  let setTimeoutId;
  return function () {
    if (setTimeoutId) {
      clearTimeout(setTimeoutId);
    }
    setTimeoutId = setTimeout(() => {
      fn.apply(this, arguments);
      setTimeoutId = null;
    }, time);
  };
}
