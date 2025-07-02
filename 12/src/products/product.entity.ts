import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Category } from '../categories/category.entity';
import { Brand } from '../brands/brand.entity';
import { PromotionalProduct } from './promotional-product.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  uuid: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  stock: number;

  @Column({ default: false })
  isNew: boolean;

  @Column({ nullable: true })
  imageUrl: string;

  @Column('json', { nullable: true })
  attributes: Record<string, any>;

  @ManyToOne(() => Category, category => category.products)
  category: Category;

  @ManyToOne(() => Brand, brand => brand.products)
  brand: Brand;

  @OneToMany(() => PromotionalProduct, promotionalProduct => promotionalProduct.product)
  promotions: PromotionalProduct[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
