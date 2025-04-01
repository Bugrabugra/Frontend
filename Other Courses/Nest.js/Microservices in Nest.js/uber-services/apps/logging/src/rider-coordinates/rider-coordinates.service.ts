import { Inject, Injectable } from "@nestjs/common";
import { CreateCoordinatesDTO } from "./dto/create-coordinates.dto";
import { InjectModel } from "@nestjs/mongoose";
import { RiderCoordinate } from "./schemas/rider-coordinates.schema";
import { Model } from "mongoose";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Injectable()
export class RiderCoordinatesService {
  constructor(
    @InjectModel(RiderCoordinate.name)
    private readonly riderCoordinateModel: Model<RiderCoordinate>,
    @Inject("RIDER_SERVICE") private readonly client: ClientProxy
  ) {}

  async saveRiderCoordinates(createCoordinatesDTO: CreateCoordinatesDTO) {
    return this.riderCoordinateModel.create(createCoordinatesDTO);
  }

  async getRiderCoordinates(riderId: string) {
    const coordinates = await this.riderCoordinateModel.find({
      rider: riderId
    });
    const pattern = { cmd: "get-rider" };
    const payload = { id: riderId };

    const rider: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    } = await firstValueFrom(this.client.send(pattern, payload));

    console.log({ coordinates, rider });

    return { coordinates, rider };
  }
}
