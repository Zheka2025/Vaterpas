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
    
    const baseUrl = 'https://vaterpas.blob.core.windows.net/product-images/';
    // This handles cases where the path might already be a full URL
    // or just a filename.
    if (path.startsWith('http')) {
        return path;
    }
    
    return `${baseUrl}${path}`;
}
