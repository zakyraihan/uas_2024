import { IsString, IsNumber, IsOptional } from 'class-validator';
import { PageRequestDto } from 'src/utils/dto/page.dto';

export class CreateStokBarangDto {
  @IsString()
  nama_barang: string;

  @IsNumber()
  stok_tersedia: number;

  @IsString()
  kategori_barang: string;

  @IsString()
  deskripsi: string;

  @IsNumber()
  harga: number;
}

export class UpdateStokBarangDto {
  @IsString()
  nama_barang?: string;

  @IsNumber()
  stok_tersedia?: number;

  @IsString()
  kategori_barang?: string;

  @IsString()
  deskripsi?: string;

  @IsNumber()
  harga?: number;
}

export class findAllStok extends PageRequestDto {
  @IsString()
  @IsOptional()
  stok_tersedia: string;
}
