import { Module } from '@nestjs/common';
import { LatihanApiService } from './latihan-api.service';
import { LatihanApiController } from './latihan-api.controller';

@Module({
  providers: [LatihanApiService],
  controllers: [LatihanApiController]
})
export class LatihanApiModule {}
