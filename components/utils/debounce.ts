/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  timeout: number,
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout> | null;

  return function (this: any, ...args: Parameters<T>) {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      timer = null;
      func.apply(this, args);
    }, timeout);
  };
};
