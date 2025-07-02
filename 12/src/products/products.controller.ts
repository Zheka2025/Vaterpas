import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('new-arrivals')
  findNewArrivals() {
    return this.productsService.findNewArrivals();
  }

  @Get('category/:categoryId')
  findByCategory(@Param('categoryId') categoryId: string) {
    return this.productsService.findByCategory(+categoryId);
  }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string) {
    const product = await this.productsService.findByUuid(uuid);
    if (!product) {
      throw new NotFoundException(`Product with UUID "${uuid}" not found`);
    }
    return product;
  }

  @Post()
  create(@Body() createProductDto: Partial<Product>) {
    return this.productsService.create(createProductDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: Partial<Product>) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Patch(':id/image')
  updateImage(@Param('id') id: string, @Body() updateImageDto: { imageUrl: string }) {
    return this.productsService.update(+id, { imageUrl: updateImageDto.imageUrl });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
