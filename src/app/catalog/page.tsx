import { ProductCard } from '@/components/shared/ProductCard';
import { AdBannerSection } from '@/components/sections/AdBannerSection';
import { getProducts, getCategories } from '@/lib/data';
import type { Product, Category } from '@/lib/entities';
import { CatalogLayout } from '@/components/catalog/CatalogLayout';

export default async function CatalogPage() {
    let products: Product[] = [];
    let categories: Category[] = [];

    try {
        const [productsResult, categoriesResult] = await Promise.allSettled([
            getProducts(),
            getCategories()
        ]);

        if (productsResult.status === 'fulfilled') {
            products = productsResult.value;
        } else {
            console.error("Failed to fetch products:", productsResult.reason);
        }

        if (categoriesResult.status === 'fulfilled') {
            categories = categoriesResult.value;
        } else {
            console.error("Failed to fetch categories:", categoriesResult.reason);
        }
    } catch (error) {
        console.error("An unexpected error occurred while fetching catalog data.", error);
    }

  return (
    <main className="container flex-grow py-8">
        <AdBannerSection />
        
        <CatalogLayout categories={categories}>
          <div>
              <h2 className="text-3xl font-extrabold font-headline mb-6">Усі товари</h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
                {products.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product}
                    dataAiHint="product"
                  />
                ))}
              </div>
          </div>
        </CatalogLayout>
    </main>
  );
}
