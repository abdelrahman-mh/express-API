import { components, paths } from './schema';

export type GetType<T extends keyof components['schemas']> = components['schemas'][T];

//---------------------------------
// Requests & Responses
//---------------------------------
type StatusCodesResponses<T extends keyof paths, A extends keyof paths[T]> = 'responses' extends keyof paths[T][A]
  ? paths[T][A]['responses']
  : never;

type API<T extends keyof paths, A extends keyof paths[T], S extends keyof StatusCodesResponses<T, A> = never> = {
  parameters: 'parameters' extends keyof paths[T][A]
    ? {
        path: 'path' extends keyof paths[T][A]['parameters'] ? paths[T][A]['parameters']['path'] : undefined;
        query: 'query' extends keyof paths[T][A]['parameters'] ? paths[T][A]['parameters']['query'] : undefined;
      }
    : never;
  requestBody: 'requestBody' extends keyof paths[T][A]
    ? 'content' extends keyof paths[T][A]['requestBody']
      ? 'application/json' extends keyof paths[T][A]['requestBody']['content']
        ? paths[T][A]['requestBody']['content']['application/json']
        : undefined
      : undefined
    : undefined;
  responses: S extends never
    ? undefined
    : {
        statusCode: S;
        headers?: {
          [name: string]: unknown;
        };
        jsonContent: 'content' extends keyof StatusCodesResponses<T, A>[S]
          ? 'application/json' extends keyof StatusCodesResponses<T, A>[S]['content']
            ? StatusCodesResponses<T, A>[S]['content']['application/json']
            : undefined
          : undefined;
      };
};

export type RequestData<T extends keyof paths, A extends keyof paths[T]> = {
  body: API<T, A>['requestBody'];
  params: API<T, A>['parameters']['path'];
  query: API<T, A>['parameters']['query'];
};
export type RequestDataAsync<T extends keyof paths, A extends keyof paths[T]> = Promise<{
  body: API<T, A>['requestBody'];
  params: API<T, A>['parameters']['path'];
  query: API<T, A>['parameters']['query'];
}>;

export type ResponseData<T extends keyof paths, A extends keyof paths[T], S extends keyof StatusCodesResponses<T, A>> = API<
  T,
  A,
  S
>['responses'];
