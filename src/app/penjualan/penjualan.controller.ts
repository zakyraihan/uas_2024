import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PenjualanService } from './penjualan.service';
import { CreatePenjualanDto, PenjualanDto } from './penjualan.dto';
import { ValidationPipe } from '@nestjs/common';

@Controller('penjualan')
export class PenjualanController {
  constructor(private readonly penjualanService: PenjualanService) {}

  @Get()
  findAll(): Promise<PenjualanDto[]> {
    return this.penjualanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<PenjualanDto> {
    return this.penjualanService.findOne(id);
  }

  @Post('create')
  create(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    createPenjualanDto: CreatePenjualanDto,
  ): Promise<PenjualanDto> {
    return this.penjualanService.create(createPenjualanDto);
  }
}
