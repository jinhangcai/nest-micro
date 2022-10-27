import { Module } from '@nestjs/common';
import { SitController, SitCatController } from './sit.controller';
import { SitService } from './sit.service';
@Module({
  imports: [],
  controllers: [SitController, SitCatController],
  providers: [SitService],
  // exports: []
})
export class SitModule {}
