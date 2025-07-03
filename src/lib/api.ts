
// Type Definitions for API responses
export interface Category {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  parent: Category | null;
  children: Category[];
  createdAt: string;
  updatedAt: string;
}

export interface Brand {
  id: number;
  name:string;
  description: string | null;
  logoUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  uuid: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  isNew: boolean;
  imageUrl: string;
  attributes: Record<string, any>;
  category: Category;
  brand: Brand;
  promotions: PromotionalProduct[];
  createdAt: string;
  updatedAt: string;
}

export interface PromotionalProduct {
  id: number;
  uuid: string;
  product: Product;
  discountPrice: number;
  isActive: boolean;
  imageUrl: string;
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
}

// Per user instruction, all API requests must go to this specific URL.
const API_BASE_URL = 'https://test.vaterpas.com/api';

const SITE_URL = 'https://test.vaterpas.com';

async function fetcher<T>(url: string, options: RequestInit = {}): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}${url}`, { 
        ...options,
        next: { revalidate: 60 }, // Revalidate data every 60 seconds
    });

    if (!res.ok) {
      console.error(`API fetch error for ${url}: ${res.status} ${res.statusText}`);
      const errorBody = await res.text();
      console.error("Error body:", errorBody);
      throw new Error(`Failed to fetch data from ${url}. Status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error(`Network or other error fetching ${url}:`, error);
    throw error;
  }
}

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


export async function getProducts(): Promise<Product[]> {
  return fetcher<Product[]>('/products');
}

export async function getProductByUuid(uuid: string): Promise<Product> {
  return fetcher<Product>(`/products/${uuid}`);
}

export async function getNewArrivals(): Promise<Product[]> {
  return fetcher<Product[]>('/products/new-arrivals');
}

export async function getPromotionalProducts(): Promise<PromotionalProduct[]> {
  return fetcher<PromotionalProduct[]>('/promotional-products');
}

export async function getCategories(): Promise<Category[]> {
  return fetcher<Category[]>('/categories');
}
