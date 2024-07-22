import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ColectionService } from './colection.service';
import { CreateColectionDto } from './dto/create-Colection.dto';
import { UpdateColectionDto } from './dto/update-Colection.dto';

@Controller('buildings')
export class ColectionController {
  constructor(private readonly ColectionService: ColectionService) {}

  @Post('/create')
  async create(@Body() createBuildingDto: CreateColectionDto) {
    return await this.ColectionService.createBuilding(createBuildingDto);
  }

  @Get()
  findAll() {
    return this.ColectionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ColectionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBuildingDto: UpdateColectionDto,
  ) {
    return this.ColectionService.updateBuilding(id, updateBuildingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ColectionService.removeBuilding(id);
  }
}
