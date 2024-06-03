import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ProdukService } from './produk.service';
import { CreateProdukDto, UpdateProdukDto } from './produk.dto';
import { JwtGuard } from '../auth/auth.guard';

@UseGuards(JwtGuard)
@Controller('produk')
export class ProdukController {
  constructor(private readonly produkService: ProdukService) {}

  @Get()
  findAll() {
    return this.produkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.produkService.findOne(id);
  }

  @Post('create')
  create(@Body() createProdukDto: CreateProdukDto) {
    return this.produkService.create(createProdukDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProdukDto: UpdateProdukDto,
  ) {
    return this.produkService.update(id, updateProdukDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.produkService.remove(id);
  }
}
