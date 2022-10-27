import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance, plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    console.log('进入全局管道', value)
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    // plainToInstance 方法将普通的 JavaScript 参数对象转换为可验证的类型对象
    const object = plainToInstance(metatype, value);
    // plainToClass将普通的javascript对象转换为特定类的实例
    // const object1 = plainToClass(metatype, value);
    // 验证对象返回出错的数组
    const errors: any = await validate(object);
    console.log('进入全局管道errors', errors);
    if (errors.length > 0) {
      // 将错误信息暴露给异常过滤器
      const {  constraints } = errors[0];
      console.log('obj', object, constraints)
      const keys = Object.keys(constraints)[0];
      throw new BadRequestException(constraints[keys] || 'Validation failed');
    }
    return value;
  }
  // 验证属性元类型
  public toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype)
      // || Object.prototype.toString.call(metatype) === '[object Function]';
  }
}