import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateCoordinatesDTO } from "./dto/create-coordinates.dto";
import { RiderCoordinatesService } from "./rider-coordinates.service";

@Controller("rider-coordinates")
export class RiderCoordinatesController {
  constructor(
    private readonly riderCoordinatesService: RiderCoordinatesService
  ) {}

  @Get(":id")
  async getRiderCoordinates(@Param() params: { id: string }) {
    return this.riderCoordinatesService.getRiderCoordinates(params.id);
  }

  @Post()
  async saveRiderCoordinates(
    @Body() createCoordinatesDTO: CreateCoordinatesDTO
  ) {
    return this.riderCoordinatesService.saveRiderCoordinates(
      createCoordinatesDTO
    );
  }
}
