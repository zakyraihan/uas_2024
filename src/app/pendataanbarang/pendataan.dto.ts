import { IsString, IsInt, Min } from 'class-validator';

export class CreateBarangDto {
  @IsString()
  nama: string;

  @IsInt()
  @Min(0)
  jumlah: number;

  @IsString()
  jenis: string;

  @IsString()
  kondisi: string;
}
