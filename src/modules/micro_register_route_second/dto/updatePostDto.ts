import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class updatePostDto{
  // 验证-不能为空
  @ApiProperty({default: '', required: true})
  @IsNotEmpty({message:'path路径不能为空'})//新加
    // @Length(10, 20)
  path:string

  @ApiProperty({default: '', required: true})
  @IsNotEmpty({message:'id不能为空'})//新加
  id:string | number

  @ApiProperty({default: '', required: true})
  @IsNotEmpty({message:'name不能为空'})//新加
  name:string


  @ApiProperty({default: '', required: true})
  @IsNotEmpty({message:'micro不能为空'})//新加
  micro:string
}