
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export function ShowMoreCard() {
  return (
    <Link href="/catalog" className="group flex h-full">
      <Card className="w-full overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full rounded-lg border-2 border-dashed border-muted-foreground/50 hover:border-primary items-center justify-center bg-secondary/50 hover:bg-secondary">
        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <h3 className="text-base font-bold font-headline mb-2 text-primary">Переглянути всі</h3>
            <ArrowRight className="h-8 w-8 text-primary transform group-hover:translate-x-1 transition-transform duration-300" />
        </CardContent>
      </Card>
    </Link>
  );
}
