import { IsNotEmpty, IsArray } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class DelPostDto{
  // 验证-不能为空
  @ApiProperty({default: []})
  @IsNotEmpty({message:'id不能为空'})//新加
  @IsArray({message:'id必须以数组形式传入'})//新加
  readonly id: number[]
}