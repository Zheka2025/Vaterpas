import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { Brand } from './brand.entity';
import { Category } from '../categories/category.entity';

@Entity('brand_categories')
export class BrandCategory {
  @PrimaryColumn()
  brandId: number;

  @PrimaryColumn()
  categoryId: number;

  @ManyToOne(() => Brand, brand => brand.brandCategories)
  brand: Brand;

  @ManyToOne(() => Category, category => category.brandCategories)
  category: Category;
} 