import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LatihanModule } from './Latihan/latihan.module';
import { BookModule } from './book/book.module';
import { LatihanApiModule } from './latihan-api/latihan-api.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './app/auth/auth.module';
import { MailModule } from './app/mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { UploadController } from './app/upload/upload.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ProfileModule } from './app/profile/profile.module';
import { PelangganModule } from './app/pelanggan/pelanggan.module';
import { PenjualanModule } from './app/penjualan/penjualan.module';
import { DetailPenjualanModule } from './app/detailpenjualan/detailpenjualan.module'; // Pastikan ini adalah path yang benar
import { ProdukModule } from './app/produk/produk.module';
import { PendataanBarangController } from './app/pendataanbarang/pendataan.controller';
import { PendataanBarangModule } from './app/pendataanbarang/pendataan.module';
import { PembelianModule } from './app/pembelian/pembelian.module';
import { StokBarang } from './app/stok barang/stok.entity';
import { StokBarangModule } from './app/stok barang/stok.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    ConfigModule.forRoot({
      isGlobal: true, //konfigurasi untuk semua module
      envFilePath: '.env',
      ignoreEnvFile: false,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    LatihanModule,
    BookModule,
    LatihanApiModule,
    AuthModule,
    MailModule,
    ProfileModule,
    PelangganModule,
    PenjualanModule,
    DetailPenjualanModule, // Impor modul, bukan entitas
    ProdukModule,
    PendataanBarangModule,
    PenjualanModule,
    PembelianModule,
    StokBarangModule,
  ],
  controllers: [AppController, UploadController],
  providers: [AppService],
})
export class AppModule {}
