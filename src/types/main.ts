import { components, paths } from './schema';
//---------------------------------
// Schema
//---------------------------------
export type Note = components['schemas']['Note'];
export type NewNote = components['schemas']['NewNote'];
export type UpdateNote = components['schemas']['UpdateNote'];

export type User = components['schemas']['User'];
export type NewUser = components['schemas']['NewUser'];
export type UpdateUser = components['schemas']['UpdateUser'];

//---------------------------------
// Requests
//---------------------------------

export type RequestData<T extends keyof paths, A extends keyof paths[T]> = {
  body: 'requestBody' extends keyof paths[T][A]
    ? 'content' extends keyof paths[T][A]['requestBody']
      ? 'application/json' extends keyof paths[T][A]['requestBody']['content']
        ? paths[T][A]['requestBody']['content']['application/json']
        : undefined
      : undefined
    : undefined;
  params: 'parameters' extends keyof paths[T][A]
    ? 'path' extends keyof paths[T][A]['parameters']
      ? paths[T][A]['parameters']['path']
      : undefined
    : undefined;
  query: 'parameters' extends keyof paths[T][A]
    ? 'query' extends keyof paths[T][A]['parameters']
      ? paths[T][A]['parameters']['query']
      : undefined
    : undefined;
};

// create a generic type here return: body, path, query, but if they exist and not equal never

// so the type will be like this:
//   type RequestData<T, A> = {
//   body: paths[T][A]['requestBody']['content']['application/json'];
//   path: paths[T][A]['parameters']['path'];
//   query: paths[T][A]['parameters']['query'];
// };

// if the body and query not exist the type will be this:
//   type RequestData<T, A> = {
//   path: paths[T][A]['parameters']['path'];
// };

// make it without type checking Errors

// interface Path {
//   '/user/{id}': {
//     /** Retrieve a user by ID */
//     get: {
//       parameters: {
//         query?: never;
//         header?: never;
//         path: {
//           /** @description ID of the user to retrieve */
//           userId: string;
//         };
//         cookie?: never;
//       };
//       requestBody?: never;
//       responses: {
//         /** @description Successful operation */
//         200: {
//           headers: {
//             [name: string]: unknown;
//           };
//           content: {
//             'application/json': components['schemas']['User'];
//           };
//         };
//         404: components['responses']['ResourceNotFoundError'];
//         500: components['responses']['InternalServerError'];
//       };
//     };
//     /** Update a user */
//     put: {
//       parameters: {
//         query?: never;
//         header?: never;
//         path: {
//           /** @description ID of the user to update */
//           userId: string;
//         };
//         cookie?: never;
//       };
//       requestBody: {
//         content: {
//           'application/json': components['schemas']['UpdateUser'];
//         };
//       };
//       responses: {
//         /** @description User updated successfully */
//         200: {
//           headers: {
//             [name: string]: unknown;
//           };
//           content: {
//             'application/json': components['schemas']['User'];
//           };
//         };
//         400: components['responses']['BadRequest'];
//         404: components['responses']['ResourceNotFoundError'];
//         500: components['responses']['InternalServerError'];
//       };
//     };
//     post?: never;
//     /**
//      * Delete a user
//      * @description Deletes the user identified by the userId parameter.
//      */
//     delete: {
//       parameters: {
//         query?: never;
//         header?: never;
//         path: {
//           /** @description ID of the user to delete */
//           userId: string;
//         };
//         cookie?: never;
//       };
//       requestBody?: never;
//       responses: {
//         /** @description User deleted successfully */
//         204: {
//           headers: {
//             [name: string]: unknown;
//           };
//           content?: never;
//         };
//         404: components['responses']['ResourceNotFoundError'];
//         500: components['responses']['InternalServerError'];
//       };
//     };
//     options?: never;
//     head?: never;
//     patch?: never;
//     trace?: never;
//   };
//   '/notes': {
//     /** Get all notes */
//     get: {
//       parameters: {
//         query?: never;
//         header?: never;
//         path?: never;
//         cookie?: never;
//       };
//       requestBody?: never;
//       responses: {
//         /** @description OK */
//         200: {
//           headers: {
//             [name: string]: unknown;
//           };
//           content: {
//             'application/json': components['schemas']['Note'][];
//           };
//         };
//         401: components['responses']['AuthenticationError'];
//         500: components['responses']['InternalServerError'];
//       };
//     };
//     put?: never;
//     /** Create a new note */
//     post: {
//       parameters: {
//         query?: never;
//         header?: never;
//         path?: never;
//         cookie?: never;
//       };
//       requestBody: {
//         content: {
//           'application/json': components['schemas']['NewNote'];
//         };
//       };
//       responses: {
//         /** @description Note created successfully */
//         201: {
//           headers: {
//             [name: string]: unknown;
//           };
//           content: {
//             'application/json': components['schemas']['Note'];
//           };
//         };
//         400: components['responses']['BadRequest'];
//         401: components['responses']['AuthenticationError'];
//         500: components['responses']['InternalServerError'];
//       };
//     };
//     delete?: never;
//     options?: never;
//     head?: never;
//     patch?: never;
//     trace?: never;
//   };
// }

// export type CreateUserREQ = {
//   body: paths['/users']['post']['requestBody']['content']['application/json'];
//   path: paths['/users']['post']['parameters'];
//   query: paths['/users']['post']['parameters']['query'];
// };

// export type GetUsersREQ = {
//   body: paths['/users']['get']['requestBody'];
//   path: paths['/users']['get']['parameters']['path'];
//   query: paths['/users']['get']['parameters']['query'];
// };
// export type UpdateUserREQ = {
//   body: paths['/users/{id}']['put']['requestBody']['content']['application/json'];
//   path: paths['/users/{id}']['put']['parameters']['path'];
//   query: paths['/users/{id}']['put']['parameters']['query'];
// };
