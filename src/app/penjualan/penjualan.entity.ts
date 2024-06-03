import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { DetailPenjualan } from '../detailpenjualan/detailpenjualan.entity';

@Entity('penjualan')
export class Penjualan {
  @PrimaryGeneratedColumn()
  penjualanID: number;

  @Column({ type: 'date' })
  tanggalPenjualan: string;

  @OneToMany(() => DetailPenjualan, (v) => v.penjualan, {
    cascade: ['insert', 'update'],
  })
  detailPenjualan: DetailPenjualan[];

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalHarga: number;

  @Column()
  pelangganID: number;
}
