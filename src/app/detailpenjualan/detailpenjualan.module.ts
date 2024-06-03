import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailPenjualanService } from './detailpenjualan.service';
import { DetailPenjualanController } from './detailpenjualan.controller';
import { DetailPenjualan } from './detailpenjualan.entity';
import { Penjualan } from '../penjualan/penjualan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetailPenjualan, Penjualan])],
  providers: [DetailPenjualanService],
  controllers: [DetailPenjualanController],
})
export class DetailPenjualanModule {}
