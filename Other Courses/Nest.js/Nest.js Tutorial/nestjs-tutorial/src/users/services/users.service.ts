import { Injectable } from "@nestjs/common";
import { SerializedUser, User } from "../types";
import { CreateUserDto } from "../dto/CreateUser.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User as UserEntity } from "../../typeorm";
import { Repository } from "typeorm";
import { encodePassword } from "../../utils/bcrypt";

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      username: "anson",
      password: "anson"
    },
    {
      id: 2,
      username: "jack",
      password: "jack"
    },
    {
      id: 3,
      username: "ryan",
      password: "ryan"
    }
  ];

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  getUsers() {
    return this.users.map((user) => new SerializedUser(user));
  }

  getUserByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id == id);
  }

  createUser(createUserDto: CreateUserDto) {
    const password = encodePassword(createUserDto.password);
    const newUser = this.userRepository.create({ ...createUserDto, password });

    return this.userRepository.save(newUser);
  }

  findUserByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  findUserById(id: number) {
    return this.userRepository.findOne({
      where: { id }
    });
  }
}
