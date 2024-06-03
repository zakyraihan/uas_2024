import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Barang } from './pendataan.entity';
import { PendataanBarangService } from './pendataan.service';
import { PendataanBarangController } from './pendataan.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Barang])],
  providers: [PendataanBarangService],
  controllers: [PendataanBarangController],
})
export class PendataanBarangModule {}
