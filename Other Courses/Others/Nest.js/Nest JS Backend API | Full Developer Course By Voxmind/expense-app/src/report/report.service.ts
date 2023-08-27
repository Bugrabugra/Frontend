import { Injectable } from "@nestjs/common";
import { data, ReportType } from "../data";
import { v4 as uuid } from "uuid";
import { ReportResponseDto } from "../dtos/report.dto";

type Report = { amount: number; source: string };
type UpdateReport = { amount?: number; source?: string };

@Injectable()
export class ReportService {
  getAllReports(type: ReportType): ReportResponseDto[] {
    return data.report
      .filter((report) => {
        return report.type === type;
      })
      .map((report) => {
        return new ReportResponseDto(report);
      });
  }

  getReportById(type: ReportType, id: string): ReportResponseDto {
    const report = data.report
      .filter((report) => {
        return report.type === type;
      })
      .find((report) => {
        return report.id === id;
      });

    if (!report) {
      return;
    }

    return new ReportResponseDto(report);
  }

  createReport(
    type: ReportType,
    { amount, source }: Report
  ): ReportResponseDto {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type
    };

    data.report.push(newReport);
    return new ReportResponseDto(newReport);
  }

  updateReport(
    type: ReportType,
    id: string,
    { amount, source }: UpdateReport
  ): ReportResponseDto {
    const reportToUpdate = data.report
      .filter((report) => {
        return report.type === type;
      })
      .find((report) => {
        return report.id === id;
      });

    if (!reportToUpdate) {
      return;
    }

    const reportIndex = data.report.findIndex((report) => {
      return report.id === reportToUpdate.id;
    });

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      amount,
      source
    };

    return new ReportResponseDto(data.report[reportIndex]);
  }

  deleteReport(id: string) {
    const reportIndex = data.report.findIndex((report) => {
      return report.id === id;
    });

    if (reportIndex === -1) {
      return;
    }

    data.report.splice(reportIndex, 1);
  }
}
