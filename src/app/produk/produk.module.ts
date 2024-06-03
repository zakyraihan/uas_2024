import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdukController } from './produk.controller';
import { ProdukService } from './produk.service';
import { Produk } from './produk.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Produk])],
  controllers: [ProdukController],
  providers: [ProdukService],
})
export class ProdukModule {}
