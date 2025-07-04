'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart, type CartItem } from '@/context/CartContext';
import { getImageUrl } from '@/lib/utils';
import type { Product } from '@/lib/entities';

interface ProductCardProps {
  product: Product;
  dataAiHint: string;
}

export function ProductCard({ product, dataAiHint }: ProductCardProps) {
  const { addToCart } = useCart();
  
  const { uuid, name } = product;

  const activePromotion = product.promotions?.find(p => p.isActive);

  const displayPrice = activePromotion ? Number(activePromotion.discountPrice) : Number(product.price);
  const oldPrice = activePromotion ? Number(product.price) : undefined;
  const displayImage = getImageUrl(activePromotion?.imageUrl || product.imageUrl);

  const formattedPrice = `${displayPrice.toFixed(2)} грн`;
  const formattedOldPrice = oldPrice ? `${oldPrice.toFixed(2)} грн` : undefined;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation if card is wrapped in a link at a higher level
    const item: CartItem = { 
      id: product.id, 
      uuid: product.uuid, 
      name: product.name, 
      price: displayPrice, 
      oldPrice: oldPrice, 
      imageUrl: displayImage,
    };
    addToCart(item);
  };

  return (
    <Card className="w-full overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full rounded-lg border hover:border-primary group">
      <CardHeader className="p-0 border-b">
         <Link href={`/product/${uuid}`} className="block aspect-square relative overflow-hidden">
          <Image
            src={displayImage}
            alt={name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={dataAiHint}
          />
          {activePromotion && (
            <Badge variant="destructive" className="absolute top-2 right-2 text-xs px-2 py-1 font-bold">
              АКЦІЯ
            </Badge>
          )}
         </Link>
      </CardHeader>
      <CardContent className="p-2 flex-grow flex flex-col">
        <Link href={`/product/${uuid}`} className="flex-grow">
          <CardTitle className="text-sm font-semibold font-headline mb-1 flex-grow min-h-[40px] line-clamp-2 hover:underline">{name}</CardTitle>
        </Link>
        {activePromotion ? (
            <div className="flex items-baseline gap-1 mt-auto">
              <p className="text-base font-extrabold text-primary">{formattedPrice}</p>
              <p className="text-xs text-muted-foreground line-through">{formattedOldPrice!}</p>
            </div>
          ) : (
            <div className="h-[24px] mt-auto"></div>
          )}
      </CardContent>
      <CardFooter className="p-2 pt-0">
        <Button size="sm" className="w-full font-bold text-xs h-8" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-3 w-3" /> Додати в кошик
        </Button>
      </CardFooter>
    </Card>
  );
}
