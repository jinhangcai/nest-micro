import * as path from 'path';
import { Module,  } from '@nestjs/common';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { MailerModule } from '@nest-modules/mailer';
import { SitModule } from "./modules/sit/sit.module";
import { PreModule } from "./modules/pre/pre.module";
import { ProdModule } from "./modules/prod/prod.module";
import { MicroModule } from './modules/micro_register_route/micro.module'
import { EmailModule } from './modules/email/email.module'
import { Micro_SecondModule } from './modules/micro_register_route_second/micro_second.module'
import { Micro_SearchModule } from './modules/micro_search_route/micro_search.module'
import { Micro_ApplyModule } from './modules/micro_apply/micro_apply.module'
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TerminusModule } from '@nestjs/terminus';
import { resolve } from "path";
import { HealthController } from './health/health.controller';
import { IS_DEV } from './config/configuration';

// imports: 导入模块的列表，这些模块导出了此模块中所需提供者 简单来说就是导入了所需要的数据(比如把接口分类成个人，班级，年纪 然后在这里汇总)
// controllers: 控制器 一般用于标识接口的入口文件
// providers: nest注入的实例化提供内容  简单来说就是 入口文件获取到接口 处理数据的文件
// exports 导出给其他模块使用 比如说 需要把 AppService的方法 暴露出给其他模块使用 则可以exports:[AppService]
// 拓展
// 发起请求顺序  发起请求=>中间件=>守卫=>拦截器=>管道=>执行方法=>拦截器(判断是否走异常过滤器) => 结束
// 1：如 middleware中间件(中间件是在路由处理程序 之前 调用的函数  一般中间件可以用于重写req 或者一些其他需要的处理)
// 2: 守卫auth-guard(对于请求进行校验 如是否携带cookie token 或者设置白名单等)
// 2：管道pipe(管道是对数据进行校验 转换的工具 如果校验失败 则会进入过滤器)
// 3：http-exception.filter过滤器(错误监听)
// SitModule, PreModule, ProdModule, Micro_SearchModule
//
@Module({
  imports: [EmailModule,MicroModule, Micro_SecondModule, Micro_SearchModule, Micro_ApplyModule,
    ConfigModule.forRoot({
    isGlobal: true, // 全局注入
    envFilePath: ['.env.local', '.env'], // 读取.env配置文件 配置环境变量 只作用本地 上传时忽略.env文件
    load:[configuration]  // 加载配置文件
  }),
    TerminusModule,
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: 'smtps://654870345@qq.com:dlbeohdjjokibajh@smtp.qq.com',
        defaults: {
          from: '"nest-modules" <modules@nestjs.com>',
        },
        template: {
          dir: path.join(__dirname, './templates/email'),
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      })
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log( 'configService', configService.get('config.datasource.host'));
        return {
          type: 'mysql', // 数据库类型
          host: String(configService.get('config.datasource.host')), // 数据库ip地址
          port: Number.parseInt(configService.get('config.datasource.port') ?? '3306'),  // 端口
          username: String(configService.get('config.datasource.username')), // 登录名
          password: String(configService.get('config.datasource.password')), // 密码
          database: String(configService.get('config.datasource.database')), // 数据库名称
          entities: [__dirname + '/**/*.entity{.ts,.js}'], // 扫描本项目中.entity.ts或者.entity.js的文件
          logging: configService.get('config.datasource.logging'),
          timezone: '+08:00', // 东八区
          synchronize: process.env.APP_ENV === 'sit', // 定义数据库表结构与实体类字段同步(这里一旦数据库少了字段就会自动加入,根据需要来使用)
          cache: {
            duration: 60000, // 1分钟的缓存
          },
          extra: {
            // poolMax: 32,
            // poolMin: 16,
            // queueTimeout: 60000,
            // pollPingInterval: 60, // 每隔60秒连接
            // pollTimeout: 60, // 连接有效60秒
          },
        }
      },
    })
  ],
  // controllers: [AppController, AppCatController],
  // providers: [AppService],
  exports: [],
  controllers: [HealthController]
})
export class AppModule {}
