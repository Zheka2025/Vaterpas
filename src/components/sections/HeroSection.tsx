
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative flex items-center justify-center h-[calc(100vh-5rem)] min-h-[500px] text-center text-white py-0">
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Інструменти та будівельні матеріали"
        fill
        className="object-cover z-0"
        quality={80}
        data-ai-hint="hardware store interior"
        priority
      />
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      <div className="relative z-20 p-6 flex flex-col items-center">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-headline mb-6 drop-shadow-2xl">
          Все для будівництва та ремонту!
        </h1>
        <p className="text-xl sm:text-2xl mb-10 max-w-3xl drop-shadow-xl">
          Найкращі будівельні матеріали та інструменти у Ватерпас.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-4 text-lg font-bold">
            <Link href="/catalog">Перейти до каталогу</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-2 border-accent text-white hover:bg-accent/20 bg-transparent px-10 py-4 text-lg font-bold">
            <Link href="/promotions">Акційні товари</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
