import { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class RiderCoordinate {
  @Prop({ required: true })
  lat: number;

  @Prop({ required: true })
  lng: number;

  @Prop({ required: true })
  rider: string;
}

export type RiderCoordinateDocument = HydratedDocument<RiderCoordinate>;

export const RiderCoordinateSchema =
  SchemaFactory.createForClass(RiderCoordinate);
