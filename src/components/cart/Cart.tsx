'use client';

import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as React from 'react';
import { useCart } from '@/context/CartContext';
import { CartSheet } from '@/components/cart/CartSheet';

export function Cart() {
    const { itemCount } = useCart();
    const [isCartOpen, setIsCartOpen] = React.useState(false);

    return (
        <>
            <Button variant="outline" size="icon" onClick={() => setIsCartOpen(true)} className="relative">
              <ShoppingBag className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {itemCount}
                </span>
              )}
              <span className="sr-only">Кошик</span>
            </Button>
            <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />
        </>
    )
}
