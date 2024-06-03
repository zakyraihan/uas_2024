import { IsDateString, IsNumber, IsInt, Min } from 'class-validator';

export class CreatePenjualanDto {
  @IsDateString()
  readonly tanggalPenjualan: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  readonly totalHarga: number;

  @IsInt()
  @Min(1)
  readonly pelangganID: number;
}

export class PenjualanDto {
  readonly penjualanID: number;
  readonly tanggalPenjualan: string;
  readonly totalHarga: number;
  readonly pelangganID: number;
}
