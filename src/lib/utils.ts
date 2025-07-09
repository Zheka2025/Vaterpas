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
    
    // This logic handles both "image.jpg" and "/public/images/image.jpg" from the DB
    // and returns the correct public URL.
    const filename = path.split('/').pop();

    if (!filename) {
        return 'https://placehold.co/400x400.png';
    }

    return `${SITE_URL}/images/${filename}`;
}
