import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StokBarang {
  @PrimaryGeneratedColumn()
  Idbarang: number;

  @Column()
  nama_barang: string;

  @Column()
  stok_tersedia: number;

  @Column()
  kategori_barang: string;

  @Column()
  deskripsi: string;

  @Column()
  harga: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  tanggal_diperbarui: Date;
}
