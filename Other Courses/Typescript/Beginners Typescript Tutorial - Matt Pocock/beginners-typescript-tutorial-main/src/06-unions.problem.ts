type User = {
  id: number;
  firstName: string;
  lastName: string;
  /**
   * How do we ensure that role is only one of:
   * - 'admin'
   * - 'user'
   * - 'super-admin'
   */
} & UserRoleAttributes;

type UserRoleAttributes =
  { role: "user"; } |
  { role: "admin"; adminPassword: string; } |
  { role: "super-admin", superAdminPassword: string; }

type Role = UserRoleAttributes["role"];


export const defaultUser: User = {
  id: 1,
  firstName: "Matt",
  lastName: "Pocock",
  role: "admin",
  adminPassword: "xxx"
};
