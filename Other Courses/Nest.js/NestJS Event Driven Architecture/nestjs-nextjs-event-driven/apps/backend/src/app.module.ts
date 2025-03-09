import { Module } from "@nestjs/common";
import { AccountsModule } from "./accounts/accounts.module";
import { SnapshotsModule } from "./snapshots/snapshots.module";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { EventsModule } from './events/events.module';

@Module({
  imports: [EventEmitterModule.forRoot(), AccountsModule, SnapshotsModule, EventsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
