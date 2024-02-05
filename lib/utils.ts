import { clsx, type ClassValue } from "clsx";
import { formatDistanceToNowStrict } from "date-fns";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatMoney = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
};

export const relativeDate = (from: Date) => {
  return formatDistanceToNowStrict(from, { addSuffix: true });
};
