import { Injectable } from "@nestjs/common";
import { AccountsService } from "../accounts/accounts.service";
import { CreateAccountRequest } from "../accounts/create-account.request";
import { OnEvent } from "@nestjs/event-emitter";
import { GenerateSnapshotsEvent } from "./generate-snapshots.event";

@Injectable()
export class SnapshotsService {
  private readonly snapshots: {
    date: Date;
    account: CreateAccountRequest;
    userId: string;
  }[] = [];

  constructor(private readonly accountsService: AccountsService) {}

  @OnEvent("snapshots.generate")
  generateSnapshot(event: GenerateSnapshotsEvent) {
    const accounts: CreateAccountRequest[] = this.accountsService.getAccounts();

    for (const account of accounts) {
      this.snapshots.push({
        account,
        date: new Date(),
        userId: event.userId,
      });
    }
  }

  getSnapshots() {
    return this.snapshots;
  }
}
