
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef, useTransition } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, List, ChevronRight, Construction, Hammer, ShowerHead, Home, Paintbrush, Loader2 } from "lucide-react";
import { ProductPageNav } from '@/components/shared/ProductPageNav';
import type { Category, Product } from '@/lib/entities';
import { searchProducts } from '@/components/catalog/actions';
import { getImageUrl } from '@/lib/utils';
import { Card } from '../ui/card';

const categoryIcons: { [key: string]: React.ElementType } = {
  "Будівельні матеріали": Construction,
  "Інструменти": Hammer,
  "Сантехніка та Опалення": ShowerHead,
  "Оздоблювальні матеріали": Paintbrush,
  "Господарські товари": Home,
};

export function CatalogLayout({ categories, children }: { categories: Category[], children: React.ReactNode }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isPending, startTransition] = useTransition();
  const [showResults, setShowResults] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery.length > 1) {
      startTransition(async () => {
        const products = await searchProducts(newQuery);
        setResults(products);
        setShowResults(true);
      });
    } else {
      setResults([]);
      setShowResults(false);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 my-8 items-start">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full md:w-auto flex-shrink-0">
              <List className="mr-2 h-4 w-4" />
              Категорії товарів
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[320px] sm:w-[380px] p-0">
              <div className="p-6 pt-12 h-full overflow-y-auto">
                  <h2 className="text-2xl font-extrabold font-headline mb-6 pl-4">Категорії</h2>
                  <Accordion type="multiple" className="w-full">
                      {categories.map((category) => {
                          const Icon = categoryIcons[category.name as keyof typeof categoryIcons] || Construction;
                          return (
                              <AccordionItem value={category.name} key={category.id}>
                              <AccordionTrigger className="px-4 py-2 text-base font-bold hover:bg-muted/50 transition-colors rounded-md">
                                  <div className="flex items-center gap-3">
                                      <Icon className="h-5 w-5 text-primary" />
                                      <span>{category.name}</span>
                                  </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                  <ul className="pt-2 pb-2 pl-8 space-y-2">
                                  {category.children.map((subCategory) => (
                                      <li key={subCategory.id}>
                                          <SheetClose asChild>
                                              <Link href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group">
                                                  <ChevronRight className="h-4 w-4 text-primary/50 transition-transform group-hover:translate-x-1" />
                                                  <span>{subCategory.name}</span>
                                              </Link>
                                          </SheetClose>
                                      </li>
                                  ))}
                                  </ul>
                              </AccordionContent>
                              </AccordionItem>
                          )
                      })}
                  </Accordion>
              </div>
          </SheetContent>
        </Sheet>
        <div className="relative w-full" ref={searchContainerRef}>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Пошук товарів..."
              className="pl-12 w-full"
              value={query}
              onChange={handleSearch}
              onFocus={() => query.length > 1 && setShowResults(true)}
            />
            {isPending && <Loader2 className="absolute right-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground animate-spin" />}
          </div>

          {showResults && (
            <Card className="absolute top-full mt-2 w-full max-h-96 overflow-y-auto z-50 shadow-lg">
                {results.length > 0 ? (
                  <ul>
                    {results.map((product) => (
                      <li key={product.uuid}>
                        <Link 
                          href={`/product/${product.uuid}`} 
                          className="flex items-center gap-4 p-3 hover:bg-muted transition-colors"
                          onClick={() => setShowResults(false)}
                        >
                          <Image
                             src={getImageUrl(product.imageUrl)}
                             alt={product.name}
                             width={48}
                             height={48}
                             className="rounded-md object-cover aspect-square border"
                             data-ai-hint="product"
                          />
                          <span className="font-medium text-sm">{product.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  !isPending && query.length > 1 && (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                      Нічого не знайдено
                    </div>
                  )
                )}
            </Card>
          )}
        </div>
      </div>

      <ProductPageNav />

      {children}
    </>
  );
}
