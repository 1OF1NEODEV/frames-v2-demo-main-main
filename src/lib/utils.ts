import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateAddress(address: string, startLength = 6, endLength = 4) {
  if (!address) return '';
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
} 