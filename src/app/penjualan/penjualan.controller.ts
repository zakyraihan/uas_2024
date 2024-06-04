import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { PenjualanService } from './penjualan.service';
import { CreatePenjualanDto, PenjualanDto } from './penjualan.dto';
import { ValidationPipe } from '@nestjs/common';
import { ResponsePagination, ResponseSuccess } from 'src/interface';

@Controller('penjualan')
export class PenjualanController {
  constructor(private readonly penjualanService: PenjualanService) {}

  @Get()
  async findAll(): Promise<ResponseSuccess> {
    return this.penjualanService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ResponseSuccess> {
    return this.penjualanService.findOne(id);
  }

  @Post('create')
  async create(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    createPenjualanDto: CreatePenjualanDto,
  ): Promise<ResponseSuccess> {
    return this.penjualanService.create(createPenjualanDto);
  }

  @Get('tugas')
  async getAllTugas(
    @Query(new ValidationPipe({ transform: true, whitelist: true }))
    query: PenjualanDto,
  ): Promise<ResponsePagination> {
    return this.penjualanService.getAllTugas(query);
  }
}
