import { ProductCard } from '@/components/shared/ProductCard';
import { AdBannerSection } from '@/components/sections/AdBannerSection';
import { getNewArrivals, getCategories, getBanners } from '@/lib/data';
import { CatalogLayout } from '@/components/catalog/CatalogLayout';
import { unstable_noStore as noStore } from 'next/cache';

// This forces the page to be dynamically rendered
export const dynamic = 'force-dynamic';


export default async function NewArrivalsPage() {
  noStore();
  const [productsData, categoriesData, bannersData] = await Promise.all([
      getNewArrivals(),
      getCategories(),
      getBanners()
  ]);

  const products = JSON.parse(JSON.stringify(productsData));
  const categories = JSON.parse(JSON.stringify(categoriesData));
  const banners = JSON.parse(JSON.stringify(bannersData));

  return (
    <main className="container flex-grow py-8">
      <AdBannerSection initialBanners={banners} />
      
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
