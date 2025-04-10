import {Role} from "@/classes/role";
import {Entity} from "@/interfaces/entity";

export class User implements Entity{
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: Role;
  permissions: string[];

  constructor(
    id: number = 0,
    first_name: string = "",
    last_name: string = "",
    email: string = "",
    role: Role = new Role(),
    permissions: string[] = []
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.role = role;
    this.permissions = permissions;
  }

  get name() {
    return this.first_name + " " + this.last_name;
  }

  canView(page: string) {
    return this.permissions.some(p => p === `view_${page}`);
  }

  canEdit(page: string) {
    return this.permissions.some(p => p === `edit_${page}`);
  }
}