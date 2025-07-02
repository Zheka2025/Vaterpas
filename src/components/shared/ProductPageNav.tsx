
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '/catalog', label: 'Усі товари' },
  { href: '/new-arrivals', label: 'Новинки' },
  { href: '/promotions', label: 'Акції' },
  { href: '/sales', label: 'Розпродаж' },
];

export function ProductPageNav() {
  const pathname = usePathname();

  return (
    <div className="flex justify-center flex-wrap gap-2 my-6">
      {navLinks.map((link) => (
        <Button
          key={link.href}
          asChild
          variant={pathname === link.href ? 'default' : 'outline'}
          className="font-bold"
        >
          <Link href={link.href}>{link.label}</Link>
        </Button>
      ))}
    </div>
  );
}
