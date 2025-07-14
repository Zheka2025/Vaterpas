import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getImageUrl(path: string | null | undefined): string {
    if (!path || path.trim() === '') {
        // Fallback to a placeholder if no path is provided
        return 'https://placehold.co/400x400.png';
    }
    
    // This logic handles both "image.jpg" and "/public/images/image.jpg" from the DB
    // and returns the correct public URL path.
    const filename = path.split('/').pop();

    if (!filename) {
        // Fallback if the path is something weird like a trailing slash
        return 'https://placehold.co/400x400.png';
    }

    // Returns a root-relative path that Next.js can serve from the `public` directory
    return `/images/${filename}`;
}
