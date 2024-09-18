import { twMerge } from "tailwind-merge";

export const getClass = <T>(...classNames: T[]) =>
  twMerge(...(classNames.filter((className) => !!className) as string[]));
