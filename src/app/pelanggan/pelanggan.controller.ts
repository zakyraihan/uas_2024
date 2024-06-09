import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PelangganService } from './pelanggan.service';
import {
  CreatePelangganDto,
  UpdatePelangganDto,
  findAllPelanggan,
} from './pelanggan.dto';
import { Pagination } from 'src/utils/decorator/pagination.decorator';

@Controller('pelanggan')
export class PelangganController {
  constructor(private readonly pelangganService: PelangganService) {}

  @Post('create')
  create(@Body() createPelangganDto: CreatePelangganDto) {
    return this.pelangganService.create(createPelangganDto);
  }

  @Get('list')
  async findAll(@Pagination() query: findAllPelanggan) {
    // console.log(query)
    return this.pelangganService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pelangganService.findOne(+id);
  }

  @Put('update/:id')
  updateBook(
    @Param('id') id: string,
    @Body() updatePelangganDto: UpdatePelangganDto,
  ) {
    return this.pelangganService.update(Number(id), updatePelangganDto);
  }

  @Delete('delete/:id')
  deleteBook(@Param('id') id: string) {
    return this.pelangganService.deletePelanggan(+id);
  }
}
