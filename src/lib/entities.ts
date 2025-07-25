import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  imageUrl: string;

  @ManyToOne(() => Category, category => category.children)
  parent: Category;

  @OneToMany(() => Category, category => category.parent)
  children: Category[];

  @OneToMany(() => Product, product => product.category)
  products: Product[];

  @OneToMany(() => BrandCategory, brandCategory => brandCategory.category)
  brandCategories: BrandCategory[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('brand')
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  logoUrl: string;

  @OneToMany(() => Product, product => product.brand)
  products: Product[];

  @OneToMany(() => BrandCategory, brandCategory => brandCategory.brand)
  brandCategories: BrandCategory[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('brand_category')
export class BrandCategory {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  brandId: number;

  @Column()
  categoryId: number;

  @ManyToOne(() => Brand, brand => brand.brandCategories)
  brand: Brand;

  @ManyToOne(() => Category, category => category.brandCategories)
  category: Category;
}

@Entity('product')
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

@Entity('promotional_product')
export class PromotionalProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  uuid: string;

  @ManyToOne(() => Product, product => product.promotions)
  product: Product;

  @Column('decimal', { precision: 10, scale: 2 })
  discountPrice: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ type: 'timestamp', nullable: true })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
