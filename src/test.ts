const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers'],
};

export const roles: string[] = Object.keys(allRoles);
console.log(roles);
export const roleRights: Map<string, string[]> = new Map(Object.entries(allRoles));
