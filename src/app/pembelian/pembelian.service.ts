import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Pembelian } from './pembelian.entity';
import { CreatePembelianDto, findAllPembelian } from './pembelian.dto';
import BaseResponse from 'src/utils/response/base.response';
import { ResponsePagination } from 'src/interface';

@Injectable()
export class PembelianService extends BaseResponse {
  constructor(
    @InjectRepository(Pembelian)
    private pembelianRepository: Repository<Pembelian>,
  ) {
    super();
  }

  async findAll(query: findAllPembelian): Promise<ResponsePagination> {
    const { page, pageSize, limit, nama } = query;

    const filterQuery: any = {};
    if (nama) {
      filterQuery.nama = Like(`%${nama}%`);
    }

    const total = await this.pembelianRepository.count({ where: filterQuery });

    console.log('Qwery', filterQuery);

    const result = await this.pembelianRepository.find({
      where: filterQuery,
      relations: ['created_by', 'updated_by'],
      select: {
        id: true,
        nama: true,
        harga: true,
        stok: true,
        deskripsi: true,
        created_by: {
          id: true,
          nama: true,
        },
        updated_by: {
          id: true,
          nama: true,
        },
        created_at: true,
        updated_at: true,
      },
      skip: limit,
      take: pageSize,
    });

    return this._pagination('Okeh', result, total, page, pageSize);
  }

  async findOne(id: number): Promise<Pembelian> {
    const pembelian = await this.pembelianRepository.findOneBy({ id });
    if (!pembelian) {
      throw new NotFoundException(`Pembelian with ID ${id} not found`);
    }
    return pembelian;
  }

  async create(createPembelianDto: CreatePembelianDto): Promise<Pembelian> {
    const pembelian = this.pembelianRepository.create(createPembelianDto);
    return this.pembelianRepository.save(pembelian);
  }

  async update(
    id: number,
    updatePembelianDto: CreatePembelianDto,
  ): Promise<Pembelian> {
    await this.pembelianRepository.update(id, updatePembelianDto);
    const updatedPembelian = await this.pembelianRepository.findOneBy({ id });
    if (!updatedPembelian) {
      throw new NotFoundException(`Pembelian with ID ${id} not found`);
    }
    return updatedPembelian;
  }

  async remove(id: number): Promise<void> {
    const pembelian = await this.findOne(id);
    await this.pembelianRepository.remove(pembelian);
  }
}
