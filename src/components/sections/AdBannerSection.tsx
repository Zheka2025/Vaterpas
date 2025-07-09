
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { getImageUrl } from '@/lib/utils';

export function AdBannerSection() {
  return (
    <Card className="mb-8 w-full overflow-hidden rounded-xl shadow-lg relative text-white">
      <Image
        src={getImageUrl('ad-banner.png')}
        alt="Рекламний банер інструментів"
        width={800}
        height={250}
        className="w-full h-auto object-cover"
        data-ai-hint="power tools collection"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20 p-8 flex flex-col justify-center">
        <h3 className="text-3xl font-extrabold font-headline mb-2 drop-shadow-md">Сезонний розпродаж інструментів!</h3>
        <p className="text-lg max-w-md mb-4 drop-shadow-sm">Знижки до -40% на електроінструменти Bosch та Makita. Готуйся до ремонту вигідно!</p>
        <Button asChild variant="secondary" className="w-fit font-bold group">
          <Link href="/promotions">
            До акції <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}
