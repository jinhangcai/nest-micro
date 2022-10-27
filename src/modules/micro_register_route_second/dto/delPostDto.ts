import { IsNotEmpty, IsArray, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class delPostDto{
  // 验证-不能为空
  @ApiProperty({default: [], required: true})
  @IsString()
  @IsNotEmpty({message:'id不能为空'})//新加
  @IsArray({message:'id必须为数组'})//新加
  readonly id: number[]
}