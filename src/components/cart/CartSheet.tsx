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
  const [isCopied, setIsCopied] = useState(false);
  const [showClearCartConfirmation, setShowClearCartConfirmation] = useState(false);

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

  const handleTriggerConfirmation = () => {
    setShowClearCartConfirmation(true);
  };

  const handleConfirmClearCart = () => {
    clearCart();
    onOpenChange(false);
    toast({
      title: "Дякуємо за замовлення!",
      description: "Ваш кошик було очищено.",
    });
    setShowClearCartConfirmation(false);
  };

  const handleDeclineClearCart = () => {
    onOpenChange(false);
    toast({
      title: "Дякуємо за замовлення!",
      description: "Товари залишаються у вашому кошику.",
    });
    setShowClearCartConfirmation(false);
  };


  const formatPrice = (price: number) => `${price.toFixed(2)} грн`;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6 flex flex-row justify-between items-center">
          <SheetTitle>Кошик ({itemCount})</SheetTitle>
          {itemCount > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Очистити кошик">
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Очистити кошик</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Ви впевнені?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Ця дія видалить усі товари з вашого кошика.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Скасувати</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearCart}>Так, очистити</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
              <AlertDialog
                onOpenChange={(isOpen) => {
                  if (!isOpen) {
                    setIsCopied(false);
                    setShowClearCartConfirmation(false);
                  }
                }}
              >
                <AlertDialogTrigger asChild>
                  <Button className="w-full">Зробити замовлення</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  {showClearCartConfirmation ? (
                    <>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-center text-xl font-bold">Очистити кошик?</AlertDialogTitle>
                        <AlertDialogDescription className="text-center text-muted-foreground pt-2">
                          Ваше замовлення прийнято. Бажаєте очистити кошик, чи залишити товари для наступного разу?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="mt-6 sm:justify-center flex-col-reverse sm:flex-row gap-2 w-full">
                         <Button onClick={handleDeclineClearCart} variant="outline" className="w-full">Ні, залишити</Button>
                         <Button onClick={handleConfirmClearCart} className="w-full">Так, очистити</Button>
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
                      <AlertDialogFooter className="mt-4 sm:justify-center">
                        <AlertDialogCancel>Назад до кошика</AlertDialogCancel>
                        <Button onClick={handleTriggerConfirmation}>Я зателефоную, завершити</Button>
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
