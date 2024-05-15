import { Request, Response } from "express";

export const mockRequests = {} as Request;

export const mockResponse = {
  send: jest.fn()
} as unknown as Response;
