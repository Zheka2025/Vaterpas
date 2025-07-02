import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { PromotionalProduct } from './promotional-product.entity';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(PromotionalProduct)
    private readonly promoRepo: Repository<PromotionalProduct>,
  ) {}

  async findAll(): Promise<Product[]> {
    this.logger.log('Fetching all products.');
    const products = await this.productRepo.find({
      relations: ['category', 'brand', 'promotions'],
      order: { id: 'DESC' },
    });
    return products;
  }

  async findOne(id: number): Promise<Product | null> {
    this.logger.log(`Fetching product with id: ${id}`);
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['category', 'brand', 'promotions'],
    });
    return product;
  }

  async findByUuid(uuid: string): Promise<Product | null> {
    this.logger.log(`Fetching product with uuid: ${uuid}`);
    const product = await this.productRepo.findOne({
      where: { uuid },
      relations: ['category', 'brand', 'promotions'],
    });
    return product;
  }

  async findByCategory(categoryId: number): Promise<Product[]> {
    this.logger.log(`Fetching products for category: ${categoryId}`);
    const products = await this.productRepo.find({
      where: { category: { id: categoryId } },
      relations: ['category', 'brand', 'promotions'],
      order: { id: 'DESC' },
    });
    return products;
  }

  async findNewArrivals(): Promise<Product[]> {
    this.logger.log('Fetching new arrivals');
    const products = await this.productRepo.find({
      where: { isNew: true },
      relations: ['category', 'brand', 'promotions'],
      order: { id: 'DESC' },
    });
    return products;
  }

  async create(productData: Partial<Product>): Promise<Product> {
    this.logger.log('Creating new product');
    const product = this.productRepo.create(productData);
    return this.productRepo.save(product);
  }

  async update(id: number, productData: Partial<Product>): Promise<Product | null> {
    this.logger.log(`Updating product with id: ${id}`);
    await this.productRepo.update(id, productData);
    return this.findOne(id);
  }

  async remove(id: number) {
    this.logger.log(`Removing product with id: ${id}`);
    return this.productRepo.delete(id);
  }
}
