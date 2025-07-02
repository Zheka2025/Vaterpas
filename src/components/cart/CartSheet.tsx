'use client';

import Image from 'next/image';
import { X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';

export function CartSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { cartItems, removeFromCart, itemCount } = useCart();
  const { toast } = useToast();

  const handleOrder = () => {
    toast({
      title: "Замовлення оформлюється по телефону",
      description: "Будь ласка, зв'яжіться з нами за номером: +38 (012) 345-67-89",
      duration: 5000,
    });
    onOpenChange(false);
  };

  const formatPrice = (price: number) => `${price.toFixed(2)} грн`;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle>Кошик ({itemCount})</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <ScrollArea className="flex-1">
              <div className="px-6 py-4 flex flex-col gap-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <Link href={`/product/${item.uuid}`}>
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="rounded-md object-cover aspect-square border"
                          data-ai-hint="product"
                        />
                    </Link>
                    <div className="flex-1">
                      <Link href={`/product/${item.uuid}`}>
                        <p className="font-semibold line-clamp-2 hover:underline">{item.name}</p>
                      </Link>
                      {item.oldPrice ? (
                        <div className="flex items-baseline gap-2 text-sm">
                           <p className="font-bold text-primary">{formatPrice(item.price)}</p>
                           <p className="text-muted-foreground line-through">{formatPrice(item.oldPrice)}</p>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">Ціна за запитом</p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 mt-1"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Видалити</span>
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <SheetFooter className="px-6 py-4 mt-auto border-t">
              <Button className="w-full" onClick={handleOrder}>
                Зробити замовлення
              </Button>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-muted-foreground">Ваш кошик порожній</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
