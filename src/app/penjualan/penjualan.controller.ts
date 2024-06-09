import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { PenjualanService } from './penjualan.service';
import {
  CreatePenjualanDto,
  PenjualanDto,
  UpdatePenjualanDto,
} from './penjualan.dto';
import { ValidationPipe } from '@nestjs/common';
import { ResponsePagination, ResponseSuccess } from 'src/interface';
import { Pagination } from 'src/utils/decorator/pagination.decorator';
import { UpdateBookDto } from 'src/book/book.dto';
import { FindAllPenjualan } from '../detailpenjualan/detailpenjualan.dto';

@Controller('penjualan')
export class PenjualanController {
  constructor(private readonly penjualanService: PenjualanService) {}

  @Get('list')
  async findAll(@Pagination() query: FindAllPenjualan) {
    // console.log(query)
    return this.penjualanService.findAll(query);
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

  @Put('update/:id')
  updateBook(@Param('id') id: string, @Body() updateDto: UpdatePenjualanDto) {
    return this.penjualanService.updatePenjualan(Number(id), updateDto);
  }

  @Delete('delete/:id')
  deleteBook(@Param('id') id: string) {
    return this.penjualanService.deletePenjualan(+id);
  }
}
