import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { DetailPenjualanService } from './detailpenjualan.service';
import {
  CreateDetailPenjualanDto,
  DetailPenjualanDto,
  FindAllPenjualan,
  UpdateDetailPenjualanDto,
} from './detailpenjualan.dto';
import { Pagination } from 'src/utils/decorator/pagination.decorator';
import { UpdateBookDto } from 'src/book/book.dto';

@Controller('detailpenjualan')
export class DetailPenjualanController {
  constructor(
    private readonly detailPenjualanService: DetailPenjualanService,
  ) {}

  @Get('list')
  async findAll(@Pagination() query: FindAllPenjualan) {
    // console.log(query)
    return this.detailPenjualanService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<DetailPenjualanDto> {
    return this.detailPenjualanService.findOne(id);
  }

  @Post('/create')
  create(@Body() createDetailPenjualanDto: CreateDetailPenjualanDto) {
    return this.detailPenjualanService.create(createDetailPenjualanDto);
  }

  @Put('update/:id')
  updateBook(
    @Param('id') id: string,
    @Body() updateDto: UpdateDetailPenjualanDto,
  ) {
    return this.detailPenjualanService.updateDetailPenjualan(
      Number(id),
      updateDto,
    );
  }

  @Delete('delete/:id')
  deleteBook(@Param('id') id: string) {
    return this.detailPenjualanService.deleteDetailPenjualan(+id);
  }
}
