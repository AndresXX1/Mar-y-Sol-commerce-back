import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ColectionDocument = HydratedDocument<Colection>;

@Schema()
export class Colection
 {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  seasson: string;

  @Prop({ required: true })
  description: string;

  // @Prop({ required: true })
  // city: string;

  // @Prop({ required: true })
  // country: string;

  // @Prop({ required: true })
  // owner: string;
  
  @Prop()
  blueprints: string;

  @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}] })
  products: string[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ColectionSchema = SchemaFactory.createForClass(Colection);
