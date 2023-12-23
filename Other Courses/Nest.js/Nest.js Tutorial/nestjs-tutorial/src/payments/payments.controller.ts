import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { PaymentsService } from "./payments.service";
import { CreatePaymentDto } from "./dto/CreatePayment.dto";

@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  getPayments(@Req() request: Request, @Res() response: Response) {
    const { count, page } = request.query;

    if (!count || !page) {
      response
        .status(400)
        .send({ msg: "Missing count or page query parameter" });
    } else {
      response.send(200);
    }
  }

  @Post("create")
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    try {
      const response =
        await this.paymentsService.createPayment(createPaymentDto);
      return response;
    } catch (error) {
      return error;
    }
  }
}
