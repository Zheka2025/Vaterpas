
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { getImageUrl } from '@/lib/utils';
import { getBanners } from '@/lib/data';

export async function AdBannerSection() {
  const banners = await getBanners();

  // Показуємо тільки один, найновіший активний банер
  const banner = banners.length > 0 ? banners[0] : null;

  if (!banner) {
    // Якщо банерів немає, нічого не показуємо
    return null;
  }

  return (
    <Card className="mb-8 w-full overflow-hidden rounded-xl shadow-lg relative text-white">
        <Link href={`/banner/${banner.uuid}`} className="block w-full h-full">
            <div className="aspect-[2/1] md:aspect-[3/1] lg:aspect-[4/1] relative w-full h-full">
                <Image
                    src={getImageUrl(banner.imageUrl)}
                    alt={banner.title}
                    fill
                    className="object-cover"
                    data-ai-hint="promotional banner"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/10 p-4 sm:p-8 flex flex-col justify-center items-start">
                    <div className="max-w-md">
                        <h3 className="text-xl sm:text-3xl font-extrabold font-headline mb-2 drop-shadow-md">{banner.title}</h3>
                        <p className="text-sm sm:text-lg mb-4 drop-shadow-sm">{banner.description}</p>
                        <Button asChild variant="secondary" className="w-fit font-bold group text-xs sm:text-sm">
                            <span >
                                {banner.buttonText} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </Link>
    </Card>
  );
}
