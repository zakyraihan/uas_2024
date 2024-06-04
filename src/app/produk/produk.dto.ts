import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProdukDto {
  @IsString()
  NamaProduk: string;

  @IsNumber()
  Harga: number;

  @IsNumber()
  Stok: number;

  @IsOptional()
  created_at?: Date;

  @IsOptional()
  updated_at?: Date;
}

export class UpdateProdukDto {
  @IsString()
  @IsOptional()
  NamaProduk?: string;

  @IsNumber()
  @IsOptional()
  Harga?: number;

  @IsNumber()
  @IsOptional()
  Stok?: number;

  @IsOptional()
  created_at?: Date;

  @IsOptional()
  updated_at?: Date;
}

export class findAllProduk {
  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  pageSize?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsString()
  NamaProduk?: string;
}
