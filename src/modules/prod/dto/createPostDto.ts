import { IsNotEmpty } from "class-validator";

export class createPostDto{
  // 验证-不能为空
  @IsNotEmpty({message:'请填写标题'})//新加
    // @Length(10, 20)
  query:string
  @IsNotEmpty({message:'请填写标题1'})//新加
  name:string
}
