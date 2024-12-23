export function parseMinMax(num: number, min: number, max: number) {
  if (min > max) throw new Error("Wrong usage for parseMinMax()");

  if (num < min) return min;
  else if (num > max) return max;
  return num;
}

export function floatFormat(float: number) {
  const d = 1000;
  return Math.round(float * d) / d;
}

export function debounce(callback: () => void, delay: number = 500) {
  let stId: ReturnType<typeof setTimeout>;

  return function () {
    clearTimeout(stId);
    stId = setTimeout(() => callback(), delay);
  };
}

export function getQuery(url: string, params: Record<string, string | number>) {
  const query = Object.keys(params)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
    .join("&");

  return `${url}?${query}`;
}

export function toCamelCase(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
}

export function toKebabCase(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, "-$1");
}

export function toNormalSpace(str: string, mode: "camel" = "camel") {
  switch (mode) {
    case "camel":
      return str
        .replace(/([A-Z])/g, (_, chr) => " " + chr.toLowerCase())
        .trim();
  }
}

export async function delay(mili: number) {
  return new Promise((res) => setTimeout(() => res(true), mili));
}

export function sum(arr: number[]) {
  return arr.reduce((total, num) => total + num, 0);
}

export function isMobile() {
  return Boolean(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
}