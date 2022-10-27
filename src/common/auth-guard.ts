import { Injectable, CanActivate, HttpException, HttpStatus, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SSOHeader } from '../decorators/ssoHeader.decorator'

@Injectable()
export class AuthGuard implements CanActivate {
  // constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const roles = this.reflector.get<string[]>('roles', context.getHandler());
    // if (!roles) {
    //   return true;
    // }
    // 获取请求对象
    const request = context.switchToHttp().getRequest();
    // 获取token
    const token = context.switchToRpc().getData().headers.cookie;
    const appCode = context.switchToRpc().getData().headers.appCode;
    const sign = context.switchToRpc().getData().headers.sign;
    const env = context.switchToRpc().getData().headers.env;
    // 白名单过滤
    console.log('进入权限守卫 校验token 或者白名单', request.url, appCode, sign, env)
    if (this.hasUrl(this.urlList,request.url)) {
      return true;
    }
    // 验证token合法性
    // console.log('token', token, request.url)
    if (token) {
       try {
         // 验证机制
         return true
       } catch (e) {
         throw new HttpException('没有授权访问，请先登录', HttpStatus.UNAUTHORIZED)
       }
    } else {
      throw new HttpException({
        error: '没有授权访问，请先登录'
      }, HttpStatus.UNAUTHORIZED)
    }
  }

  // 白名单组
  private urlList: string [] = ['/prod/list']
  // 验证该请求是否为白名单内的路由
  public hasUrl(urlList: string[], url: string) : boolean {
    let flag: boolean = false;
    if (urlList.indexOf(url) >= 0) {
      return true;
    }
    return  false;
  }
}