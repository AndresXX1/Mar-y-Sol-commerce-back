import { IsString, IsNotEmpty } from 'class-validator';
import { Product } from 'src/product/schema/product.schema';

export class CreateColectionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  seasson: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  // @IsString()
  // @IsNotEmpty()
  // city: string;

  // @IsString()
  // @IsNotEmpty()
  // country: string;

  // @IsString()
  // @IsNotEmpty()
  // owner: string;
  
  @IsString()
  @IsNotEmpty()
  blueprints: string;
  
  // rooms: Room[];
}
