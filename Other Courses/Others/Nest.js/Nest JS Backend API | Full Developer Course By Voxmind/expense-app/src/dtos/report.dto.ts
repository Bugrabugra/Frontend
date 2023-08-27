import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString
} from "class-validator";
import { ReportType } from "../data";
import { Exclude, Expose } from "class-transformer";

// Bunlarin gecerli olmasi icin main.ts te tanimlanmasi lazim
export class CreateReportDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  @IsNotEmpty()
  source: string;
}

export class UpdateReportDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  source: string;
}

export class ReportResponseDto {
  id: string;
  source: string;
  amount: number;
  @Exclude()
  created_at: Date;
  @Exclude()
  updated_at: Date;
  type: ReportType;

  constructor(partial: Partial<ReportResponseDto>) {
    Object.assign(this, partial);
  }

  @Expose({ name: "createdAt" })
  transformCreatedAt() {
    return this.created_at;
  }
}
