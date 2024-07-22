import { IsString, IsNotEmpty, IsNumber, IsEnum, IsArray, isArray,IsOptional } from 'class-validator';
import { Booking } from 'src/bookings/schema/booking.schema';

export class CreateProductDto {
    
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    booking: Booking[];
    
    // @IsString()
    // @IsNotEmpty()
    // location: string;
    
    
    // @IsNotEmpty()
    // equipment: string[];
    
    @IsArray()
    @IsOptional()
    size: string[];
    
    @IsNumber()
    @IsNotEmpty()
    color: number;



    @IsString()
    description: string;

    @IsArray()
    images: string[];

    @IsEnum(['Activo', 'Inactivo'])
    state: string;
}
