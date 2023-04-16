import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SignInService } from './sign-in.service';
import { DbModule } from '../db.module';
import { userProvider } from './user.provider';

@Module({
  imports: [DbModule],
  controllers: [AuthController],
  providers: [...userProvider, SignInService],
})
export class AuthModule {}
