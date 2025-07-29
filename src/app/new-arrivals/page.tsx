import { ProductCard } from '@/components/shared/ProductCard';
import { AdBannerSection } from '@/components/sections/AdBannerSection';
import { getNewArrivals, getCategories } from '@/lib/data';
import { CatalogLayout } from '@/components/catalog/CatalogLayout';

// This forces the page to be dynamically rendered
export const dynamic = 'force-dynamic';


export default async function NewArrivalsPage() {
  const [productsData, categoriesData] = await Promise.all([
      getNewArrivals(),
      getCategories()
  ]);

  const products = JSON.parse(JSON.stringify(productsData));
  const categories = JSON.parse(JSON.stringify(categoriesData));

  return (
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
  );
}
