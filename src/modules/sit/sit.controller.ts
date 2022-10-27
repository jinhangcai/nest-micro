import { Controller, Get, Ip, Req, Request, HostParam, Query } from "@nestjs/common";
import { SitService } from './sit.service';

@Controller()
export class SitController {
  constructor(private readonly SitService: SitService) {}

  @Get()
  getHello(): string {
    return this.SitService.getHello();
  }
}
@Controller('cat')
export class SitCatController {
  constructor(private readonly appService: SitService) {}

  @Get('list')
  getHello(@Req() request: Request, @Ip() ip, @HostParam() hosts, @Query('key') key: string): string {
    console.log('request', ip, hosts, key)
    return this.appService.getCat();
  }
}