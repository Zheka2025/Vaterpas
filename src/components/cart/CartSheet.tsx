'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { X, Trash2, Phone } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export function CartSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { cartItems, removeFromCart, clearCart, itemCount } = useCart();
  const { toast } = useToast();
  const [dialogStep, setDialogStep] = useState<'confirm' | 'showPhone'>('confirm');
  const [isCopied, setIsCopied] = useState(false);

  const phoneNumber = '+38 (012) 345-67-89';

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(phoneNumber.replace(/[^\d+]/g, ''));
    toast({
      title: "Номер скопійовано",
    });
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: 'Кошик очищено',
    });
  };
  
  const handleClearAndClose = () => {
    clearCart();
    onOpenChange(false);
    toast({
      title: 'Кошик очищено',
    });
  }

  const handleOrderDone = () => {
    onOpenChange(false); // Close cart sheet
    clearCart();
    toast({
      title: "Дякуємо за замовлення!",
      description: "Ваш кошик було очищено.",
    });
  };

  const handleDialogStateChange = (isOpen: boolean) => {
    if (!isOpen) {
      // Use a timeout to avoid seeing the content switch before the dialog closes
      setTimeout(() => {
        setDialogStep('confirm');
        setIsCopied(false);
      }, 150);
    }
  };

  const formatPrice = (price: number) => `${price.toFixed(2)} грн`;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6 flex flex-row justify-between items-center">
          <SheetTitle>Кошик ({itemCount})</SheetTitle>
          {itemCount > 0 && (
            <Button variant="outline" size="icon" onClick={handleClearCart} aria-label="Очистити кошик">
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Очистити кошик</span>
            </Button>
          )}
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <ScrollArea className="flex-1">
              <div className="px-6 py-4 flex flex-col gap-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <Link href={`/product/${item.uuid}`} onClick={() => onOpenChange(false)}>
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
                      <Link href={`/product/${item.uuid}`} onClick={() => onOpenChange(false)}>
                        <p className="font-semibold line-clamp-2 hover:underline">{item.name}</p>
                      </Link>
                      {item.oldPrice ? (
                        <div className="flex items-baseline gap-2 text-sm">
                           <p className="font-bold text-primary">{formatPrice(item.price)}</p>
                           <p className="text-muted-foreground line-through">{formatPrice(item.oldPrice)}</p>
                        </div>
                      ) : (
                        <p className="text-sm font-bold text-primary">{formatPrice(item.price)}</p>
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
              <AlertDialog onOpenChange={handleDialogStateChange}>
                <AlertDialogTrigger asChild>
                  <Button className="w-full">Зробити замовлення</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  {dialogStep === 'confirm' ? (
                    <>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Підтвердження замовлення</AlertDialogTitle>
                        <AlertDialogDescription>
                          Ваше замовлення буде оформлено по телефону. Ви бажаєте продовжити чи очистити кошик?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Скасувати</AlertDialogCancel>
                        <Button variant="destructive" onClick={handleClearAndClose}>Очистити кошик</Button>
                        <AlertDialogAction onClick={() => setDialogStep('showPhone')}>Продовжити</AlertDialogAction>
                      </AlertDialogFooter>
                    </>
                  ) : (
                    <>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-center text-2xl font-bold">Оформлення замовлення</AlertDialogTitle>
                        <AlertDialogDescription className="text-center text-muted-foreground pt-2">
                          Для завершення замовлення, будь ласка, зателефонуйте нашому менеджеру.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <div className="my-6 flex flex-col items-center justify-center gap-4">
                        <div className="flex items-center gap-3 rounded-lg border bg-secondary p-4">
                          <Phone className="h-8 w-8 text-primary" />
                          <a href={`tel:${phoneNumber.replace(/[^\d+]/g, '')}`} className="text-3xl font-extrabold tracking-wider text-primary hover:underline">
                            {phoneNumber}
                          </a>
                        </div>
                        <Button onClick={handleCopyToClipboard} variant="outline" disabled={isCopied}>
                          {isCopied ? 'Скопійовано!' : 'Скопіювати номер'}
                        </Button>
                      </div>
                      <div className="text-center text-sm text-muted-foreground">
                          <p className="font-bold">Графік роботи:</p>
                          <p>Пн-Пт: 8:00-19:00, Сб: 9:00-17:00</p>
                      </div>
                      <AlertDialogFooter className="mt-4">
                        <AlertDialogAction onClick={handleOrderDone} className="w-full">Добре, я зателефоную</AlertDialogAction>
                      </AlertDialogFooter>
                    </>
                  )}
                </AlertDialogContent>
              </AlertDialog>
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
