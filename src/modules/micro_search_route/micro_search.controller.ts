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
import { createPostDto } from './dto/createPostDto';
import { delPostDto } from './dto/delPostDto';
import { updatePostDto } from './dto/updatePostDto';
import { SSOHeaderEntity, SSOHeader } from '../../decorators/ssoHeader.decorator';
import { Micro_SearchService } from "./micro_search.service";

@ApiTags('/配置微应用地址')
@Controller('/microSearch')
export class Micro_SearchController {
  constructor(
              private readonly httpService: HttpService,
              private readonly Micro_SearchService: Micro_SearchService,
              ) {}


  @ApiResponse({
    status: 200,
    description: '获取微应用配置菜单',
  })
  @Get('getRegister/pageList')
  pageList() {
    return this.Micro_SearchService.getMirco()
  }

  @ApiBody({ type: createPostDto })
  @ApiResponse({
    status: 200,
    description: '新增微应用配置菜单',
  })
  @Post('setSearch/pageList')
  setMicro(@Body() body: createPostDto) {
    return this.Micro_SearchService.createMicro(body)
  }


  @ApiBody({ type:  delPostDto})
  @ApiResponse({
    status: 200,
    description: '删除微应用配置菜单Route',
  })
  @Post('deleteSearchRoute/pageList')
  delMicroRoute(@Body() body: delPostDto) {
    return this.Micro_SearchService.delMicroRoute(body)
  }

  @ApiBody({ type:  delPostDto})
  @ApiResponse({
    status: 200,
    description: '删除微应用配置菜单Apps',
  })
  @Post('deleteSearchApps/pageList')
  delMicroApps(@Body() body: delPostDto) {
    return this.Micro_SearchService.delMicroApps(body)
  }


  @ApiBody({ type:  updatePostDto})
  @ApiResponse({
    status: 200,
    description: '更新微应用配置菜单 type=1 设置route type=2 设置apps',
  })
  @Post('updateSearch/pageList')
  updateMicro(@Body() body: updatePostDto) {
    return this.Micro_SearchService.updateMicro(body)
  }
}