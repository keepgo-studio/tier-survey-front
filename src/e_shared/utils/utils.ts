export function parseMinMax(num: number, min: number, max: number) {
  if (min > max) throw new Error("Wrong usage for parseMinMax()");

  if (num < min) return min;
  else if (num > max) return max;
  return num;
}

export function floatFormat(float: number) {
  return Math.round(float * 100) / 100;
}

export function debounce(callback: () => void, delay: number = 500) {
  let stId: ReturnType<typeof setTimeout>;

  return function () {
    clearTimeout(stId);
    stId = setTimeout(() => callback(), delay);
  }
}

export function getQuery(url: string, params: Record<string, string | number>) {
  const query = Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');

  return `${url}?${query}`;
}
