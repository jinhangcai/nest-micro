import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class updatePostDto{
  // 验证-不能为空
  @ApiProperty({default: '', required: false})
    // @IsNotEmpty({message:'entry路径不能为空'})//新加
    // @Length(10, 20)
  entry:string

  @ApiProperty({default: '', required: false})
  // @IsNotEmpty({message:'microApp不能为空'})//新加
  microApp:string

  @ApiProperty({default: '', required: false})
  // @IsNotEmpty({message:'baseSecond不能为空'})//新加
  baseSecond:string

  @ApiProperty({default: '', required: false})
  // @IsNotEmpty({message:'baseStair不能为空'})//新加
  baseStair:string

  @ApiProperty({default: '', required: false })
  // @IsNotEmpty({message:'baseStair不能为空'})//新加
  type:number

  @ApiProperty({default: '', required: true })
  @IsNotEmpty({message:'id不能为空'})//新加
  id:number
}