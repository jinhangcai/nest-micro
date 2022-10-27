import { Injectable } from '@nestjs/common';

@Injectable()
export class SitService {
  getHello(): string {
    return 'Hello World!';
  }
  getCat(): string {
    return 'Hello cats'
  }
}
