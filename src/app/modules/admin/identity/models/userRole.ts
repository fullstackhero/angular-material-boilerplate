export interface UserRole
{
  userRoles: UserRoleModel[];
}
export interface UserRoleModel {
  roleId: string;
  roleName: string;
  selected: boolean;
}
