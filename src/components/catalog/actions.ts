'use server';

import { searchProducts as searchProductsData } from '@/lib/data';

export async function searchProducts(query: string) {
    const products = await searchProductsData(query);
    // Серіалізуємо дані тут, щоб уникнути проблем на клієнті
    return JSON.parse(JSON.stringify(products));
}
