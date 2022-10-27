import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { map } from "rxjs/operators";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { SSOHeaderEntity } from '../../decorators/ssoHeader.decorator';
import { Repository, getConnection, DataSource, DataSourceOptions } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
// import { Micro_search_routeEntity } from "../../entitites/micro_search_route.entity";
import { Micro_register_routeEntity } from "../../entitites/micro_register_route.entity";
import { Micro_register_route_secondEntity } from "../../entitites/micro_register_route_second.entity";
import { MailerService } from '@nest-modules/mailer';
import { promises } from "dns";

@Injectable()
export class MicroService {
  constructor(
    // 链接对象
    @InjectRepository(Micro_register_routeEntity)
    private usersRepository: Repository<Micro_register_routeEntity>,
    private dataSource: DataSource,
    private readonly httpService: HttpService,
    private readonly mailerService: MailerService
  ) {}
  async getMirco(name) :Promise<Micro_register_routeEntity[]> {
    return await this.usersRepository.find({where:{name: name || null}})
  }
  async setMicro(body): Promise<boolean> {
    console.log('setMicro', body);
    const { path, name, baseStair, baseSecond } = body;
    const u = await this.usersRepository.query(`select * from micro_register_route_entity where path="${path}"`)
      if (u.length > 0) {
        throw new HttpException(
          {
            message: 'Input data validation failed',
            error: 'name must be unique.',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      let newProdSecond = new Micro_register_routeEntity();
      newProdSecond.path = path;
      newProdSecond.name = name;
      newProdSecond.baseStair = baseStair;
      newProdSecond.baseSecond = baseSecond;
      await this.usersRepository.manager.save(newProdSecond)
      return true
  }
  async delMicro(body): Promise<boolean | string> {
    // 删除方式支持单个id 也支持数组批量删除
    const { id } = body;
    console.log('id', id);
    if (Object.prototype.toString.call(id) !== '[object Array]') {
      throw new HttpException(
        {
          message: 'Input data validation failed',
          error: '请输入数组形式',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    await this.usersRepository.delete(id)
    return true
  }
  async updateMicro(body): Promise<boolean> {
    const { id, path, name, baseStair, baseSecond } = body;
        await this.dataSource.createQueryBuilder().update(Micro_register_routeEntity)
          .set({name, path, baseSecond})
          .where("id = :id", { id })
          .execute()
    return true
  }
  // async setMysql(newParam) {
  //   const { path, name, baseStair, baseSecond, routes } = newParam;
  //   // const u = await this.usersRepository.findOne({where:{baseName: baseName}}) // 找到第一个匹配的返回
  //   // const u = await this.usersRepository.find() // 返回全部 不带total总长度
  //   // const u = await this.usersRepository.findAndCount() // 返回全部 带total总长度
  //   // const u = await this.usersRepository.query('select * from micro_register_route_entity where baseName=123') // 带条件查询 注意表的名字大小写
  //   // 一对多 需要先save一的表  在save多的表
  //   const u = await this.usersRepository.createQueryBuilder('fields')
  //     .where(`fields.path= :path`, {path})
  //     .orderBy('fields.path',"DESC")
  //     .getMany() // 另一种查询写法 首先设置别名 然后查询
  //   if (u && u.length > 0) {
  //     throw new HttpException(
  //       {
  //         message: 'Input data validation failed',
  //         error: 'name must be unique.',
  //       },
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  //   // 获取连接并创建新的queryRunner
  //
  //   const queryRunner = this.dataSource.createQueryRunner();
  //   await queryRunner.connect();
  //   // 开始事务：
  //   await queryRunner.startTransaction();
  //   try {
  //     let newProd = new Micro_register_routeEntity();
  //     newProd.path = path;
  //     newProd.name = name;
  //     newProd.baseStair = baseStair;
  //     newProd.baseSecond = baseSecond;
  //     await this.usersRepository.manager.save(newProd)
  //     for (const item of routes) {
  //       let newProdSecond = new Micro_register_route_secondEntity();
  //       const { path, name } = item;
  //       newProdSecond.path = path;
  //       newProdSecond.name = name;
  //       // 一对多的表 要么是在多表里 把id对应一表   要么是在一表里 通过对应字段以数组形式添加多个多表
  //       newProdSecond.micro = newProd
  //       await this.usersSecondRepository.manager.save(newProdSecond)
  //     }
  //     // 提交事务：
  //     await queryRunner.commitTransaction();
  //     return true
  //   } catch (e) {
  //     // 有错误做出回滚更改
  //     await queryRunner.rollbackTransaction();
  //   } finally {
  //     // 释放实例
  //     await queryRunner.release();
  //   }
  // }
  // async delMysql(id) {
  //   // 删除方式支持单个id 也支持数组批量删除
  //   await this.usersRepository.delete([5,6])
  //   return true
  // }
  // async updateMysql(body) {
  //   const { id, routes } = body;
  //   const u = await this.usersRepository.find({where:{id}})
  //   const u1 = await this.usersSecondRepository.query(`select * from micro_register_route_second_entity where microId=${id}`)
  //   console.log('body', id, u.length, routes.length, u1, u1.length);
  //   if (u.length <= 0 || routes.length !== u1.length) {
  //     throw new HttpException(
  //       {
  //         message: 'Input data validation failed',
  //         error: 'name must be unique.',
  //       },
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  //   const queryRunner = this.dataSource.createQueryRunner();
  //   await queryRunner.connect();
  //   // 开始事务：
  //   await queryRunner.startTransaction();
  //   try {
  //     await this.dataSource.createQueryBuilder().update(Micro_register_routeEntity)
  //       .set({name:'abc2'})
  //       .where("id = :id", { id })
  //       .execute()
  //     for (const item of routes) {
  //       const { path, name } = item;
  //       await this.dataSource.createQueryBuilder().update(Micro_register_route_secondEntity)
  //         .set({name, path})
  //         .where("microId = :microId", { microId: id })
  //         .execute()
  //     }
  //     await queryRunner.commitTransaction();
  //     return true
  //   } catch (e) {
  //     await queryRunner.rollbackTransaction();
  //   } finally {
  //     // 释放实例
  //     await queryRunner.release();
  //   }
  //
  // }
  // async getErr() {
  //   throw new HttpException({
  //     status: HttpStatus.FORBIDDEN,
  //     error: 'This is a custom message',
  //   }, HttpStatus.FORBIDDEN);
  // }
  // async sendEmail() {
  //   this.mailerService.sendMail({
  //     to: '374121185@qq.com',
  //     from: '654870345@qq.com',
  //     // subject: 'Testing Nest MailerModule ✔',
  //     subject: 'Walker Lee Love You ✔',
  //     // html: '<b>Welcome Frost!</b>',
  //     template: './welcome',
  //     context: {
  //       // Data to be sent to template engine.
  //       code: 'cf1a3f828287',
  //       username: 'walker lee',
  //     },
  //   });
  // }
}
