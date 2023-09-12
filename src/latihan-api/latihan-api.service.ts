import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class LatihanApiService {
    private Apis: {
        id?:number;
        nama:string;
        email:string;
        umur:number;
        tangal_lahir:string;
        status:string
    }[] = [
        {
            id:1,
            nama: "fatih",
            email:"fatihalhijri02@gmail.com",
            umur:16,
            tangal_lahir:"25 january 2007",
            status:"pelajar"
        }
    ];

    private findApiById(id:number){
        const ApiIndex = this.Apis.findIndex((Api) => Api.id === id);

        if (ApiIndex === -1){
            throw new NotFoundException(`Api dengan ${id} tidak ditemukan`);
        }
        return ApiIndex;
    }
    
    getAllApi() : {
        id? : number;
        nama : string;
        email:string;
        umur:number;
        tangal_lahir:string;
        status:string
    } [] {
        return this.Apis;
    }

    createApi(payload:any) : {status : string,message:string} {
        console.log('pay',payload);
        const {nama, email, umur, tangal_lahir,status} = payload;
        this.Apis.push({
            id: new Date().getTime(),
            // id: 1,
            nama:nama,
            email:email,
            umur:umur,
            tangal_lahir:tangal_lahir,
            status:status
        });

        return {
            status:'online',
            message:'berhasil dibuat'
        }
    }

    getDetail(id:number) : {
        id?:number,
        nama:string,
        email:string,
        umur:number,
        tangal_lahir:string,
        status:string
    } {
        const ApiIndex = this.findApiById(id);
        console.log('Api index', ApiIndex);
        const Api = this.Apis[ApiIndex];

        return Api;

    }

    updateApi(id:number,payload:any) : {status:string, message:string} {
        const {nama,email,umur,tangal_lahir,status} = payload;
        const ApiIndex = this.findApiById(id);
        this.Apis[ApiIndex].nama = nama;
        this.Apis[ApiIndex].email = email;
        this.Apis[ApiIndex].umur = umur;
        this.Apis[ApiIndex].tangal_lahir= tangal_lahir;
        this.Apis[ApiIndex].status= status;
        return {
            status:'online',
            message:'berhasil memperbarui Api anda',
        };

    }

    deleteApi(id:number) : {status:string, message:string}{
        const ApiIndex = this.findApiById(id);
        this.Apis.splice(ApiIndex, 2);
        return{
            status:'online',
            message:'berhasil menghapus Api anda'

        };
    }

    

}
