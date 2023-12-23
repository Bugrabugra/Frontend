import { homeSelect, HomeService } from "./home.service";
import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "../prisma/prisma.service";
import { PropertyType } from "@prisma/client";
import { NotFoundException } from "@nestjs/common";

const mockGetHomes = [
  {
    id: 1,
    address: "2345 William Str",
    city: "Toronto",
    price: 1500000,
    image: "img1",
    numberOfBedrooms: 3,
    numberOfBathrooms: 2.5,
    propertyType: PropertyType.RESIDENTIAL,
    images: [
      {
        url: "src1"
      }
    ]
  }
];

const mockHome = {
  id: 1,
  address: "2345 William Str",
  city: "Toronto",
  price: 1500000,
  image: "img1",
  number_of_bedrooms: 3,
  number_of_bathrooms: 2.5,
  property_type: PropertyType.RESIDENTIAL,
  lands_size: 4444
};

const mockImages = [
  {
    id: 1,
    url: "src1"
  },
  {
    id: 2,
    url: "src2"
  }
];

describe("HomeService", () => {
  let service: HomeService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HomeService,
        {
          provide: PrismaService,
          useValue: {
            home: {
              findMany: jest.fn().mockReturnValue(mockGetHomes),
              create: jest.fn().mockReturnValue(mockHome)
            },
            image: {
              createMany: jest.fn().mockReturnValue(mockImages)
            }
          }
        }
      ]
    }).compile();

    service = module.get<HomeService>(HomeService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("getHomes", () => {
    const filters = {
      city: "Toronto",
      price: {
        gte: 1000000,
        lte: 1500000
      },
      property_type: PropertyType.RESIDENTIAL
    };

    it("should call prisma home.findMany with correct params", async () => {
      const mockPrismaFindManyHomes = jest.fn().mockReturnValue(mockGetHomes);

      jest
        .spyOn(prismaService.home, "findMany")
        .mockImplementation(mockPrismaFindManyHomes);

      await service.getHomes(filters);

      expect(mockPrismaFindManyHomes).toBeCalledWith({
        select: {
          ...homeSelect,
          images: {
            select: {
              url: true
            },
            take: 1
          }
        },
        where: filters
      });
    });

    it("should throw not found exception if not homes are found", async () => {
      const mockPrismaFindManyHomes = jest.fn().mockReturnValue([]);

      jest
        .spyOn(prismaService.home, "findMany")
        .mockImplementation(mockPrismaFindManyHomes);

      expect(service.getHomes(filters)).rejects.toThrowError(NotFoundException);
    });
  });

  describe("createHome", () => {
    const mockCreateHomeParam = {
      address: "111 Yellow",
      numberOfBathrooms: 2,
      numberOfBedrooms: 2,
      city: "Vancouver",
      landSize: 4444,
      price: 3000000,
      propertyType: PropertyType.RESIDENTIAL,
      images: [
        {
          url: "src1"
        }
      ]
    };
    it("should call prisma home.create with the correct payload", async () => {
      const mockCreateHome = jest.fn().mockReturnValue(mockHome);

      jest
        .spyOn(prismaService.home, "create")
        .mockImplementation(mockCreateHome);

      await service.createHome(mockCreateHomeParam, 5);

      expect(mockCreateHome).toBeCalledWith({
        data: {
          address: "111 Yellow",
          number_of_bathrooms: 2,
          number_of_bedrooms: 2,
          city: "Vancouver",
          lands_size: 4444,
          price: 3000000,
          property_type: PropertyType.RESIDENTIAL,
          realtor_id: 5
        }
      });
    });
  });
});
