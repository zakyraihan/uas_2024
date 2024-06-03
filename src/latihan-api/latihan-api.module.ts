import { Module } from '@nestjs/common';
import { LatihanApiService } from './latihan-api.service';
import { LatihanApiController } from './latihan-api.controller';
// import { Api } from './api.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  // imports:[TypeOrmModule.forFeature([Api])],
  providers: [LatihanApiService],
  controllers: [LatihanApiController],
})
export class LatihanApiModule {}
