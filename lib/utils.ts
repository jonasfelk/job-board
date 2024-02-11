import { clsx, type ClassValue } from "clsx";
import { formatDistanceToNowStrict } from "date-fns";
import { twMerge } from "tailwind-merge";
import { UserResource } from "@clerk/types";
import { User } from "@clerk/nextjs/server";
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

export const toSlug = (str: string) => {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

export const isAdmin = (user: User | UserResource) => {
  return user.publicMetadata.role === "admin";
};
