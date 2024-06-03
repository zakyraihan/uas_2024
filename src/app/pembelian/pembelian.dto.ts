import { IsString, IsInt, Min, IsPositive } from 'class-validator';

export class CreatePembelianDto {
  @IsString()
  nama: string;

  @IsString()
  deskripsi: string;

  @IsInt()
  @IsPositive()
  harga: number;

  @IsInt()
  @Min(0)
  stok: number;
}
