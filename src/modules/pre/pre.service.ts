import { Injectable } from '@nestjs/common';

@Injectable()
export class PreService {
  getHello(): string {
    return 'Hello World!';
  }
  getCat(): string {
    return 'Hello cats'
  }
  getName() : string {
    return 'getName zzz'
  }
}
