import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Detect video URLs (Cloudinary video delivery or common extensions). */
export function isVideoUrl(url: string) {
  return (
    /\.(mp4|webm|mov|m4v)(\?|$)/i.test(url) ||
    url.includes("/video/upload/")
  );
}

