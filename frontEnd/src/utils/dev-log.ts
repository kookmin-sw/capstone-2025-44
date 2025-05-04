// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-redundant-type-constituents
export function devLog(...message: any | any[]) {
  const isDev = process.env.NODE_ENV === "development";
  return isDev ? console.log(...(message as string[])) : null;
}
