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
import { CreatePembelianDto, findAllPembelian } from './pembelian.dto';
import { Pagination } from 'src/utils/decorator/pagination.decorator';

@Controller('pembelian')
export class PembelianController {
  constructor(private readonly pembelianService: PembelianService) {}

  @Get('list')
  async findAll(@Pagination() query: findAllPembelian) {
    // console.log(query)
    return this.pembelianService.findAll(query);
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

  @Delete('delete/:id')
  remove(@Param('id') id: string): Promise<void> {
    return this.pembelianService.remove(+id);
  }
}
