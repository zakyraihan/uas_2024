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
import { CreateBarangDto, findAllBarang } from './pendataan.dto';
import { Pagination } from 'src/utils/decorator/pagination.decorator';

@Controller('barang')
export class PendataanBarangController {
  constructor(
    private readonly pendataanBarangService: PendataanBarangService,
  ) {}

  @Get('list')
  async findAll(@Pagination() query: findAllBarang) {
    // console.log(query)
    return this.pendataanBarangService.findALl(query);
  }
  @Get(':id')
  getBarangById(@Param('id') id: string) {
    return this.pendataanBarangService.findOne(id);
  }

  @Post('create')
  createBarang(@Body() createBarangDto: CreateBarangDto) {
    return this.pendataanBarangService.create(createBarangDto);
  }

  @Put('update/:id')
  updateBarang(
    @Param('id') id: string,
    @Body() updateBarangDto: CreateBarangDto,
  ) {
    return this.pendataanBarangService.update(id, updateBarangDto);
  }

  @Delete('delete/:id')
  deleteBarang(@Param('id') id: string) {
    return this.pendataanBarangService.deleteBarang(+id);
  }
}
