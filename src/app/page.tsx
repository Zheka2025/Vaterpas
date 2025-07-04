import { HeroSection } from '@/components/sections/HeroSection';
import { PromotionsSection } from '@/components/sections/PromotionsSection';
import { SocialMediaSection } from '@/components/sections/SocialMediaSection';
import { LocationSection } from '@/components/sections/LocationSection';
import { getPromotionalProducts } from '@/lib/data';
import type { PromotionalProduct } from '@/lib/entities';

export default async function HomePage() {
  let promotionalProducts: PromotionalProduct[] = [];

  try {
    promotionalProducts = await getPromotionalProducts();
  } catch (error) {
    console.error("Failed to fetch promotional products. The promotions section will be empty.", error);
  }

  return (
    <>
        <HeroSection />
        <PromotionsSection promotionalProducts={promotionalProducts} />
        <SocialMediaSection />
        <LocationSection />
    </>
  );
}
