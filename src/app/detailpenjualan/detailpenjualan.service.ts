import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { DetailPenjualan } from './detailpenjualan.entity';
import {
  CreateDetailPenjualanDto,
  DetailPenjualanDto,
  FindAllPenjualan,
  UpdateDetailPenjualanDto,
} from './detailpenjualan.dto';
import { ResponsePagination, ResponseSuccess } from 'src/interface';
import BaseResponse from 'src/utils/response/base.response';

@Injectable()
export class DetailPenjualanService extends BaseResponse {
  constructor(
    @InjectRepository(DetailPenjualan)
    private readonly detailPenjualanRepository: Repository<DetailPenjualan>,
  ) {
    super();
  }

  findOne(id: number): Promise<DetailPenjualanDto> {
    return this.detailPenjualanRepository.findOne({ where: { detailID: id } });
  }

  async create(
    createDetailPenjualanDto: CreateDetailPenjualanDto,
  ): Promise<DetailPenjualanDto> {
    const detailPenjualan = new DetailPenjualan();
    detailPenjualan.penjualanID = createDetailPenjualanDto.penjualanID;
    detailPenjualan.produkID = createDetailPenjualanDto.produkID;
    detailPenjualan.jumlahProduk = createDetailPenjualanDto.jumlahProduk;
    detailPenjualan.subtotal = createDetailPenjualanDto.subtotal;

    const result = await this.detailPenjualanRepository.save(detailPenjualan);
    return result;
  }

  async findAll(query: FindAllPenjualan): Promise<ResponsePagination> {
    const { page, pageSize, limit, penjualanID } = query;

    const filterQuery: any = {};
    if (penjualanID) {
      filterQuery.penjualanID = Like(`%${penjualanID}%`);
    }

    const total = await this.detailPenjualanRepository.count({
      where: filterQuery,
    });

    console.log('Qwery', filterQuery);

    const result = await this.detailPenjualanRepository.find({
      where: filterQuery,
      select: {
        detailID: true,
        penjualanID: true,
        produkID: true,
        jumlahProduk: true,
        subtotal: true,
        updated_at: true,
        created_at: true,
        created_by: {
          id: true,
          nama: true,
        },
        updated_by: {
          id: true,
          nama: true,
        },
      },
      skip: limit,
      take: pageSize,
    });

    return this._pagination('Okeh', result, total, page, pageSize);
  }

  async updateDetailPenjualan(
    id: number,
    updateDto: UpdateDetailPenjualanDto,
  ): Promise<ResponseSuccess> {
    const check = await this.detailPenjualanRepository.findOne({
      where: {
        detailID: id,
      },
    });

    if (!check)
      throw new NotFoundException(`detail dengan id ${id} tidak ditemukan`);

    const update = await this.detailPenjualanRepository.save({
      ...updateDto,
      id: id,
    });
    return {
      status: `Success `,
      message: 'detail berhasil di update',
      data: update,
    };
  }

  async deleteDetailPenjualan(id: number): Promise<ResponseSuccess> {
    const check = await this.detailPenjualanRepository.findOne({
      where: {
        detailID: id,
      },
    });

    if (!check)
      throw new NotFoundException(`detail dengan id ${id} tidak ditemukan`);
    await this.detailPenjualanRepository.delete(id);
    return {
      status: `Success `,
      message: 'Berhasil menghapus detail',
    };
  }
}
