import { Controller, Sse } from "@nestjs/common";
import { EventsService } from "./events.service";

@Controller("events")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Sse("sse")
  sse() {
    return this.eventsService.getEvents$("123");
  }
}
