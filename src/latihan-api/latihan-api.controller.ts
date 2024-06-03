import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { LatihanApiService } from './latihan-api.service';
import { CreateApiDto, UpdateApiDto } from './latihan.dto';

@Controller('latihan-api')
export class LatihanApiController {
  constructor(private latihanApiService: LatihanApiService) {}
  @Get('list')
  getAllApi() {
    return this.latihanApiService.getAllApi();
  }
  @Post('create')
  createApi(@Body() payload: CreateApiDto) {
    console.log('payload', payload);
    return this.latihanApiService.createApi(payload);
  }
  @Put('update/:id')
  updateApi(@Param('id') id: string, @Body() payload: UpdateApiDto) {
    return this.latihanApiService.updateApi(Number(id), payload);
  }
  @Get('detail/:id')
  getDetail(@Param('id') id: string) {
    return this.latihanApiService.getDetail(Number(id));
  }
  @Delete('delete/:id')
  deleteApi(@Param('id') id: string) {
    return this.latihanApiService.deleteApi(Number(id));
  }
}
