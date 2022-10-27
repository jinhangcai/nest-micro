import { Controller, Get, Ip, Req, Request, HostParam, Query } from "@nestjs/common";
import { PreService } from './pre.service';

@Controller('/pre')
export class PreController {
  constructor(private readonly PreService: PreService) {}

  @Get('preClassname')
  getHello(): string {
    return this.PreService.getHello();
  }
  @Get('list')
  getList(@Req() request: Request, @Ip() ip, @HostParam() hosts, @Query('key') key: string): string {
    console.log('request', ip, hosts, key)
    return this.PreService.getCat();
  }
}