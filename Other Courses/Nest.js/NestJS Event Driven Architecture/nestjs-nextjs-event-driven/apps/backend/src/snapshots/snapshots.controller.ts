import { Controller, Get } from "@nestjs/common";
import { SnapshotsService } from "./snapshots.service";

@Controller("snapshots")
export class SnapshotsController {
  constructor(private readonly snapshotsService: SnapshotsService) {}

  @Get()
  getSnapshots() {
    return this.snapshotsService.getSnapshots();
  }
}
