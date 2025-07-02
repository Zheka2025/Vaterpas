import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { PromotionalProduct } from './promotional-product.entity';
import { ProductsService } from './products.service';
import { PromotionalProductsService } from './promotional-products.service';
import { ProductsController } from './products.controller';
import { PromotionalProductsController } from './promotional-products.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, PromotionalProduct])
  ],
  controllers: [ProductsController, PromotionalProductsController],
  providers: [ProductsService, PromotionalProductsService],
  exports: [ProductsService, PromotionalProductsService]
})
export class ProductsModule {}
