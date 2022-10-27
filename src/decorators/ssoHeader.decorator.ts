import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AxiosRequestHeaders } from 'axios';
// 设置headers头
export interface SSOHeaderEntity extends AxiosRequestHeaders {
  appCode: string;
  token: string;
  sign: string;
  env: string;
}

export const SSOHeader = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const { headers } = ctx.switchToHttp().getRequest<Request>();
    return {
      appCode: headers['appcode'] || 'APP_RCAAJP',
      token: headers['token'] || 'eyJhbGciOiJIUzI1NiJ9.eyJlbXBsb3lOdW0iOjUwMTEsInN1YiI6IjUwMTEiLCJwaG9uZU51bSI6IiIsImF2YXRhciI6IiIsInVzZXJSb2xlTGlzdCI6W3siaWQiOjIwMiwiYXBwQ29kZSI6IkFQUF9SQ0FBSlAiLCJuYW1lIjoi5bqU55So5p2D6ZmQ566h55CG5ZGYIiwic29ydCI6MSwiZGVzY3JpcHRpb24iOiLns7vnu5_oh6rliqjnlJ_miJDop5LoibIiLCJjb2RlIjoiQVBQX1JDQUFKUF9BRE1JTklTVFJBVE9SIn1dLCJzdXBlcmlvcklkIjpudWxsLCJsb2dpbkNvdW50Ijo1MTksImxhc3RMb2dpbklwIjoiMTcyLjE3LjEwLjYzLCAxMC43Ny45OS42NyIsInJlYWxOYW1lIjoi6JSh6L-b5p2tIiwibGFzdExvZ2luVGltZSI6MTY2MzY1ODA5ODAwMCwiZW52aXJvbm1lbnQiOiJzaXQiLCJwb3N0IjoiUkQiLCJuaWNrbmFtZSI6IiIsInJhbmsiOiIiLCJpZCI6MzkzNywidXNlckRlcGFydG1lbnRMaXN0IjpbXSwiZXhwIjoxNjYzNjY1NjcxLCJpYXQiOjE2NjM2NTg0NzEsImFjY291bnQiOiI1MDExIiwiZW1haWwiOiJjYWlqaW5oYW5nQG1pc3RvbmcuY29tIiwianRpIjoiMTY2MzY1ODQ3MTA3MiIsInRpbWVzdGFtcCI6MTY2MzY1ODQ3MX0.vKlm0Y-99Rvzgvz4smfhvU4rjWuAdGOC8brAiBPjeKY',
      sign: headers['sign'] || '46ec8990d04584bd5162ebc16612649848a738f74befdf3473705fe61fd6732fc7f9631fc9c665b981e52ef361ea4ad40db12ee03aa377841e7de685ecf3d7c7',
      env: headers['env'] || 'sit',
      cookie: headers['cookie']
    };
  },
);
