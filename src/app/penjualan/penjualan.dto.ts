import {
  IsDateString,
  IsNumber,
  IsInt,
  Min,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePenjualanDto {
  @IsDateString()
  readonly tanggalPenjualan: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  readonly totalHarga: number;

  @IsInt()
  @Min(1)
  readonly pelangganID: number;
}
export class UpdatePenjualanDto {
  @IsDateString()
  readonly tanggalPenjualan: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  readonly totalHarga: number;

  @IsInt()
  @Min(1)
  readonly pelangganID: number;
}

export class PenjualanDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  readonly penjualanID?: number;

  @IsOptional()
  @IsDateString()
  readonly tanggalPenjualan?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  readonly totalHarga?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  readonly pelangganID?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  readonly page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  readonly pageSize?: number;
}
