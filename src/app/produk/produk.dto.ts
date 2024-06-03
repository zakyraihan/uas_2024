import { IsString, IsNumber } from 'class-validator';

export class CreateProdukDto {
  @IsString()
  NamaProduk: string;

  @IsNumber()
  Harga: number;

  @IsNumber()
  Stok: number;
}

export class UpdateProdukDto {
  @IsString()
  NamaProduk?: string;

  @IsNumber()
  Harga?: number;

  @IsNumber()
  Stok?: number;
}
