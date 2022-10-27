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
import { Micro_SecondService } from './micro_second.service';
import { HttpService } from '@nestjs/axios';
import { createPostDto } from './dto/createPostDto';
// import { delPostDto } from './dto/delPostDto';
import { updatePostDto } from './dto/updatePostDto';
import { SSOHeaderEntity, SSOHeader } from '../../decorators/ssoHeader.decorator';
import { delPostDto } from "./dto/delPostDto";
// import { createPostDto } from './dto/createPostDto'

@ApiTags('/配置一级路由地址对应的二级路由地址')
@Controller('/microSecond')
export class Micro_SecondController {
  constructor(
              private readonly httpService: HttpService,
              private readonly Micro_SecondService: Micro_SecondService,
              ) {}

  @ApiQuery({name: 'name', required: false})
  @ApiQuery({name: 'id', required: false})
  @ApiResponse({
    status: 200,
    description: '获取二级menu菜单',
  })
  @Get('getRegister/pageList')
  pageList(@Query('name') name: string,
           @Query('id') id: string | number) {
    return this.Micro_SecondService.getMirco({name, id})
  }

  @ApiBody({ type:  createPostDto})
  @ApiResponse({
    status: 200,
    description: '新增二级menu菜单',
  })
  @Post('setRegister/pageList')
  setMicro(@Body() body: createPostDto) {
    return this.Micro_SecondService.createMicro(body)
  }


  @ApiBody({ type:  delPostDto})
  @ApiResponse({
    status: 200,
    description: '删除二级menu菜单',
  })
  @Post('deleteRegister/pageList')
  delMicro(@Body() body: delPostDto) {
    return this.Micro_SecondService.delMicro(body)
  }


  @ApiBody({ type:  updatePostDto})
  @ApiResponse({
    status: 200,
    description: '更新二级menu菜单',
  })
  @Post('updateRegister/pageList')
  updateMicro(@Body() Body: updatePostDto) {
    return this.Micro_SecondService.updateMicro(Body)
  }


  //
  // @ApiResponse({
  //   status: 200,
  //   description: '设置一级菜单',
  // })
  // @ApiBody({ type: createPostDto })
  // @Post('setRegister/pageList')
  // setMicro(@Body() Body : createPostDto) {
  //   return this.Micro_secondService.setMicro(Body)
  // }
  //
  //
  // @ApiBody({ type:  delPostDto})
  // @ApiResponse({
  //   status: 200,
  //   description: '删除一级menu菜单',
  // })
  // @Post('deleteRegister/pageList')
  // delMicro(@Body() Body: delPostDto) {
  //   return this.Micro_secondService.delMicro(Body)
  // }
  //
  //
  //
  // @ApiBody({ type:  updatePostDto})
  // @ApiResponse({
  //   status: 200,
  //   description: '更新一级menu菜单',
  // })
  // @Post('updateRegister/pageList')
  // updateMicro(@Body() Body: updatePostDto) {
  //   return this.Micro_secondService.updateMicro(Body)
  // }
}