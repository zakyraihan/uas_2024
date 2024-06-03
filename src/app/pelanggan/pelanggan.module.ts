import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pelanggan } from './pelanggan.entity';
import { PelangganService } from './pelanggan.service';
import { PelangganController } from './pelanggan.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Pelanggan])],
  providers: [PelangganService],
  controllers: [PelangganController],
})
export class PelangganModule {}
