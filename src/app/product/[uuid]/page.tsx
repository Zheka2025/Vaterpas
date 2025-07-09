import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductByUuid } from '@/lib/data';
import { getImageUrl } from '@/lib/utils';
import type { Product } from '@/lib/entities';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronsRight, Phone } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { AddToCartButton } from '@/components/product/AddToCartButton';
import { Card, CardContent } from '@/components/ui/card';


export async function generateMetadata({ params }: { params: { uuid: string } }) {
    try {
        const product = await getProductByUuid(params.uuid);
        return {
            title: `${product.name} | Ватерпас`,
            description: product.description.substring(0, 160),
        };
    } catch (error) {
        return {
            title: "Товар не знайдено | Ватерпас"
        }
    }
}

export default async function ProductPage({ params }: { params: { uuid: string } }) {
    let productData: Product;
    try {
        productData = await getProductByUuid(params.uuid);
    } catch (error) {
        notFound();
    }
    
    const product = JSON.parse(JSON.stringify(productData));
    const activePromotion = product.promotions?.find(p => p.isActive);
    const imageUrl = getImageUrl(activePromotion?.imageUrl || product.imageUrl);

    return (
        <main className="container flex-grow py-8">
            <div className="text-sm breadcrumbs mb-4 flex items-center gap-2 text-muted-foreground">
                <Link href="/" className="hover:text-primary">Головна</Link>
                <ChevronsRight className="h-4 w-4" />
                <Link href="/catalog" className="hover:text-primary">Каталог</Link>
                {product.category && (
                    <>
                        <ChevronsRight className="h-4 w-4" />
                        <span className="font-semibold text-foreground">{product.category.name}</span>
                    </>
                )}
            </div>
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                <div className="aspect-square relative rounded-lg overflow-hidden border">
                     <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover"
                        data-ai-hint="product photo"
                    />
                    {activePromotion && <Badge variant="destructive" className="absolute top-4 right-4 text-base px-3 py-1.5 font-bold">АКЦІЯ</Badge>}
                </div>
                <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold font-headline mb-4">{product.name}</h1>
                    {product.brand && <p className="text-lg text-muted-foreground mb-4">Бренд: <span className="font-semibold text-foreground">{product.brand.name}</span></p>}
                    
                    {activePromotion ? (
                      <>
                        <div className="mb-6">
                            <div className="flex items-baseline gap-4">
                                <p className="text-4xl font-extrabold text-destructive">{Number(activePromotion.discountPrice).toFixed(2)} грн</p>
                                <p className="text-2xl text-muted-foreground line-through">{Number(product.price).toFixed(2)} грн</p>
                            </div>
                        </div>
                        
                        <AddToCartButton product={product} />
                      </>
                    ) : (
                        <Card className="bg-secondary border-primary/20 border-l-4 mt-6">
                            <CardContent className="p-4 flex items-center gap-4">
                                 <Phone className="h-8 w-8 text-primary" />
                                 <div>
                                    <p className="font-bold">Ціну та наявність уточнюйте</p>
                                    <a href="tel:+380123456789" className="text-primary hover:underline">
                                        +38 (012) 345-67-89
                                    </a>
                                 </div>
                            </CardContent>
                        </Card>
                    )}

                    <div className="mt-8 prose max-w-none prose-p:text-muted-foreground">
                        <h3 className="text-xl font-bold mb-2">Опис товару</h3>
                        <p>{product.description}</p>
                    </div>

                    {product.attributes && Object.keys(product.attributes).length > 0 && (
                        <div className="mt-8">
                            <h3 className="text-xl font-bold mb-4">Характеристики</h3>
                            <Table>
                                <TableBody>
                                    {Object.entries(product.attributes).map(([key, value]) => (
                                        <TableRow key={key}>
                                            <TableCell className="font-medium">{key}</TableCell>
                                            <TableCell>{String(value)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}

                </div>
            </div>
        </main>
    );
}
