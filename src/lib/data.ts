
import "reflect-metadata";
import { DataSource, IsNull } from "typeorm";
import { Product, Category, Brand, PromotionalProduct, BrandCategory } from './entities';
import 'dotenv/config'

let AppDataSource: DataSource;

const getDbConnection = async (): Promise<DataSource> => {
    if (AppDataSource && AppDataSource.isInitialized) {
        return AppDataSource;
    }

    try {
        AppDataSource = new DataSource({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: [Product, PromotionalProduct, Category, Brand, BrandCategory],
            synchronize: false,
            logging: false, // Turn off verbose logging for production
            poolSize: 10, // Add connection pooling
        });

        await AppDataSource.initialize();
        console.log("Data Source has been initialized!");
        return AppDataSource;
    } catch (err) {
        console.error("Error during Data Source initialization", err);
        // In case of initialization error, ensure we don't hold a broken instance
        if (AppDataSource) {
           AppDataSource = (undefined as unknown) as DataSource;
        }
        throw new Error("Could not initialize database connection.");
    }
};


export async function getProducts(): Promise<Product[]> {
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
        throw new Error('Could not fetch products.');
    }
}

export async function getProductByUuid(uuid: string): Promise<Product> {
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
        throw new Error('Could not fetch new arrivals.');
    }
}

export async function getPromotionalProducts(): Promise<PromotionalProduct[]> {
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
        throw new Error('Could not fetch promotional products.');
    }
}

export async function getCategories(): Promise<Category[]> {
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
        throw new Error('Could not fetch categories.');
    }
}
