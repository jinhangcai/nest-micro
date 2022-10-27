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
import { HttpService } from '@nestjs/axios';
// import { createPostDto } from './dto/createPostDto';
// import { delPostDto } from './dto/delPostDto';
// import { updatePostDto } from './dto/updatePostDto';
import { SSOHeaderEntity, SSOHeader } from '../../decorators/ssoHeader.decorator';
import { Micro_ApplyService } from './micro_apply.service';

@ApiTags('/获取微应用配置信息')
@Controller('/microApply')
export class Micro_ApplyController {
  constructor(
              private readonly httpService: HttpService,
              private readonly Micro_ApplyService: Micro_ApplyService,
              ) {}


  @ApiResponse({
    status: 200,
    description: '获取微应用配置菜单',
  })
  @Get('getRoute/pageList')
  pageList() {
    return this.Micro_ApplyService.getMirco()
  }

  @ApiResponse({
    status: 200,
    description: '获取微应用配置菜单',
  })
  @Get('getRoute/limits')
  pageRoute() {
    return this.Micro_ApplyService.getRoute()
  }
}