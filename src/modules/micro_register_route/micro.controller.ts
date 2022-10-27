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
import { MicroService } from './micro.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from "@nestjs/config";
import { createPostDto } from './dto/createPostDto';
import { DelPostDto } from './dto/delPostDto';
import { updatePostDto } from './dto/updatePostDto';
import { SSOHeaderEntity, SSOHeader } from '../../decorators/ssoHeader.decorator';
// import { createPostDto } from './dto/createPostDto'
// import { Hello, UserRole } from './classes/hello';
// import { Micro_search_routeEntity } from "../../entitites/micro_search_route.entity";
import { UserRole } from "../prod/classes/hello";

/*
  ApiBearerAuth  身份认证  配合jwt  暂时不知道怎么用
  ApiTags   给swagger添加分类 表示 下面的方法都在prod分类下
  ApiBody   暂时知道可以添加描述
  ApiQuery  可以给get方法添加入参 以及是否必填  enum枚举等
  ApiResponse  添加response返回状态
  ApiProperty  暂未可知
 */
// @ApiBearerAuth()
@ApiTags('/配置一级路由地址')
@Controller('/micro')
export class MicroController {
  constructor(
              private readonly httpService: HttpService,
              private readonly MicroService: MicroService,
              private configService: ConfigService,
              ) {}

  @ApiQuery({name: 'name', required: false})
  @ApiResponse({
    status: 200,
    description: '获取一级menu所有菜单',
  })
  @Get('getRegister/pageList')
  pageList(@Query('name') name: string) {
    return this.MicroService.getMirco(name)
  }


  @ApiResponse({
    status: 200,
    description: '设置一级菜单',
  })
  @ApiBody({ type: createPostDto })
  @Post('setRegister/pageList')
  setMicro(@Body() Body : createPostDto) {
    return this.MicroService.setMicro(Body)
  }


  @ApiBody({ type:  DelPostDto})
  @ApiResponse({
    status: 200,
    description: '删除一级menu菜单',
  })
  @Post('deleteRegister/pageList')
  delMicro(@Body() Body: DelPostDto) {
    console.log('body', Body);
    return this.MicroService.delMicro(Body)
  }



  @ApiBody({ type:  updatePostDto})
  @ApiResponse({
    status: 200,
    description: '更新一级menu菜单',
  })
  @Post('updateRegister/pageList')
  updateMicro(@Body() Body: updatePostDto) {
    return this.MicroService.updateMicro(Body)
  }
}