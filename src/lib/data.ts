
import "reflect-metadata";
import 'mysql2';
import { DataSource, In, IsNull, Like } from "typeorm";
import { Product, Category, Brand, PromotionalProduct, BrandCategory, Banner } from './entities';
import { unstable_noStore as noStore } from 'next/cache';


let AppDataSource: DataSource;

const initializeDataSource = async () => {
    noStore();
    if (AppDataSource && AppDataSource.isInitialized) {
        return AppDataSource;
    }

    const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [Product, Category, Brand, PromotionalProduct, BrandCategory, Banner],
        synchronize: false,
        logging: false, 
    });

    try {
        AppDataSource = await dataSource.initialize();
        console.log("Data Source has been initialized!");
        return AppDataSource;
    } catch (err) {
        console.error("Error during Data Source initialization", err);
        throw new Error("Could not initialize database connection.");
    }
};

const getDbConnection = async (): Promise<DataSource> => {
    return AppDataSource && AppDataSource.isInitialized ? AppDataSource : initializeDataSource();
};

export async function getBanners(): Promise<Banner[]> {
    noStore();
    const ds = await getDbConnection();
    const bannerRepo = ds.getRepository(Banner);
    try {
        const banners = await bannerRepo.find({
            where: { isActive: true },
            order: { createdAt: 'DESC' },
        });
        return banners;
    } catch (error) {
        console.error("Failed to get banners:", error);
        return [];
    }
}

export async function getBannerByUuid(uuid: string): Promise<Banner | null> {
    noStore();
    const ds = await getDbConnection();
    const bannerRepo = ds.getRepository(Banner);
    try {
        const banner = await bannerRepo.findOne({ where: { uuid } });
        return banner;
    } catch (error) {
        console.error(`Failed to get banner by uuid ${uuid}:`, error);
        return null;
    }
}

export async function getProductsByIds(ids: number[]): Promise<Product[]> {
    noStore();
    if (ids.length === 0) return [];
    const ds = await getDbConnection();
    const productRepo = ds.getRepository(Product);
    try {
        const products = await productRepo.find({
            where: { id: In(ids) },
            relations: ['promotions'],
        });
        return products;
    } catch (error) {
        console.error("Failed to get products by IDs:", error);
        return [];
    }
}

export async function getProducts(): Promise<Product[]> {
    noStore();
    const ds = await getDbConnection();
    const productRepo = ds.getRepository(Product);
    try {
        const products = await productRepo.find({
            relations: ['category', 'brand', 'promotions'],
            order: { id: 'DESC' },
        });
        return products;
    } catch (error) {
        console.error("Failed to get products:", error);
        return [];
    }
}

export async function searchProducts(query: string) {
    noStore();
    if (!query) {
        return [];
    }
    const ds = await getDbConnection();
    const productRepo = ds.getRepository(Product);
    try {
        const products = await productRepo.find({
            where: { name: Like(`%${query}%`) },
            relations: ['promotions'],
            take: 10,
        });
        return JSON.parse(JSON.stringify(products));
    } catch (error) {
        console.error("Failed to search products:", error);
        return [];
    }
}


export async function getProductByUuid(uuid: string): Promise<Product> {
    noStore();
    const ds = await getDbConnection();
    const productRepo = ds.getRepository(Product);
    try {
        const product = await productRepo.findOne({
            where: { uuid },
            relations: ['category', 'brand', 'promotions'],
        });
        if (!product) {
            throw new Error(`Product with UUID "${uuid}" not found`);
        }
        return product;
    } catch (error) {
        console.error(`Failed to get product by UUID ${uuid}:`, error);
        throw new Error(`Could not fetch product with UUID ${uuid}.`);
    }
}

export async function getNewArrivals(): Promise<Product[]> {
    noStore();
    const ds = await getDbConnection();
    const productRepo = ds.getRepository(Product);
    try {
        const products = await productRepo.find({
            where: { isNew: true },
            relations: ['category', 'brand', 'promotions'],
            order: { id: 'DESC' },
        });
        return products;
    } catch (error) {
        console.error("Failed to get new arrivals:", error);
        return [];
    }
}

export async function getPromotionalProducts(): Promise<PromotionalProduct[]> {
    noStore();
    const ds = await getDbConnection();
    const promoRepo = ds.getRepository(PromotionalProduct);
    try {
        const promotions = await promoRepo.find({
            where: { isActive: true },
            relations: ['product', 'product.category', 'product.brand'],
            order: { createdAt: 'DESC' },
        });
        return promotions;
    } catch (error) {
        console.error("Failed to get promotional products:", error);
        return [];
    }
}

export async function getCategories(): Promise<Category[]> {
    noStore();
    const ds = await getDbConnection();
    const categoryRepo = ds.getRepository(Category);
    try {
        const categories = await categoryRepo.find({
            relations: ['children'],
            where: { parent: IsNull() },
        });
        return categories;
    } catch (error) {
        console.error("Failed to get categories:", error);
        return [];
    }
}
