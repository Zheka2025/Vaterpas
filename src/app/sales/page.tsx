
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/shared/ProductCard';
import { AdBannerSection } from '@/components/sections/AdBannerSection';
import { getPromotionalProducts, getCategories, type PromotionalProduct, type Category } from '@/lib/api';
import { CatalogLayout } from '@/components/catalog/CatalogLayout';

export default async function SalesPage() {
    let promotionalProducts: PromotionalProduct[] = [];
    let categories: Category[] = [];

    try {
        const [promotionsResult, categoriesResult] = await Promise.allSettled([
            getPromotionalProducts(),
            getCategories()
        ]);

        if (promotionsResult.status === 'fulfilled') {
            promotionalProducts = promotionsResult.value;
        } else {
            console.error("Failed to fetch promotional products for sales:", promotionsResult.reason);
        }

        if (categoriesResult.status === 'fulfilled') {
            categories = categoriesResult.value;
        } else {
            console.error("Failed to fetch categories for sales:", categoriesResult.reason);
        }
    } catch (error) {
        console.error("An unexpected error occurred while fetching sales data.", error);
    }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
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
      <Footer />
    </div>
  );
}
