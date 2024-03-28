import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const apiPrefix =
	process.env.NODE_ENV !== "production"
		? "http://127.0.0.1:3001/api"
		: "https://api.muggle.link/api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
