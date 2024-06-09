import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { PageRequestDto } from 'src/utils/dto/page.dto';
import BaseResponse from 'src/utils/response/base.response';

export class CreateDetailPenjualanDto {
  @IsInt()
  @Min(1)
  readonly penjualanID: number;

  @IsInt()
  @Min(1)
  readonly produkID: number;

  @IsInt()
  @Min(1)
  readonly jumlahProduk: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  subtotal: number;
}

export class UpdateDetailPenjualanDto extends PartialType(
  CreateDetailPenjualanDto,
) {
  @IsInt()
  @Min(1)
  readonly penjualanID: number;
}

export class DetailPenjualanDto {
  detailID: number;
  penjualanID: number;
  produkID: number;
  jumlahProduk: number;
  subtotal: number;
}

export class FindAllPenjualan extends PageRequestDto {
  @IsString()
  @IsOptional()
  penjualanID: number;
}
