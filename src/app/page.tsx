import { HeroSection } from '@/components/sections/HeroSection';
import { PromotionsSection } from '@/components/sections/PromotionsSection';
import { SocialMediaSection } from '@/components/sections/SocialMediaSection';
import { LocationSection } from '@/components/sections/LocationSection';
import { getPromotionalProducts } from '@/lib/data';
import type { PromotionalProduct } from '@/lib/entities';

export default async function HomePage() {
  const promotionalProducts = await getPromotionalProducts();

  return (
    <>
        <HeroSection />
        <PromotionsSection promotionalProducts={promotionalProducts} />
        <SocialMediaSection />
        <LocationSection />
    </>
  );
}
