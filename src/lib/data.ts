
import "reflect-metadata";
import { DataSource, IsNull } from "typeorm";
import { Product, Category, Brand, PromotionalProduct, BrandCategory } from './entities';

const AppDataSource = new DataSource({
    type: 'mysql',
    host: '194.28.86.161',
    port: 3306,
    username: 'qhdjewrs_vaterpas',
    password: '!1205Zhekaaa',
    database: 'qhdjewrs_vaterpas',
    entities: [Product, PromotionalProduct, Category, Brand, BrandCategory],
    synchronize: false,
    logging: true, // Увімкнено для діагностики
});

// Singleton pattern to ensure a single DB connection
let dataSourcePromise: Promise<DataSource> | null = null;

async function getDataSource(): Promise<DataSource> {
    if (dataSourcePromise) {
        return dataSourcePromise;
    }

    dataSourcePromise = (async () => {
        if (AppDataSource.isInitialized) {
            return AppDataSource;
        }
        try {
            console.log("Initializing Data Source...");
            const ds = await AppDataSource.initialize();
            console.log("Data Source has been initialized!");
            return ds;
        } catch (error) {
            console.error("Error during Data Source initialization:", error);
            dataSourcePromise = null; // Reset on failure to allow retry
            throw error;
        }
    })();
    
    return dataSourcePromise;
}


const SITE_URL = 'https://test.vaterpas.com';

export function getImageUrl(path: string | null | undefined): string {
    if (!path || path.trim() === '') {
        return 'https://placehold.co/400x400.png';
    }
    if (path.startsWith('http')) {
      return path;
    }
    if (path.startsWith('/')) {
        return `${SITE_URL}${path}`;
    }
    return `${SITE_URL}/public/images/${path}`;
}

export async function getProducts(): Promise<Product[]> {
    const ds = await getDataSource();
    const productRepo = ds.getRepository(Product);
    return productRepo.find({
      relations: ['category', 'brand', 'promotions'],
      order: { id: 'DESC' },
    });
}

export async function getProductByUuid(uuid: string): Promise<Product> {
    const ds = await getDataSource();
    const productRepo = ds.getRepository(Product);
    const product = await productRepo.findOne({
      where: { uuid },
      relations: ['category', 'brand', 'promotions'],
    });
    if (!product) {
      throw new Error(`Product with UUID "${uuid}" not found`);
    }
    return product;
}

export async function getNewArrivals(): Promise<Product[]> {
  const ds = await getDataSource();
  const productRepo = ds.getRepository(Product);
  return productRepo.find({
      where: { isNew: true },
      relations: ['category', 'brand', 'promotions'],
      order: { id: 'DESC' },
    });
}

export async function getPromotionalProducts(): Promise<PromotionalProduct[]> {
  const ds = await getDataSource();
  const promoRepo = ds.getRepository(PromotionalProduct);
  return promoRepo.find({
      where: { isActive: true },
      relations: ['product', 'product.category', 'product.brand'],
      order: { createdAt: 'DESC' },
    });
}

export async function getCategories(): Promise<Category[]> {
  const ds = await getDataSource();
  const categoryRepo = ds.getRepository(Category);
  return categoryRepo.find({
      relations: ['children'],
      where: { parent: IsNull() },
    });
}
