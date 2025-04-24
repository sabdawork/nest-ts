import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface StandardResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, StandardResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<StandardResponse<T>> {
    const response = context.switchToHttp().getResponse();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((result) => {
        if (typeof result === 'string') return result;

        const data = result ?? { message: 'No Data' };
        const { page, limit, total, message } = data;

        return {
          data: data?.data ?? data,
          statusCode,
          haveError: false,
          message: message != null ? message : 'Success',
          ...result,
          ...(page !== undefined && { page }),
          ...(limit !== undefined && { limit }),
          ...(total !== undefined && { total }),
        };
      }),
    );
  }
}
