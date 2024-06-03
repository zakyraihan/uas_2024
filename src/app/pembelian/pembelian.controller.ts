import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PembelianService } from './pembelian.service';
import { Pembelian } from './pembelian.entity';
import { CreatePembelianDto } from './pembelian.dto';

@Controller('pembelian')
export class PembelianController {
  constructor(private readonly pembelianService: PembelianService) {}

  @Get()
  findAll(): Promise<Pembelian[]> {
    return this.pembelianService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Pembelian> {
    return this.pembelianService.findOne(+id);
  }

  @Post('create')
  create(@Body() createPembelianDto: CreatePembelianDto): Promise<Pembelian> {
    return this.pembelianService.create(createPembelianDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePembelianDto: CreatePembelianDto,
  ): Promise<Pembelian> {
    return this.pembelianService.update(+id, updatePembelianDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.pembelianService.remove(+id);
  }
}
