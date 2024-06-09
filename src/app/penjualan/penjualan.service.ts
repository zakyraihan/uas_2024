import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Penjualan } from './penjualan.entity';
import {
  CreatePenjualanDto,
  PenjualanDto,
  UpdatePenjualanDto,
} from './penjualan.dto';
import { ResponsePagination, ResponseSuccess } from 'src/interface';
import BaseResponse from 'src/utils/response/base.response';

@Injectable()
export class PenjualanService extends BaseResponse {
  constructor(
    @InjectRepository(Penjualan)
    private readonly penjualanRepository: Repository<Penjualan>,
  ) {
    super();
  }

  async findOne(id: number): Promise<ResponseSuccess> {
    const result = await this.penjualanRepository.findOne({
      where: { penjualanID: id },
    });
    return this._success('oke', result);
  }

  async create(
    createPenjualanDto: CreatePenjualanDto,
  ): Promise<ResponseSuccess> {
    const penjualan = new Penjualan();
    penjualan.tanggalPenjualan = createPenjualanDto.tanggalPenjualan;
    penjualan.totalHarga = createPenjualanDto.totalHarga;
    penjualan.pelangganID = createPenjualanDto.pelangganID;

    const result = await this.penjualanRepository.save(penjualan);
    return this._success('oke', result);
  }

  async findAll(query: PenjualanDto): Promise<ResponsePagination> {
    const { page = 1, pageSize = 10, tanggalPenjualan } = query;

    const filterQuery: any = {};
    if (tanggalPenjualan) {
      filterQuery.tanggalPenjualan = Like(`%${tanggalPenjualan}%`);
    }

    const total = await this.penjualanRepository.count({ where: filterQuery });

    const skip = (page - 1) * pageSize;

    const result = await this.penjualanRepository.find({
      where: filterQuery,
      relations: ['created_by', 'updated_by'],
      select: {
        penjualanID: true,
        tanggalPenjualan: true,
        totalHarga: true,
        pelangganID: true,
        created_at: true,
        updated_at: true,
      },
      skip,
      take: pageSize,
    });

    return this._pagination('Okeh', result, total, page, pageSize);
  }

  async updatePenjualan(
    id: number,
    updatePenjualanDto: UpdatePenjualanDto,
  ): Promise<ResponseSuccess> {
    const check = await this.penjualanRepository.findOne({
      where: {
        penjualanID: id,
      },
    });

    if (!check)
      throw new NotFoundException(`penjualan dengan id ${id} tidak ditemukan`);

    const update = await this.penjualanRepository.save({
      ...updatePenjualanDto,
      id: id,
    });
    return {
      status: `Success `,
      message: 'penjualan berhasil di update',
      data: update,
    };
  }

  async deletePenjualan(id: number): Promise<ResponseSuccess> {
    const check = await this.penjualanRepository.findOne({
      where: {
        penjualanID: id,
      },
    });

    if (!check)
      throw new NotFoundException(`penjualan dengan id ${id} tidak ditemukan`);
    await this.penjualanRepository.delete(id);
    return {
      status: `Success `,
      message: 'Berhasil menghapus penjualan',
    };
  }
}
