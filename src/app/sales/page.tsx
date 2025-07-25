import { ProductCard } from '@/components/shared/ProductCard';
import { AdBannerSection } from '@/components/sections/AdBannerSection';
import { getPromotionalProducts, getCategories } from '@/lib/data';
import { CatalogLayout } from '@/components/catalog/CatalogLayout';

export default async function SalesPage() {
    const [promotionalProductsData, categoriesData] = await Promise.all([
        getPromotionalProducts(),
        getCategories()
    ]);

    const promotionalProducts = JSON.parse(JSON.stringify(promotionalProductsData));
    const categories = JSON.parse(JSON.stringify(categoriesData));

  return (
    <main className="container flex-grow py-8">
      <AdBannerSection />
      
      <CatalogLayout categories={categories}>
          <div>
              <h2 className="text-3xl font-extrabold font-headline mb-6">Розпродаж</h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
                {promotionalProducts.map((promo) => {
                    const productWithPromo = {
                        ...promo.product,
                        promotions: [promo]
                    };
                    return (
                        <ProductCard 
                            key={promo.id}
                            product={productWithPromo}
                            dataAiHint="sale product"
                        />
                    );
                })}
              </div>
          </div>
      </CatalogLayout>
    </main>
  );
}
