import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger(CategoriesService.name);

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async findAll() {
    this.logger.log('Fetching all categories');
    return this.categoryRepo.find({
      relations: ['children'],
      where: { parent: IsNull() },
    });
  }

  async findOne(id: number) {
    this.logger.log(`Fetching category with id: ${id}`);
    return this.categoryRepo.findOne({
      where: { id },
      relations: ['children', 'products'],
    });
  }

  async create(categoryData: Partial<Category>) {
    this.logger.log('Creating new category');
    const category = this.categoryRepo.create(categoryData);
    return this.categoryRepo.save(category);
  }

  async update(id: number, categoryData: Partial<Category>) {
    this.logger.log(`Updating category with id: ${id}`);
    await this.categoryRepo.update(id, categoryData);
    return this.findOne(id);
  }

  async remove(id: number) {
    this.logger.log(`Removing category with id: ${id}`);
    return this.categoryRepo.delete(id);
  }

  async findSubcategories(parentId: number) {
    this.logger.log(`Fetching subcategories for category: ${parentId}`);
    return this.categoryRepo.find({
      where: { parent: { id: parentId } },
      relations: ['children'],
    });
  }
} 