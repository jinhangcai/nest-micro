import { Module } from '@nestjs/common';
import { PreController } from './pre.controller';
import { PreService } from './pre.service';
@Module({
  imports: [],
  controllers: [PreController],
  providers: [PreService],
  exports: [PreService]
})
export class PreModule {}
