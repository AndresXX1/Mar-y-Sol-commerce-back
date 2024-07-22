import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Colection } from './schema/colection.schema';
import { CreateColectionDto } from './dto/create-Colection.dto';
import { UpdateColectionDto } from './dto/update-Colection.dto';

@Injectable()
export class ColectionService {
  constructor(
    @InjectModel(Colection.name) private readonly ColectionModel: Model<Colection>,
  ) {}

  async createBuilding(
    createColectionDto: CreateColectionDto,
  ): Promise<Colection> {
    try {
      const newBuilding = await this.ColectionModel.create(createColectionDto);
      console.log('Building created successfully!');
      return newBuilding;
    } catch (error) {
      if (error.name === 'MongoError' && error.code === 11000) {
        console.error('There was a duplicate key error');
      } else {
        console.error('An error occurred:', error);
      }
    }
  }

  async findAll(): Promise<Colection[]> {
    const buildings = await this.ColectionModel
      .find()
      .populate('rooms')
      .lean()
      .exec();
    return buildings;
  }

  async findOne(id: string): Promise<Colection> {
    const building = await this.ColectionModel
      .findById(id)
      .populate('rooms')
      .lean()
      .exec();
    return building;
  }

  async updateBuilding(
    id: string,
    updateColectionDto: UpdateColectionDto,
  ): Promise<Colection> {
    const buildingUpdated = await this.ColectionModel
      .findByIdAndUpdate(id, updateColectionDto, { new: true })
      .populate('rooms')
      .lean()
      .exec();
    return buildingUpdated;
  }

  async removeBuilding(id: string): Promise<Colection> {
    const buildingDeleted = await this.ColectionModel
      .findByIdAndDelete(id)
      .populate('rooms')
      .lean()
      .exec();
    return buildingDeleted;
  }
}
