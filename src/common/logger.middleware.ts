import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // 一般中间件可以用于重写req 或者一些其他需要的处理
  use(req: Request, res: Response, next: NextFunction) {
    // console.log('Request...', req.headers.cookie);
    next();
  }
}