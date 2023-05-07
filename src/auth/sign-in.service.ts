import { Injectable } from '@nestjs/common';
import { SignIn as SignInRequest } from '../protos/auth/request/sign_in_pb';
import { SignIn as SignInResponse } from '../protos/auth/response/sign_in_pb';
import { BaseService } from '../base.service';
import { isEmail, isNotEmpty } from 'class-validator';
import { ServiceValidator } from '../api.validation';
import { ApiErrorCode } from '../protos/api_error_pb';
import { User } from './user.entity';
import { dataSource } from '../datasource';

@Injectable()
export class SignInService extends BaseService<SignInRequest, SignInResponse> {
  readonly validators: ServiceValidator<SignInRequest>[] = [
    (proto: SignInRequest) => {
      if (isEmail(proto.identifier)) {
        return undefined;
      }
      return {
        key: 'identifier',
        message: 'Identifier is required',
        code: ApiErrorCode.AUTH_INVALID_IDENTIFIER,
      };
    },

    (proto: SignInRequest) => {
      if (isNotEmpty(proto.secret)) {
        return undefined;
      }
      return {
        key: 'secret',
        message: 'Secret is required',
        code: ApiErrorCode.AUTH_INVALID_SECRET,
      };
    },
  ];

  protected execute(): Promise<SignInResponse> {
    const user = this.getUser();
    if (!user) {
      this.addError('user', 'User not found', ApiErrorCode.AUTH_INVALID_USER);
      return;
    }
    return Promise.resolve(new SignInResponse({ authToken: 'token' }));
  }

  private getUser(): Promise<User> {
    return dataSource.getRepository(User).findOne({
      where: {
        email: this.proto.identifier,
      },
    });
  }
}
