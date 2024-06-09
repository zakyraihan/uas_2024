import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Pelanggan } from './pelanggan.entity';
import {
  CreatePelangganDto,
  UpdatePelangganDto,
  findAllPelanggan,
} from './pelanggan.dto';
import { ResponsePagination, ResponseSuccess } from 'src/interface';
import BaseResponse from 'src/utils/response/base.response';

@Injectable()
export class PelangganService extends BaseResponse {
  constructor(
    @InjectRepository(Pelanggan)
    private pelangganRepository: Repository<Pelanggan>,
  ) {
    super();
  }

  async findOne(id: number): Promise<Pelanggan> {
    const pelanggan = await this.pelangganRepository.findOne({
      where: { pelangganID: id },
    });
    if (!pelanggan) {
      throw new NotFoundException(`Pelanggan with ID ${id} not found`);
    }
    return pelanggan;
  }

  async create(
    createPelangganDto: CreatePelangganDto,
  ): Promise<ResponseSuccess> {
    const pelanggan = this.pelangganRepository.create(createPelangganDto);
    const result = await this.pelangganRepository.save(pelanggan);

    return this._success('oke', result);
  }

  async update(
    id: number,
    updatePelangganDto: UpdatePelangganDto,
  ): Promise<ResponseSuccess> {
    const check = await this.pelangganRepository.find({
      where: {
        pelangganID: id,
      },
    });
    if (!check) {
      throw new NotFoundException(`Pelanggan with Id`);
    }
    const result = await this.pelangganRepository.update(
      id,
      updatePelangganDto,
    );

    return this._success('berhasil', result);
  }

  async deletePelanggan(id: number): Promise<ResponseSuccess> {
    const check = await this.pelangganRepository.findOne({
      where: {
        pelangganID: id,
      },
    });

    if (!check)
      throw new NotFoundException(`pelanggan dengan id ${id} tidak ditemukan`);
    await this.pelangganRepository.delete(id);
    return {
      status: `Success `,
      message: 'Berhasil menghapus pelanggan',
    };
  }

  async findAll(query: findAllPelanggan): Promise<ResponsePagination> {
    const { page, pageSize, limit, namaPelanggan } = query;

    const filterQuery: any = {};
    if (namaPelanggan) {
      filterQuery.namaPelanggan = Like(`%${namaPelanggan}%`);
    }

    const total = await this.pelangganRepository.count({ where: filterQuery });

    console.log('Qwery', filterQuery);

    const result = await this.pelangganRepository.find({
      where: filterQuery,
      select: {
        pelangganID: true,
        namaPelanggan: true,
        alamat: true,
        nomorTelepon: true,
        create_at: true,
        created_by: {
          id: true,
          nama: true,
        },
        updated_by: {
          id: true,
          nama: true,
        },
        updated_at: true,
      },
      skip: limit,
      take: pageSize,
    });

    return this._pagination('Okeh', result, total, page, pageSize);
  }
}
