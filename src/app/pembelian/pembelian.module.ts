import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PembelianService } from './pembelian.service';
import { PembelianController } from './pembelian.controller';
import { Pembelian } from './pembelian.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pembelian])],
  providers: [PembelianService],
  controllers: [PembelianController],
})
export class PembelianModule {}
