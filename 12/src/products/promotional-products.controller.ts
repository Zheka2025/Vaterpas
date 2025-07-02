import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { PromotionalProductsService } from './promotional-products.service';
import { PromotionalProduct } from './promotional-product.entity';

@Controller('promotional-products')
export class PromotionalProductsController {
  constructor(private readonly promotionalProductsService: PromotionalProductsService) {}

  @Get()
  findAll() {
    return this.promotionalProductsService.findAll();
  }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string) {
    const product = await this.promotionalProductsService.findByUuid(uuid);
    if (!product) {
      throw new NotFoundException(`Promotional product with UUID "${uuid}" not found`);
    }
    return product;
  }

  @Post()
  create(@Body() createPromotionalProductDto: Partial<PromotionalProduct>) {
    return this.promotionalProductsService.create(createPromotionalProductDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePromotionalProductDto: Partial<PromotionalProduct>) {
    return this.promotionalProductsService.update(+id, updatePromotionalProductDto);
  }

  @Patch(':id/image')
  updateImage(@Param('id') id: string, @Body() updateImageDto: { imageUrl: string }) {
    return this.promotionalProductsService.update(+id, { imageUrl: updateImageDto.imageUrl });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.promotionalProductsService.remove(+id);
  }

  @Patch(':id/deactivate')
  deactivate(@Param('id') id: string) {
    return this.promotionalProductsService.deactivate(+id);
  }
} 