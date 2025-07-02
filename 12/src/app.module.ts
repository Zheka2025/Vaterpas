import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { BrandsModule } from './brands/brands.module';
import { Product } from './products/product.entity';
import { PromotionalProduct } from './products/promotional-product.entity';
import { Category } from './categories/category.entity';
import { Brand } from './brands/brand.entity';
import { BrandCategory } from './brands/brand-categories.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '194.28.86.161',
      port: 3306,
      username: 'qhdjewrs_vaterpas',
      password: '!1205Zhekaaa',
      database: 'qhdjewrs_vaterpas',
      entities: [Product, PromotionalProduct, Category, Brand, BrandCategory],
      synchronize: true, // В продакшені має бути false
      logging: true,
    }),
    ProductsModule,
    CategoriesModule,
    BrandsModule,
  ],
})
export class AppModule {}
