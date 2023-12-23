import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { SummaryModule } from "./summary/summary.module";
import { ReportModule } from "./report/report.module";

@Module({
  imports: [SummaryModule, ReportModule],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
