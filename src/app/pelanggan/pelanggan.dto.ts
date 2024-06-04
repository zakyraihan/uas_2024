import { IsString, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { PageRequestDto } from 'src/utils/dto/page.dto';
import BaseResponse from 'src/utils/response/base.response';

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

  @IsOptional()
  readonly create_at: Date;

  @IsOptional()
  readonly update_at: Date;
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

export class findAllTugas extends PageRequestDto {
  @IsOptional()
  @IsString()
  namaPelanggan: string;
}
