import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/http-exception.filter'
import { ValidationPipe } from './common/validation.pipe';
import { AuthGuard } from './common/auth-guard'
import { ResponseInterceptor } from './common/response.interceptor'
import config from './config/configuration';

const PREFIX = config().config.PREFIX;
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // 开启日志级别打印
    logger: process.env.APP_ENV === 'sit' ? ['log', 'debug', 'error', 'warn'] : ['error', 'warn'],
  });

  //允许跨域请求
  app.enableCors();
  // 注册全局验证守卫
  app.useGlobalGuards(new AuthGuard())
  // 注册全局拦截器
  app.useGlobalInterceptors(new ResponseInterceptor())
  // 注册全局通用验证管道
  app.useGlobalPipes(new ValidationPipe())
  // 注册全局异常过滤器
  app.useGlobalFilters(new AllExceptionsFilter())
  // 设置swagger文档相关配置
  const swaggerOptions = new DocumentBuilder()
    .setTitle('nest-starter api document')
    .setDescription('nest starter project api document')
    .setVersion('1.0')
    // .addBearerAuth()
    .build();

  // 给请求添加prefix
  app.setGlobalPrefix(PREFIX);
  const document = SwaggerModule.createDocument(app, swaggerOptions, {
    ignoreGlobalPrefix: false
  });
  SwaggerModule.setup('doc', app, document);


  await app.listen(4000, () => {
    console.log('服务启动成功',  123345321312312312312, process.env.APP_ENV);
  });
}
bootstrap();
