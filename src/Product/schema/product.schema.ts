import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {

    @Prop({ required: true })
    name: string;

    @Prop()
    description: string;

    @Prop({ required: true, type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Booking'}]})
    booking: string[];

    @Prop({ required: true })
    location: string;

    @Prop({ required: true })
    equipment: string[];

    @Prop({ required: false })
    type: string[];

    @Prop({ required: true })
    floorNumber: number;    

    @Prop()
    images: string[];

    @Prop({ required: true })
    plans: string;

    @Prop({ defaultOptions: ['Activo', 'Inactivo'] })
    state: string;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
