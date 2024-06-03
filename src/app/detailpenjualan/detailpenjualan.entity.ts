import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Penjualan } from '../penjualan/penjualan.entity';

@Entity('detailpenjualan')
export class DetailPenjualan {
  @PrimaryGeneratedColumn()
  detailID: number;

  @Column()
  penjualanID: number;

  @Column()
  produkID: number;

  @Column()
  jumlahProduk: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  @ManyToOne(() => Penjualan, (penjualan) => penjualan.detailPenjualan)
  penjualan: Penjualan;
}
