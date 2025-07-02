
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  icon: LucideIcon;
  name: string;
  href: string;
}

export function CategoryCard({ icon: Icon, name, href }: CategoryCardProps) {
  return (
    <Link href={href} className="group block h-full">
      <Card className="flex flex-col items-center justify-center p-6 text-center h-full transition-all duration-300 hover:bg-primary hover:text-primary-foreground shadow-md hover:shadow-xl hover:-translate-y-1">
        <Icon className="h-12 w-12 mb-4 text-primary transition-colors group-hover:text-primary-foreground" />
        <h3 className="text-lg font-bold font-headline">{name}</h3>
      </Card>
    </Link>
  );
}
