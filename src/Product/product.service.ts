import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product } from './schema/product.schema';
import { Colection } from 'src/colection/schema/colection.schema'; // Asegúrate de que este import apunte al lugar correcto de tu proyecto
import { Booking } from 'src/bookings/schema/booking.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(Colection.name) private readonly colectionModel: Model<Colection>,
    @InjectModel(Booking.name) private readonly bookingModel: Model<Booking>,
  ) {}

  async createProduct(
    colectionId: string,
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    const colection = await this.colectionModel.findById(colectionId).exec();
    if (!colection) {
      throw new Error('La coleccion especificada no existe.');
    }
    const createdProduct = await this.productModel.create(createProductDto);
    colection.products.push(createdProduct._id.toString());
    await colection.save();
    return createdProduct;
  }

  async findOneById(productId: string): Promise<Product> {
    const product = await this.productModel.findById(productId).exec();
    if (!product) {
      throw new Error('El producto especificado no existe.');
    }
    return product;
  }

  async findAllByColection(colectionId: string): Promise<Product[]> {
    const colection = await this.colectionModel.findById(colectionId).exec();
    if (!colection) {
      throw new Error('La coleccion especificada no existe.');
    }
    // Asegúrate de que colection.products sea un array de ObjectId
    const productIds = colection.products.map(id => new Types.ObjectId(id));
    return this.productModel.find({ _id: { $in: productIds } }).exec();
  }

  async findAllByColectionSorted(
    colectionId: string,
    order: string,
  ): Promise<Product[]> {
    const colection = await this.colectionModel.findById(colectionId).exec();
    if (!colection) {
      throw new Error('La coleccion especificada no existe.');
    }
    if (order !== 'asc' && order !== 'desc') {
      throw new Error('El parámetro "order" debe ser "asc" o "desc".');
    }
    const sortOrder = order === 'asc' ? 1 : -1;
    const productIds = colection.products.map(id => new Types.ObjectId(id));
    return this.productModel
      .find({ _id: { $in: productIds } })
      .sort({ name: sortOrder })
      .exec();
  }

  async findNumberOfProducts(): Promise<number> {
    const allColections = await this.colectionModel.find().populate('products').exec();
    let count = 0;
    for (const colection of allColections) {
      count += colection.products.length;
    }
    return count;
  }

  async findOneByName(colectionId: string, name: string): Promise<Product[]> {
    const colection = await this.colectionModel.findById(colectionId).populate('products').exec();
    if (!colection) {
      throw new Error('La coleccion especificada no existe.');
    }
    return (await this.productModel.find({ _id: { $in: colection.products.map(id => new Types.ObjectId(id)) } }).exec()).map(product => product.toObject());
     
    
  }

  async update(
    colectionId: string,
    productId: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const colection = await this.colectionModel.findById(colectionId).exec();
    if (!colection) {
      throw new Error('La coleccion especificada no existe.');
    }
    return this.productModel.findByIdAndUpdate(productId, updateProductDto, { new: true }).exec();
  }

  async remove(colectionId: string, productId: string): Promise<string> {
    const colection = await this.colectionModel.findById(colectionId).exec();
    if (!colection) {
      throw new Error('La coleccion especificada no existe.');
    }
    await this.productModel.findByIdAndDelete(productId).exec();
    return 'Producto eliminado';
  }

  async filterByDaysAndHours() {
    // Implementa la lógica para filtrar productos por días y horas
  }

  async rankingProductsByBookings(): Promise<Product[]> {
    const products = await this.productModel.aggregate([
      {
        $lookup: {
          from: 'bookings',
          localField: '_id',
          foreignField: 'productId',
          as: 'bookings',
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          totalBookings: { $size: '$bookings' },
        },
      },
      {
        $sort: { totalBookings: -1 },
      },
      {
        $limit: 6,
      },
    ]);
    return products as Product[];
  }
}