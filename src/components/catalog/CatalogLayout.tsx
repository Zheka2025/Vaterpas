
"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, List, ChevronRight, Construction, Hammer, ShowerHead, Home, Paintbrush } from "lucide-react";
import { ProductPageNav } from '@/components/shared/ProductPageNav';
import type { Category } from '@/lib/entities';

const categoryIcons: { [key: string]: React.ElementType } = {
  "Будівельні матеріали": Construction,
  "Інструменти": Hammer,
  "Сантехніка та Опалення": ShowerHead,
  "Оздоблювальні матеріали": Paintbrush,
  "Господарські товари": Home,
};

export function CatalogLayout({ categories, children }: { categories: Category[], children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 my-8 items-center">
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
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Пошук товарів..."
            className="pl-12 w-full"
          />
        </div>
      </div>

      <ProductPageNav />

      {children}
    </>
  );
}
