import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class createPostDto{
  // 验证-不能为空
  @ApiProperty({default: ''})
  @IsNotEmpty({message:'path路径不能为空'})//新加
    // @Length(10, 20)
  path:string

  @ApiProperty({default: ''})
  @IsNotEmpty({message:'name不能为空'})//新加
  name:string

  @ApiProperty({default: ''})
  @IsNotEmpty({message:'baseSecond不能为空'})//新加
  baseSecond:string

  @ApiProperty({default: ''})
  @IsNotEmpty({message:'baseStair不能为空'})//新加
  baseStair:string
}