import { Module } from "@nestjs/common";
import { SnapshotsController } from "./snapshots.controller";
import { SnapshotsService } from "./snapshots.service";
import { AccountsModule } from "../accounts/accounts.module";

@Module({
  imports: [AccountsModule],
  controllers: [SnapshotsController],
  providers: [SnapshotsService],
  exports: [SnapshotsService],
})
export class SnapshotsModule {}
