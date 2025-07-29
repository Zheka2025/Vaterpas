
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBannerByUuid, getProductsByIds } from '@/lib/data';
import { getImageUrl } from '@/lib/utils';
import type { Banner, Product } from '@/lib/entities';
import { ChevronsRight } from 'lucide-react';
import { ProductCard } from '@/components/shared/ProductCard';
import { Card } from '@/components/ui/card';

// This forces the page to be dynamically rendered
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { uuid: string } }) {
    const banner = await getBannerByUuid(params.uuid);
    if (!banner) {
        return {
            title: "Новина не знайдена | Ватерпас"
        }
    }
    return {
        title: `${banner.title} | Ватерпас`,
        description: banner.description.substring(0, 160),
    };
}

export default async function BannerPage({ params }: { params: { uuid: string } }) {
    const bannerData = await getBannerByUuid(params.uuid);

    if (!bannerData) {
        notFound();
    }
    
    const banner = JSON.parse(JSON.stringify(bannerData)) as Banner;
    
    let products: Product[] = [];
    if (banner.productIds && banner.productIds.length > 0) {
        const productsData = await getProductsByIds(banner.productIds);
        products = JSON.parse(JSON.stringify(productsData));
    }
    
    const imageUrl = getImageUrl(banner.imageUrl);

    return (
        <main className="container flex-grow py-8">
             <div className="text-sm breadcrumbs mb-4 flex items-center gap-2 text-muted-foreground">
                <Link href="/" className="hover:text-primary">Головна</Link>
                <ChevronsRight className="h-4 w-4" />
                <span className="font-semibold text-foreground">{banner.title}</span>
            </div>
            
            <article>
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Image Column */}
                    <div className="w-full">
                        <Card className="overflow-hidden rounded-xl shadow-lg sticky top-24">
                            <div className="aspect-[4/3] relative">
                                <Image
                                    src={imageUrl}
                                    alt={banner.title}
                                    fill
                                    className="object-cover"
                                    data-ai-hint="banner image"
                                />
                            </div>
                        </Card>
                    </div>

                    {/* Content Column */}
                    <div>
                        <header className="mb-6">
                            <h1 className="text-4xl md:text-5xl font-extrabold font-headline mb-3">{banner.title}</h1>
                            <p className="text-lg text-muted-foreground">{banner.description}</p>
                        </header>

                        {banner.content && (
                            <div 
                                className="prose max-w-none prose-p:text-muted-foreground prose-headings:font-headline prose-headings:font-bold prose-headings:text-2xl mb-12"
                                dangerouslySetInnerHTML={{ __html: banner.content }}
                            />
                        )}
                    </div>
                </div>
                
                {products.length > 0 && (
                    <section className="mt-16 border-t pt-12">
                        <h2 className="text-3xl font-extrabold font-headline mb-6 text-center">Товари, що беруть участь в акції</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
                            {products.map((product) => (
                              <ProductCard 
                                key={product.id} 
                                product={product}
                                dataAiHint="promotional product"
                              />
                            ))}
                        </div>
                    </section>
                )}

            </article>
        </main>
    );
}
