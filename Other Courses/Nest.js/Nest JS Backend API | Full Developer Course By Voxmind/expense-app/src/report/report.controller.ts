import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseEnumPipe,
  ParseUUIDPipe,
  Post,
  Put
} from "@nestjs/common";
import { ReportService } from "./report.service";
import { ReportType } from "../data";
import {
  CreateReportDto,
  ReportResponseDto,
  UpdateReportDto
} from "../dtos/report.dto";

@Controller("report/:type")
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  getAllReports(
    @Param("type", new ParseEnumPipe(ReportType)) type: string
  ): ReportResponseDto[] {
    const reportType =
      type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.getAllReports(reportType);
  }

  @Get(":id")
  getReportById(
    @Param("type", new ParseEnumPipe(ReportType)) type: string,
    @Param("id", ParseUUIDPipe) id: string
  ): ReportResponseDto {
    const reportType =
      type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.getReportById(reportType, id);
  }

  @Post()
  createReport(
    @Param("type", new ParseEnumPipe(ReportType)) type: string,
    @Body() { amount, source }: CreateReportDto
  ): ReportResponseDto {
    const reportType =
      type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.createReport(reportType, { amount, source });
  }

  @Put(":id")
  updateReport(
    @Param("type", new ParseEnumPipe(ReportType)) type: string,
    @Param("id", ParseUUIDPipe) id: string,
    @Body() { amount, source }: UpdateReportDto
  ): ReportResponseDto {
    const reportType =
      type === "income" ? ReportType.INCOME : ReportType.EXPENSE;

    return this.reportService.updateReport(reportType, id, { amount, source });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(":id")
  deleteReport(@Param("id", ParseUUIDPipe) id: string) {
    this.reportService.deleteReport(id);
  }
}
