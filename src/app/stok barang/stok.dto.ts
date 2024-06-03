import { IsString, IsNumber } from 'class-validator';

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
