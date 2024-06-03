import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PenjualanController } from './penjualan.controller';
import { PenjualanService } from './penjualan.service';
import { Penjualan } from './penjualan.entity';
import { DetailPenjualan } from '../detailpenjualan/detailpenjualan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Penjualan, DetailPenjualan])],
  controllers: [PenjualanController],
  providers: [PenjualanService],
})
export class PenjualanModule {}
