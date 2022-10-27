import {
  Controller,
  Param,
  ParseIntPipe,
  DefaultValuePipe,
  ParseUUIDPipe,
  Get,
  Ip,
  Req,
  Request,
  HostParam,
  Query,
  Body,
  Res, Post
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth,  ApiBody, ApiParam, ApiQuery, ApiResponse, ApiProperty } from '@nestjs/swagger';
import { ProdService } from './prod.service';
import { PreService } from "../pre/pre.service";
import { HttpService } from '@nestjs/axios';
import { ConfigService } from "@nestjs/config";
import { SSOHeaderEntity, SSOHeader } from '../../decorators/ssoHeader.decorator';
import { createPostDto } from './dto/createPostDto'
import { Hello, UserRole } from './classes/hello';
// import { Micro_search_routeEntity } from "../../entitites/micro_search_route.entity";

/*
  ApiBearerAuth  身份认证  配合jwt  暂时不知道怎么用
  ApiTags   给swagger添加分类 表示 下面的方法都在prod分类下
  ApiBody   暂时知道可以添加描述
  ApiQuery  可以给get方法添加入参 以及是否必填  enum枚举等
  ApiResponse  添加response返回状态
  ApiProperty  暂未可知
 */
// @ApiBearerAuth()
@ApiTags('/prod')
@Controller('/prod')
export class ProdController {
  // 引入PreService 实现service共享
  constructor(
              private readonly httpService: HttpService,
              private readonly ProdService: ProdService,
              private readonly PreService: PreService,
              private configService: ConfigService,
              ) {}

  @Get('classname')
  getHello(@Query('query') query: number,
           @Query('name') name: string) {
    return this.ProdService.getHello(query, name);
  }

  @Get('getAxios')
  getAxios(@Query() query: createPostDto, @SSOHeader() ssoHeader: SSOHeaderEntity,) {
    return this.ProdService.getAxios(query, ssoHeader);
  }

  @ApiBody({ description: '填写更新内容' })
  @Post('postAxios')
  PostAxios(@Body() Body: createPostDto, @SSOHeader() ssoHeader: SSOHeaderEntity,) {
    console.log('body', Body)
    return this.ProdService.getAxios(Body, ssoHeader);
  }
  // @ApiParam({ name: 'id' })
  @ApiQuery({ name: 'key', required: false, enum: UserRole })
  @ApiResponse({
    status: 200,
    description: 'get ...',
    type: Hello,
  })
  @Get('list')
  getList(@Req() request: Request, @Ip() ip, @HostParam() hosts, @Query('key') key: string): string {
    console.log('request', ip, hosts, key)
    return this.ProdService.getCat();
  }
  @Get('getMysql')
  getMysql() {
    return this.ProdService.getMysql()
  }

  @Post('setMysql')
  setMysql(@Body() param) {
    const newParam = { ...param, status: true };
    return this.ProdService.setMysql(newParam)
  }

  @Get('delMysql')
  delMysql(@Query('id') id: number) {
    return this.ProdService.delMysql(id)
  }
  @Post('updateMysql')
  updateMysql(@Body() Body) {
    return this.ProdService.updateMysql(Body)
  }
  @Get('Err')
  getErr(): unknown {
    return this.ProdService.getErr();
  }
  @Get('/sendEmail')
  sendEmail(): string {
    this.ProdService.sendEmail();
    return 'Message sent';
  }
}