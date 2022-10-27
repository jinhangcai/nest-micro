import { Module, NestModule, MiddlewareConsumer  } from '@nestjs/common';
import { LoggerMiddleware } from '../../common/logger.middleware'
import { Micro_ApplyController } from './micro_apply.controller';
import { Micro_ApplyService } from './micro_apply.service';
import { HttpModule } from "@nestjs/axios";
import { HttpConfigService } from "../../http-config/HttpConfigService";
import { Micro_search_routeEntity } from "../../entitites/micro_search_route.entity";
import { Micro_search_AppsEntity } from "../../entitites/micro_search_apps.entity";
import { Micro_register_routeEntity } from '../../entitites/micro_register_route.entity';

import { TypeOrmModule } from "@nestjs/typeorm";

// 引入preModule 引入http请求初始化配置
// 每一个Entity文件都必须在其对应的子模块中imports导入并使用TypeOrmModule.forFeature([])注册。
@Module({
  imports: [HttpModule.registerAsync({
    useClass: HttpConfigService,
  }),
    TypeOrmModule.forFeature([Micro_search_AppsEntity]),
    TypeOrmModule.forFeature([Micro_search_routeEntity]),
    TypeOrmModule.forFeature([Micro_register_routeEntity]),
  ],
  controllers: [Micro_ApplyController],
  providers: [Micro_ApplyService],
  // exports: [PreService]
})
export class Micro_ApplyModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('prod/:catName') //指定中间件的应用路径/cats/:catName
    //也可以通过如下方式指定包含中间件的请求方法
    // .forRoutes({ path: 'cats', method: RequestMethod.GET });
    // 通过exclude和路径方法来排除特定路径
    //.exclude(
    //{ path: 'cats', method: RequestMethod.GET },)
  }
}
