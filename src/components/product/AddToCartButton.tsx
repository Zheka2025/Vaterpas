'use client';

import { useCart, type CartItem } from '@/context/CartContext';
import { getImageUrl } from '@/lib/utils';
import type { Product } from '@/lib/entities';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

export function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const activePromotion = product.promotions?.find(p => p.isActive);
    const item: CartItem = {
      id: product.id,
      uuid: product.uuid,
      name: product.name,
      price: activePromotion ? Number(activePromotion.discountPrice) : Number(product.price),
      oldPrice: activePromotion ? Number(product.price) : undefined,
      imageUrl: getImageUrl(activePromotion?.imageUrl || product.imageUrl),
    };
    addToCart(item);
  };

  return (
    <Button size="lg" onClick={handleAddToCart} className="w-full md:w-auto">
      <ShoppingCart className="mr-2 h-5 w-5" />
      Додати в кошик
    </Button>
  );
}
