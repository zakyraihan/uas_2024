import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Length,
  Max,
  Min,
  ValidateNested,
  isArray,
} from 'class-validator';
import { OmitType, PickType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { PageRequestDto } from 'src/utils/dto/page.dto';

export class BookDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @Length(4, 100)
  title: string;

  @IsNotEmpty()
  author: string;

  @IsInt()
  @Min(2020)
  @Max(2023)
  year: number;
}

export class CreateBookDto extends OmitType(BookDto, ['id']) {}
export class UpdateBookDto extends PickType(BookDto, [
  'title',
  'author',
  'year',
]) {}

export class CreateArrayDto {
  @IsArray()
  @ValidateNested()
  @Type(() => CreateBookDto)
  data: CreateBookDto[];
}

export class DeleteArrayDto {
  @IsArray()
  delete: number[];
}

export class FindBookDto extends PageRequestDto {
  @IsOptional()
  title: string;

  @IsOptional()
  author: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  from_year: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  to_year: number;
}

// export class DeleteMultiDto{
//   @IsArray()
//   @ValidateNested()
//   @Type(() => )
// }
