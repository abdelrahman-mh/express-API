const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers'],
};

// Exporting roles array, extracting keys from allRoles object
export const roles = Object.keys(allRoles);
console.log(roles);

// Constructing a Map from allRoles where Object.entries is not used
// export const roleRights = new Map(
//   Object.keys(allRoles).map(key => [key, allRoles[key]])
// );

// // Testing the output
// console.log(roleRights);
