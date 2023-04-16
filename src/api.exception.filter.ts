import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ServiceExecutionError, ServiceValidationError } from "./api.validation";
import { Response } from 'express';

@Catch(ServiceValidationError)
export class ServiceValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ServiceValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.UNPROCESSABLE_ENTITY).json(exception.errors);
  }
}

@Catch(ServiceExecutionError)
export class ServiceExecutionExceptionFilter implements ExceptionFilter {
  catch(exception: ServiceExecutionError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.UNPROCESSABLE_ENTITY).json(exception.errors);
  }
}
