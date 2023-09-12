import { IsInt, IsNotEmpty, IsNumber, Length, Max, Min } from 'class-validator';
import { OmitType, PickType } from '@nestjs/mapped-types';

export class BookDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @Length(4, 6)
  title: string;

  @IsNotEmpty()
  author: string;

  @IsInt()
  @Min(2020)
  @Max(2023)
  year: number;
}

export class CreateBookDto extends OmitType(BookDto, ['id']) {}
export class UpdateBookDto extends PickType(BookDto,[
    'title',
    'author',
    'year',
] ) {}