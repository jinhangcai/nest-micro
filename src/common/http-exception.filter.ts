import { ExceptionFilter, Catch, ArgumentsHost,Logger, HttpException, HttpStatus, } from '@nestjs/common';
import { AxiosError } from "axios";

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  // exception 当前正在处理的异常对象
  // host 传递给原始处理程序的参数(request/response)的引用
  catch(exception: any, host: ArgumentsHost) {
    console.log('进入异常程序 进行错误捕捉处理')
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    let msgLog = {
      code: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      // message: message || '请求失败',
      error: ''
    }
    console.log('判断指向', exception instanceof HttpException,
      exception instanceof AxiosError,
      exception instanceof Error, status)
    if (exception instanceof HttpException) {
      // @ts-ignore
      const { error, message } = exception.getResponse()
      msgLog['message'] = message;
      msgLog['error'] = error;
    } else if (exception instanceof AxiosError) {
      msgLog['code'] = exception.code ? Number(exception.code) : exception.response.status;
      msgLog['error'] = exception.response?.data?.error;
      msgLog['message'] = exception.message;
    } else if (exception instanceof Error) {
      const userResult= exception.message.replace(/\"/g, "").trim()
      msgLog['code'] = status
      msgLog['error'] = exception.name
      msgLog['message'] = JSON.stringify(userResult)
    }

    Logger.error('错误信息',JSON.stringify(msgLog), 'httpExceptionFilter')
    response.status(status).json(msgLog);
  }
}