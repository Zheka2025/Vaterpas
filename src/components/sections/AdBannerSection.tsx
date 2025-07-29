
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { getImageUrl } from '@/lib/utils';
import { getBanners } from '@/lib/data';
import { unstable_noStore as noStore } from 'next/cache';

interface AdBannerSectionProps {
  isHomePage?: boolean;
}

export async function AdBannerSection({ isHomePage = false }: AdBannerSectionProps) {
  noStore();
  const banners = await getBanners();
  const banner = banners.length > 0 ? banners[0] : null;

  const FallbackBanner = () => (
     <div className="w-full h-full">
        <div className={`aspect-[2/1] md:aspect-[3/1] lg:aspect-[4/1] relative w-full h-full ${isHomePage ? 'min-h-[400px]' : ''}`}>
            <Image
                src={getImageUrl('default-banner.png')}
                alt="Магазин будівельних матеріалів Ватерпас"
                fill
                className="object-cover"
                data-ai-hint="store facade"
                priority={isHomePage}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/10 p-4 sm:p-8 flex flex-col justify-center items-start text-white">
                <div className="max-w-md">
                    <h3 className="text-2xl sm:text-4xl font-extrabold font-headline mb-2 drop-shadow-md">Магазин "Ватерпас"</h3>
                    <p className="text-base sm:text-xl mb-4 drop-shadow-sm">Все для будівництва та ремонту у вашому місті.</p>
                    <Button asChild variant="secondary" className="w-fit font-bold group text-sm sm:text-base">
                        <Link href="/catalog">
                            До каталогу <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    </div>
  );

  return (
    <Card className="mb-8 w-full overflow-hidden rounded-xl shadow-lg relative text-white">
       {banner ? (
         <Link href={`/banner/${banner.uuid}`} className="block w-full h-full">
            <div className={`aspect-[2/1] md:aspect-[3/1] lg:aspect-[4/1] relative w-full h-full ${isHomePage ? 'min-h-[400px]' : ''}`}>
                <Image
                    src={getImageUrl(banner.imageUrl)}
                    alt={banner.title}
                    fill
                    className="object-cover"
                    data-ai-hint="promotional banner"
                    priority={isHomePage}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/10 p-4 sm:p-8 flex flex-col justify-center items-start">
                    <div className="max-w-md">
                        <h3 className="text-2xl sm:text-4xl font-extrabold font-headline mb-2 drop-shadow-md">{banner.title}</h3>
                        <p className="text-base sm:text-xl mb-4 drop-shadow-sm">{banner.description}</p>
                        <Button asChild variant="secondary" className="w-fit font-bold group text-sm sm:text-base">
                            <span>
                                {banner.buttonText} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </Link>
       ) : (
        <FallbackBanner />
       )}
    </Card>
  );
}
