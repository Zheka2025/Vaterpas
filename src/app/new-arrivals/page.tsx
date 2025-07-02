
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/shared/ProductCard';
import { AdBannerSection } from '@/components/sections/AdBannerSection';
import { getNewArrivals, getCategories, type Product, type Category } from '@/lib/api';
import { CatalogLayout } from '@/components/catalog/CatalogLayout';

export default async function NewArrivalsPage() {
  let products: Product[] = [];
  let categories: Category[] = [];

  try {
      const [productsResult, categoriesResult] = await Promise.allSettled([
          getNewArrivals(),
          getCategories()
      ]);

      if (productsResult.status === 'fulfilled') {
          products = productsResult.value;
      } else {
          console.error("Failed to fetch new arrivals:", productsResult.reason);
      }

      if (categoriesResult.status === 'fulfilled') {
          categories = categoriesResult.value;
      } else {
          console.error("Failed to fetch categories:", categoriesResult.reason);
      }
  } catch (error) {
      console.error("An unexpected error occurred while fetching new arrivals data.", error);
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="container flex-grow py-8">
        <AdBannerSection />
        
        <CatalogLayout categories={categories}>
            <div>
                <h2 className="text-3xl font-extrabold font-headline mb-6">Новинки</h2>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
                  {products.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product}
                      dataAiHint="new product"
                    />
                  ))}
                </div>
            </div>
        </CatalogLayout>
      </main>
      <Footer />
    </div>
  );
}
