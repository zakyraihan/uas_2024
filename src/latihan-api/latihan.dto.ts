import { OmitType, PickType } from "@nestjs/mapped-types";
import { IsInt, IsNotEmpty, IsNumber, Length, Max, Min } from "class-validator";

export class LatihanDto {
    @IsNumber()
    id : number;

    @IsNotEmpty()
    @Length(4,5)
    title : string;
    
    @IsNotEmpty()
    author : string;

    @IsInt()
    @Min(2020)
    @Max(2023)
    year : number;
}

export class CreateApiDto extends OmitType(LatihanDto,['id']) {}

export class UpdateApi extends PickType(LatihanDto,[
    'title',
    'author',
    'year',
]) {}