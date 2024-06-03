import { IsString, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreatePelangganDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  readonly namaPelanggan: string;

  @IsString()
  @IsNotEmpty()
  readonly alamat: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 15)
  readonly nomorTelepon: string;
}

export class UpdatePelangganDto {
  @IsString()
  @IsOptional()
  @Length(1, 255)
  readonly namaPelanggan?: string;

  @IsString()
  @IsOptional()
  readonly alamat?: string;

  @IsString()
  @IsOptional()
  @Length(1, 15)
  readonly nomorTelepon?: string;
}
