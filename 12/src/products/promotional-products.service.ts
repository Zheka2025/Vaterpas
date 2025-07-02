import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PromotionalProduct } from './promotional-product.entity';

@Injectable()
export class PromotionalProductsService {
  private readonly logger = new Logger(PromotionalProductsService.name);

  constructor(
    @InjectRepository(PromotionalProduct)
    private readonly promotionalProductRepo: Repository<PromotionalProduct>,
  ) {}

  async findAll() {
    this.logger.log('Fetching all promotional products');
    return this.promotionalProductRepo.find({
      where: { isActive: true },
      relations: ['product', 'product.category', 'product.brand'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    this.logger.log(`Fetching promotional product with id: ${id}`);
    return this.promotionalProductRepo.findOne({
      where: { id, isActive: true },
      relations: ['product', 'product.category', 'product.brand'],
    });
  }

  async findByUuid(uuid: string) {
    this.logger.log(`Fetching promotional product with uuid: ${uuid}`);
    return this.promotionalProductRepo.findOne({
      where: { uuid, isActive: true },
      relations: ['product', 'product.category', 'product.brand'],
    });
  }

  async create(promotionalProductData: Partial<PromotionalProduct>) {
    this.logger.log('Creating new promotional product');
    const promotionalProduct = this.promotionalProductRepo.create(promotionalProductData);
    return this.promotionalProductRepo.save(promotionalProduct);
  }

  async update(id: number, promotionalProductData: Partial<PromotionalProduct>) {
    this.logger.log(`Updating promotional product with id: ${id}`);
    await this.promotionalProductRepo.update(id, promotionalProductData);
    return this.findOne(id);
  }

  async remove(id: number) {
    this.logger.log(`Removing promotional product with id: ${id}`);
    return this.promotionalProductRepo.delete(id);
  }

  async deactivate(id: number) {
    this.logger.log(`Deactivating promotional product with id: ${id}`);
    return this.promotionalProductRepo.update(id, { isActive: false });
  }
} 