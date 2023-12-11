import { type ClassValue, clsx } from "clsx";
import { time } from "console";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString) {
  const currentDate = new Date();
  const inputDate = new Date(dateString);
  const timeDifference = currentDate - inputDate;
  const secoundsDifference = timeDifference / 1000;
}
