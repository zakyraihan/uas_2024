import { IsString, IsInt, Min, IsPositive, IsOptional } from 'class-validator';
import { PageRequestDto } from 'src/utils/dto/page.dto';

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

export class findAllPembelian extends PageRequestDto {
  @IsString()
  @IsOptional()
  nama: string;
}
