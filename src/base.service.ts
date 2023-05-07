import { Message } from '@bufbuild/protobuf';
import {
  ApiError,
  ServiceValidator,
  ServiceValidationError,
  ServiceExecutionError,
} from './api.validation';
import { ApiErrorCode } from './protos/api_error_pb';

export class BaseService<T extends Message<T>, R extends Message<R>> {
  protected readonly proto: T;
  protected readonly validators: ServiceValidator<T>[] = [];
  protected readonly errors: ApiError[] = [];

  constructor(proto: T) {
    this.proto = proto;
  }

  public async run(): Promise<R> {
    if (!this.isValid) {
      throw new ServiceValidationError(this.errors);
    }

    const result = this.execute();

    if (this.errors.length > 0) {
      throw new ServiceExecutionError(this.errors);
    }

    return result;
  }

  protected get isValid(): boolean {
    const results = this.validators.reduce<ApiError[]>((a, validator) => {
      const error = validator(this.proto);

      if (error) {
        a.push(error);
      }
      return a;
    }, []);

    this.errors.length = 0;
    this.errors.push(...results);

    return this.errors.length === 0;
  }

  protected execute(): Promise<R> {
    throw new Error('Override me');
  }

  protected addError(key: string, message: string, code: ApiErrorCode): void {
    this.errors.push({ key, message, code });
  }
}
