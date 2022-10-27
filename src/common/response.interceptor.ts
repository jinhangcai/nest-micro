import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

interface Response<T> {
  data: T;
}
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    // 解析ExecutionContext的数据内容
    const cxt = context.switchToHttp();
    const request = cxt.getRequest();
    const response = cxt.getResponse();
    console.log('进入响应拦截器 重新改修response',response.statusCode)
    return next.handle().pipe((
      map(data => {
        return {
          code: response.statusCode === 201 ? 200 : response.statusCode,
          message: true,
          data,
        }
      })
    ));
  }
}