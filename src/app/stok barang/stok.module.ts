import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StokBarangService } from './stok.service';
import { StokBarang } from './stok.entity';
import { StokBarangController } from './stok.controller';

@Module({
  imports: [TypeOrmModule.forFeature([StokBarang])],
  providers: [StokBarangService],
  controllers: [StokBarangController],
})
export class StokBarangModule {}
