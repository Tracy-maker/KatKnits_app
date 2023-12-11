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
  const secondsDifference = timeDifference / 1000;

  if (secondsDifference < 60) {
    return `${Math.floor(secondsDifference)} seconds ago`;

}else if (secondsDifference<3600){
  const minutes = Math.floor(secondsDifference /60);
  return `$(minutes) ${minutes===1 ? 'minute':'minutes'}} minutes ago`;
}