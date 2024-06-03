import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pelanggan')
export class Pelanggan {
  @PrimaryGeneratedColumn()
  pelangganID: number;

  @Column({ length: 255 })
  namaPelanggan: string;

  @Column('text')
  alamat: string;

  @Column({ length: 15 })
  nomorTelepon: string;
}
