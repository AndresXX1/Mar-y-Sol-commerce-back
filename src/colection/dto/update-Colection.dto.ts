import { PartialType } from '@nestjs/mapped-types';
import { CreateColectionDto } from './create-Colection.dto';

export class UpdateColectionDto extends PartialType(CreateColectionDto) {}
