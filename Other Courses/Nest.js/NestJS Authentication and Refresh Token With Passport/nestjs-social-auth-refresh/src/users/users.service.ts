import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schema/user.schema";
import { FilterQuery, Model, UpdateQuery } from "mongoose";
import { CreateUserRequest } from "./dto/create-user.request";
import { hash } from "bcryptjs";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  async create(data: CreateUserRequest) {
    await new this.userModel({
      ...data,
      password: await hash(data.password, 10)
    }).save();
  }

  async getUser(query: FilterQuery<User>) {
    const user = (await this.userModel.findOne(query))?.toObject();

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  async getUsers() {
    return this.userModel.find({});
  }

  async updateUser(query: FilterQuery<User>, data: UpdateQuery<User>) {
    return this.userModel.findOneAndUpdate(query, data);
  }
}
