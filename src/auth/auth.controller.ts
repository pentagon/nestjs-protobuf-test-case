import { Body, Controller, Delete, Post } from '@nestjs/common';
import { SignIn as SignInRequest } from '../protos/auth/request/sign_in_pb';
import { SignIn as SignInResponse } from '../protos/auth/response/sign_in_pb';
import { SignInService } from './sign-in.service';
import { ServiceValidationError } from "../api.validation";

@Controller('auth')
export class AuthController {
  constructor(private readonly signInService: SignInService) {}

  @Post('sign-in')
  signIn(@Body() signIn: SignInRequest): Promise<SignInResponse> {
    return new SignInService(signIn).run();
  }

  @Post('sign-up')
  signUp(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
