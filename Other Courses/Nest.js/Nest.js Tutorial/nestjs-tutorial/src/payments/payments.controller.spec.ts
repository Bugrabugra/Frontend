import { Test, TestingModule } from "@nestjs/testing";
import { PaymentsController } from "./payments.controller";
import { Request, Response } from "express";
import { PaymentsService } from "./payments.service";
import { BadRequestException } from "@nestjs/common";

describe("PaymentsController", () => {
  let controller: PaymentsController;
  let paymentsService: PaymentsService;

  const requestMock = {
    query: {}
  } as unknown as Request;

  const statusResponseMock = {
    send: jest.fn((x) => x)
  };

  const responseMock = {
    status: jest.fn(() => statusResponseMock),
    send: jest.fn((x) => x)
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [PaymentsService]
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
    paymentsService = module.get<PaymentsService>(PaymentsService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("paymentsService should be defined", () => {
    expect(paymentsService).toBeDefined();
  });

  describe("getPayments", () => {
    it("should return a status of 400", async () => {
      await controller.getPayments(requestMock, responseMock);
      expect(responseMock.status).toHaveBeenCalledWith(400);
      expect(statusResponseMock.send).toHaveBeenCalledWith({
        msg: "Missing count or page query parameter"
      });
    });

    it("should return a status of 200 when query params are present", () => {
      requestMock.query = {
        count: "10",
        page: "1"
      };

      controller.getPayments(requestMock, responseMock);
      expect(responseMock.send).toHaveBeenCalledWith(200);
    });
  });

  describe("createPayment", () => {
    it("should throw an error", async () => {
      jest
        .spyOn(paymentsService, "createPayment")
        .mockImplementationOnce(() => {
          throw new BadRequestException();
        });

      try {
        await controller.createPayment({
          email: "anson@gmail.com",
          price: 100
        });
      } catch (error) {
        console.log(error);
      }
    });
  });
});
