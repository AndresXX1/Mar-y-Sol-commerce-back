import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

interface Order {
  type: 'asc' | 'desc';
}

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post(':collectionId/create')
  create(@Body() createProductDto: CreateProductDto, @Param('collectionId') collectionId: string) {
    return this.productsService.createProduct(collectionId, createProductDto);
  }

  @Get('/findByCollection/:collectionId')
  findAllByColection(@Param('collectionId') collectionId: string) {
    return this.productsService.findAllByColection(collectionId);
  }  

  @Get('/findByCollectionSorted/:collectionId')
  findAllByColectionSorted(@Param('collectionId') collectionId: string, @Query('order') order: Order['type']) {
    return this.productsService.findAllByColectionSorted(collectionId, order);
  }

  @Get('/count')
  findNumberOfProducts() {
    return this.productsService.findNumberOfProducts();
  }

  @Get('/findByName/:collectionId/search')
  findOneByName(@Param('collectionId') collectionId: string, @Query('name') name: string) {
    return this.productsService.findOneByName(collectionId, name);
  }

  @Get(':productId')
  findOneById(@Param('productId') productId: string) {
    return this.productsService.findOneById(productId);
  }

  @Patch(':collectionId/types/:productId')
  update(@Param('collectionId') collectionId: string, @Param('productId') productId: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(collectionId, productId, updateProductDto);
  }

  @Delete('/delete/:collectionId/types/:productId')
  remove(@Param('collectionId') collectionId: string, @Param('productId') productId: string) {
    return this.productsService.remove(collectionId, productId);
  }

  @Get('/ranking')
  findRanking() {
    return this.productsService.rankingProductsByBookings();
  }

  @Get('/findAvailableProducts')
  findAvailableProducts() {
    return this.productsService.filterByDaysAndHours();
  }
}