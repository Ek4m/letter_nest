import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ValidationError } from 'sequelize';
import { Response } from 'express';

@Catch(ValidationError)
export class ValidationErrorFilter implements ExceptionFilter {
  catch(exception: ValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const mapped = {};
    exception.errors.forEach((elem) => {
      mapped[elem.path] = elem.message;
    });
    response.status(400).json(mapped);
  }
}
