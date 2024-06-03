import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PelangganService } from './pelanggan.service';
import { CreatePelangganDto, UpdatePelangganDto } from './pelanggan.dto';

@Controller('pelanggan')
export class PelangganController {
  constructor(private readonly pelangganService: PelangganService) {}

  @Post('create')
  create(@Body() createPelangganDto: CreatePelangganDto) {
    return this.pelangganService.create(createPelangganDto);
  }

  @Get()
  findAll() {
    return this.pelangganService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pelangganService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePelangganDto: UpdatePelangganDto,
  ) {
    return this.pelangganService.update(+id, updatePelangganDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pelangganService.remove(+id);
  }
}
