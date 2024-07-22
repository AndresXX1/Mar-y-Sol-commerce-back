import { Module } from '@nestjs/common';
import { ColectionService } from './colection.service';
import { ColectionController } from './colection.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Colection, ColectionSchema } from './schema/colection.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Colection.name, schema: ColectionSchema },
    ]),
  ],
  controllers: [ColectionController],
  providers: [ColectionService],
})
export class ColectionModule {}
