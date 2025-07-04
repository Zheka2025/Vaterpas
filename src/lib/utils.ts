import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const SITE_URL = 'https://test.vaterpas.com';

export function getImageUrl(path: string | null | undefined): string {
    if (!path || path.trim() === '') {
        return 'https://placehold.co/400x400.png';
    }
    if (path.startsWith('http')) {
      return path;
    }
    if (path.startsWith('/')) {
        return `${SITE_URL}${path}`;
    }
    return `${SITE_URL}/public/images/${path}`;
}
