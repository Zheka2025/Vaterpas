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
    // This logic now strictly enforces that only a filename is stored in the DB.
    // It constructs the full path on the fly.
    return `${SITE_URL}/public/images/${path}`;
}
