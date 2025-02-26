import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfigFile from "@/tailwind.config.js";
interface TailwindConfig {
  theme: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: any;
    screens: {
      [key: string]: string; // Assuming screens have string values like "768px"
    };
    colors: {
      [key: string]: {
        [key: string]: string; // Assuming color shades are strings
      };
    };
    // Define other theme properties if needed
  };
  // Define other Tailwind CSS config properties if needed
}
export const tailwindConfig = resolveConfig(
  tailwindConfigFile,
) as unknown as TailwindConfig;

export const getBreakpointValue = (value: string): number => {
  const screenValue = tailwindConfig.theme.screens[value];
  return +screenValue.slice(0, screenValue.indexOf("px"));
};

export const getBreakpoint = () => {
  let currentBreakpoint;
  let biggestBreakpointValue = 0;
  const windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
  for (const breakpoint of Object.keys(tailwindConfig.theme.screens)) {
    const breakpointValue = getBreakpointValue(breakpoint);
    if (
      breakpointValue > biggestBreakpointValue &&
      windowWidth >= breakpointValue
    ) {
      biggestBreakpointValue = breakpointValue;
      currentBreakpoint = breakpoint;
    }
  }
  return currentBreakpoint;
};

export const hexToRGB = (h: string): string => {
  let r = 0;
  let g = 0;
  let b = 0;
  if (h.length === 4) {
    r = parseInt(`0x${h[1]}${h[1]}`);
    g = parseInt(`0x${h[2]}${h[2]}`);
    b = parseInt(`0x${h[3]}${h[3]}`);
  } else if (h.length === 7) {
    r = parseInt(`0x${h[1]}${h[2]}`);
    g = parseInt(`0x${h[3]}${h[4]}`);
    b = parseInt(`0x${h[5]}${h[6]}`);
  }
  return `${+r},${+g},${+b}`;
};

export const formatValue = (value: number): string =>
  Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 3,
    notation: "compact",
  }).format(value);

export const formatThousands = (value: number): string =>
  Intl.NumberFormat("en-US", {
    maximumSignificantDigits: 3,
    notation: "compact",
  }).format(value);

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // For CORS issues
    image.src = url;
  });
