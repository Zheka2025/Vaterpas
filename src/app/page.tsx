import { HeroSection } from '@/components/sections/HeroSection';
import { PromotionsSection } from '@/components/sections/PromotionsSection';
import { SocialMediaSection } from '@/components/sections/SocialMediaSection';
import { LocationSection } from '@/components/sections/LocationSection';
import { getPromotionalProducts } from '@/lib/data';
import { unstable_noStore as noStore } from 'next/cache';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  noStore();
  const promotionalProductsData = await getPromotionalProducts();
  
  const promotionalProducts = JSON.parse(JSON.stringify(promotionalProductsData));

  return (
    <>
        <HeroSection />
        <PromotionsSection promotionalProducts={promotionalProducts} />
        <SocialMediaSection />
        <LocationSection />
    </>
  );
}
