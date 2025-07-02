
"use client";

import Link from 'next/link';
import { Menu, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import * as React from 'react';
import { Cart } from '@/components/cart/Cart';

const navLinks = [
  { href: '/', label: 'Головна' },
  { href: '/catalog', label: 'Каталог' },
  { href: '/#contact', label: 'Контакти' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="Ватерпас - На головну">
          <Store className="h-8 w-8 text-primary" />
          <span className="font-extrabold text-2xl font-headline tracking-tight">Ватерпас</span>
        </Link>

        {/* Right side container for nav and actions */}
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
              <Cart />
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" aria-label="Відкрити меню">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] sm:w-[400px] flex flex-col p-0">
                     <div className="p-4 border-b">
                       <SheetClose asChild>
                         <Link href="/" className="flex items-center gap-2" aria-label="Ватерпас - На головну">
                          <Store className="h-7 w-7 text-primary" />
                          <span className="font-bold text-lg font-headline">Ватерпас</span>
                        </Link>
                       </SheetClose>
                    </div>
                    <nav className="flex flex-col gap-4 p-4 flex-grow overflow-y-auto">
                      {navLinks.map((item) => (
                        <SheetClose key={item.label} asChild>
                          <Link
                            href={item.href}
                            className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                          >
                            {item.label}
                          </Link>
                        </SheetClose>
                      ))}
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>
          </div>
        </div>
      </div>
    </header>
  );
}
