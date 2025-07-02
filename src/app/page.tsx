
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { PromotionsSection } from '@/components/sections/PromotionsSection';
import { SocialMediaSection } from '@/components/sections/SocialMediaSection';
import { LocationSection } from '@/components/sections/LocationSection';
import { getPromotionalProducts, type PromotionalProduct } from '@/lib/api';

export default async function HomePage() {
  let promotionalProducts: PromotionalProduct[] = [];

  try {
    promotionalProducts = await getPromotionalProducts();
  } catch (error) {
    console.error("Failed to fetch promotional products. The promotions section will be empty.", error);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <PromotionsSection promotionalProducts={promotionalProducts} />
        <SocialMediaSection />
        <LocationSection />
      </main>
      <Footer />
    </div>
  );
}
