import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DetailPenjualanService } from './detailpenjualan.service';
import {
  CreateDetailPenjualanDto,
  DetailPenjualanDto,
} from './detailpenjualan.dto';

@Controller('detailpenjualan')
export class DetailPenjualanController {
  constructor(
    private readonly detailPenjualanService: DetailPenjualanService,
  ) {}

  @Get()
  findAll(): Promise<DetailPenjualanDto[]> {
    return this.detailPenjualanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<DetailPenjualanDto> {
    return this.detailPenjualanService.findOne(id);
  }

  // @Post('create')
  // create(
  //   @Body() createDetailPenjualanDto: CreateDetailPenjualanDto,
  // ): Promise<DetailPenjualanDto> {
  //   return this.detailPenjualanService.create(createDetailPenjualanDto);
  // }
  @Post('/create')
  create(@Body() createDetailPenjualanDto: CreateDetailPenjualanDto) {
    return this.detailPenjualanService.create(createDetailPenjualanDto);
  }
}
