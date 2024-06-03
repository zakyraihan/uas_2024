import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PendataanBarangService } from './pendataan.service';
import { CreateBarangDto } from './pendataan.dto';

@Controller('barang')
export class PendataanBarangController {
  constructor(
    private readonly pendataanBarangService: PendataanBarangService,
  ) {}

  @Get()
  getAllBarang() {
    return this.pendataanBarangService.findAll();
  }

  @Get(':id')
  getBarangById(@Param('id') id: string) {
    return this.pendataanBarangService.findOne(id);
  }

  @Post('create')
  createBarang(@Body() createBarangDto: CreateBarangDto) {
    return this.pendataanBarangService.create(createBarangDto);
  }

  @Put(':id')
  updateBarang(
    @Param('id') id: string,
    @Body() updateBarangDto: CreateBarangDto,
  ) {
    return this.pendataanBarangService.update(id, updateBarangDto);
  }

  @Delete(':id')
  deleteBarang(@Param('id') id: string) {
    return this.pendataanBarangService.remove(id);
  }
}
