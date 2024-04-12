const allRoles = {
  user: [],
  admin: ['read', 'write'],
};

export const Roles: string[] = Object.keys(allRoles);
export const RoleRights: Map<string, string[]> = new Map(Object.entries(allRoles));
