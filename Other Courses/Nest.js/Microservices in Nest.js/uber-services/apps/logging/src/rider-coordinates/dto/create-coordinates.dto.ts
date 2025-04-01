import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCoordinatesDTO {
  @IsNumber()
  @IsNotEmpty()
  lng: number;

  @IsNumber()
  @IsNotEmpty()
  lat: number;

  @IsString()
  @IsNotEmpty()
  rider: string;
}
