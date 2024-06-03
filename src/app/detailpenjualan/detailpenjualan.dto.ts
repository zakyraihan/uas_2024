import { IsInt, IsNumber, Min } from 'class-validator';

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

export class DetailPenjualanDto {
  detailID: number;
  penjualanID: number;
  produkID: number;
  jumlahProduk: number;
  subtotal: number;
}
