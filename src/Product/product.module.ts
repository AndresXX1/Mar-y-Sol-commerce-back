import { Module } from '@nestjs/common';
import { ProductsService } from './product.service';
import { ProductsController } from './product.controller';
import { Product, ProductSchema } from './schema/product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Colection, ColectionSchema } from 'src/colection/schema/colection.schema';
import { Booking, BookingSchema } from 'src/bookings/schema/booking.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema },]),
    MongooseModule.forFeature([{ name: Colection.name, schema: ColectionSchema },]),
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema },]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductModule {}
