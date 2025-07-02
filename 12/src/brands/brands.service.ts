import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from './brand.entity';

@Injectable()
export class BrandsService {
  private readonly logger = new Logger(BrandsService.name);

  constructor(
    @InjectRepository(Brand)
    private readonly brandRepo: Repository<Brand>,
  ) {}

  async findAll() {
    this.logger.log('Fetching all brands');
    return this.brandRepo.find({
      relations: ['products'],
    });
  }

  async findOne(id: number) {
    this.logger.log(`Fetching brand with id: ${id}`);
    return this.brandRepo.findOne({
      where: { id },
      relations: ['products'],
    });
  }

  async create(brandData: Partial<Brand>) {
    this.logger.log('Creating new brand');
    const brand = this.brandRepo.create(brandData);
    return this.brandRepo.save(brand);
  }

  async update(id: number, brandData: Partial<Brand>) {
    this.logger.log(`Updating brand with id: ${id}`);
    await this.brandRepo.update(id, brandData);
    return this.findOne(id);
  }

  async remove(id: number) {
    this.logger.log(`Removing brand with id: ${id}`);
    return this.brandRepo.delete(id);
  }
} 