
"use client";
import * as React from 'react';
import { ProductCard } from '@/components/shared/ProductCard';
import { ShowMoreCard } from '@/components/shared/ShowMoreCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { PromotionalProduct } from '@/lib/api';
import { Skeleton } from '../ui/skeleton';

type ShowMore = { id: 'show-more' };

interface PromotionsSectionProps {
    promotionalProducts: PromotionalProduct[];
}

export function PromotionsSection({ promotionalProducts }: PromotionsSectionProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(4);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (promotionalProducts) {
      setLoading(false);
    }
  }, [promotionalProducts]);

  React.useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(3);
      } else {
        setItemsPerPage(4);
      }
    };
    
    window.addEventListener('resize', updateItemsPerPage);
    updateItemsPerPage();
    
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const allItems: (PromotionalProduct | ShowMore)[] = [
    ...promotionalProducts,
    { id: 'show-more' }
  ];

  const totalPages = Math.ceil(allItems.length / itemsPerPage);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
  };

  const startIndex = currentIndex * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = allItems.slice(startIndex, endIndex);

  return (
    <section id="promotions" className="bg-secondary">
      <div className="container">
        <div className="flex justify-between items-baseline mb-8">
            <h2 className="text-4xl font-extrabold font-headline">
              Гарячі Пропозиції
            </h2>
            <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={handlePrev} aria-label="Попередня сторінка" disabled={totalPages <= 1}>
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleNext} aria-label="Наступна сторінка" disabled={totalPages <= 1}>
                    <ChevronRight className="h-6 w-6" />
                </Button>
            </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {loading ? (
                Array.from({length: 4}).map((_, index) => (
                    <div key={index} className="flex flex-col space-y-3">
                        <Skeleton className="h-[150px] w-full rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[150px]" />
                            <Skeleton className="h-4 w-[100px]" />
                        </div>
                    </div>
                ))
            ) : (
                displayedItems.map((item) => (
                  <div key={String(item.id)}>
                    {item.id === 'show-more' ? (
                      <ShowMoreCard />
                    ) : (
                      <ProductCard 
                        product={{... (item as PromotionalProduct).product, promotions: [item as PromotionalProduct]}} 
                        dataAiHint="promotional product"
                      />
                    )}
                  </div>
                ))
            )}
        </div>
      </div>
    </section>
  );
}
