import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.databaseService.employee.create({
      data: createEmployeeDto,
    });
  }

  findAll(role?: "INTERN" | "ENGINEER" | "ADMIN") {
    if (role) {
      return this.databaseService.employee.findMany({
        where: {
          role,
        },
      });
    }

    return this.databaseService.employee.findMany();
  }

  findOne(id: number) {
    return this.databaseService.employee.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.databaseService.employee.update({
      data: updateEmployeeDto,
      where: {
        id,
      },
    });
  }

  remove(id: number) {
    return this.databaseService.employee.delete({
      where: {
        id,
      },
    });
  }
}
