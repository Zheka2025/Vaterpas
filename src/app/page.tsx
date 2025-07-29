import { AdBannerSection } from '@/components/sections/AdBannerSection';
import { PromotionsSection } from '@/components/sections/PromotionsSection';
import { SocialMediaSection } from '@/components/sections/SocialMediaSection';
import { LocationSection } from '@/components/sections/LocationSection';
import { getPromotionalProducts, getBanners } from '@/lib/data';
import { unstable_noStore as noStore } from 'next/cache';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  noStore();
  const [promotionalProductsData, bannersData] = await Promise.all([
    getPromotionalProducts(),
    getBanners()
  ]);
  
  const promotionalProducts = JSON.parse(JSON.stringify(promotionalProductsData));
  const banners = JSON.parse(JSON.stringify(bannersData));

  return (
    <>
        <AdBannerSection isHomePage={true} initialBanners={banners} />
        <PromotionsSection promotionalProducts={promotionalProducts} />
        <SocialMediaSection />
        <LocationSection />
    </>
  );
}
