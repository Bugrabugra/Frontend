import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../../typeorm";
import { Repository } from "typeorm";
import * as bcryptUtils from "../../utils/bcrypt";

describe("UsersService", () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn()
          }
        }
      ]
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("userRepository should be defined", () => {
    expect(userRepository).toBeDefined();
  });

  describe("createUser", () => {
    jest.spyOn(bcryptUtils, "encodePassword").mockReturnValue("hashed123");

    it("should encode password correctly", async () => {
      await service.createUser({
        username: "anson",
        email: "anson@gmail.com",
        password: "123"
      });

      expect(bcryptUtils.encodePassword).toHaveBeenCalledWith("123");
    });

    it("should call userRepository.create with correct params", async () => {
      await service.createUser({
        username: "anson",
        email: "anson@gmail.com",
        password: "123"
      });

      expect(userRepository.create).toHaveBeenCalledWith({
        username: "anson",
        email: "anson@gmail.com",
        password: "hashed123"
      });
    });

    it("should call userRepository.save with correct params", async () => {
      jest.spyOn(userRepository, "create").mockReturnValueOnce({
        username: "anson",
        email: "anson@gmail.com",
        password: "hashed123",
        id: 1
      });
      await service.createUser({
        username: "anson",
        email: "anson@gmail.com",
        password: "123"
      });

      expect(userRepository.save).toHaveBeenCalledWith({
        username: "anson",
        email: "anson@gmail.com",
        password: "hashed123",
        id: 1
      });
    });
  });
});
