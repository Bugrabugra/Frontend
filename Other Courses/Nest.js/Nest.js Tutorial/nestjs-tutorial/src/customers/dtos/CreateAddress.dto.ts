import { IsNotEmpty } from "class-validator";

export class CreateAddressDto {
  @IsNotEmpty()
  line1: string;
  line?: string;
  @IsNotEmpty()
  zip: string;
  @IsNotEmpty()
  city: string;
  @IsNotEmpty()
  state: string;
}
