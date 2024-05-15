import { Request, Response } from "express";
import { CreateUserDto } from "../dtos/CreateUser.dto";
import { CreateUserQueryParams } from "../types/query-params";
import { User } from "../types/response";

export function getUsers(request: Request, response: Response) {
  response.send([]);
}

export function getUserById(request: Request, response: Response) {
  response.send({});
}

export function createUser(request: Request<object, object, CreateUserDto, CreateUserQueryParams>, response: Response<User>) {
  response.status(201).send({ id: 1, username: "anson", email: "b@g.com" });
}
