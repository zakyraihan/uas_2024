import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Barang } from './pendataan.entity';
import { CreateBarangDto, findAllBarang } from './pendataan.dto';
import BaseResponse from 'src/utils/response/base.response';
import { ResponsePagination, ResponseSuccess } from 'src/interface';

@Injectable()
export class PendataanBarangService extends BaseResponse {
  constructor(
    @InjectRepository(Barang)
    private barangRepository: Repository<Barang>,
  ) {
    super();
  }

  async findALl(query: findAllBarang): Promise<ResponsePagination> {
    const { page, pageSize, limit, nama } = query;

    const filterQuery: any = {};
    if (nama) {
      filterQuery.nama = Like(`%${nama}%`);
    }

    const total = await this.barangRepository.count({ where: filterQuery });

    console.log('Qwery', filterQuery);

    const result = await this.barangRepository.find({
      where: filterQuery,
      relations: ['updated_by', 'created_by'],
      select: {
        id: true,
        nama: true,
        jenis: true,
        jumlah: true,
        kondisi: true,
        created_by: {
          id: true,
          nama: true,
        },
        created_at: true,
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
  findOne(id: string): Promise<Barang> {
    return this.barangRepository.findOneBy({ id: Number(id) });
  }

  create(createBarangDto: CreateBarangDto): Promise<Barang> {
    const barang = new Barang();
    barang.nama = createBarangDto.nama;
    barang.jumlah = createBarangDto.jumlah;
    barang.jenis = createBarangDto.jenis;
    barang.kondisi = createBarangDto.kondisi;

    return this.barangRepository.save(barang);
  }

  async update(id: string, updateBarangDto: CreateBarangDto): Promise<Barang> {
    const barang = await this.barangRepository.findOneBy({ id: Number(id) });
    if (!barang) {
      throw new Error('Barang not found');
    }
    barang.nama = updateBarangDto.nama;
    barang.jumlah = updateBarangDto.jumlah;
    barang.jenis = updateBarangDto.jenis;
    barang.kondisi = updateBarangDto.kondisi;

    return this.barangRepository.save(barang);
  }

  async deleteBarang(id: number): Promise<ResponseSuccess> {
    const check = await this.barangRepository.findOne({
      where: {
        id,
      },
    });

    if (!check)
      throw new NotFoundException(`barang dengan id ${id} tidak ditemukan`);
    await this.barangRepository.delete(id);
    return {
      status: `Success `,
      message: 'Berhasil menghapus barang',
    };
  }
}
