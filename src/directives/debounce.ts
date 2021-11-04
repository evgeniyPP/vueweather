const debouncer = (fn: any, delay: number, ...rest: any) => {
  let timeoutID: any;

  return () => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => fn.call(this, fn, delay, ...rest), delay);
  };
};

export default function debounce(el: HTMLElement, binding: any) {
  if (binding.value === binding.oldValue) {
    return;
  }

  el.oninput = debouncer(() => el.dispatchEvent(new Event('change')), +binding.value || 500);
}
