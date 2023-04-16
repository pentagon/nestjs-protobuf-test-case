import { Message } from '@bufbuild/protobuf';
import { ApiErrorCode } from './protos/api_error_pb';

export type ApiError = {
  key: string;
  message: string;
  code: ApiErrorCode;
};

export type ServiceValidator<T extends Message<T>> = (proto: T) => ApiError;

export class ServiceValidationError extends Error {
  readonly errors: ApiError[];

  constructor(errors: ApiError[]) {
    super('ERROR');
    this.errors = errors;
  }
}

export class ServiceExecutionError extends ServiceValidationError {
  constructor(errors: ApiError[]) {
    super(errors);
  }
}
