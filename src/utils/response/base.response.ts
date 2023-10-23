import { ResponsePagination, ResponseSuccess } from "src/interface";

class BaseResponse{

    _success(message:string,data?:any):ResponseSuccess{
        return{
            status:'success _succes',
            message:message,
            data:data||{}
    }
    }

    _pagination(
        message: string,
        data: any,
        totalData: number,
        page: number,
        pageSize: number
      ): ResponsePagination {
        return {
          status: "Success _pagination",
          message: message,
          data: data,
          pagination: {
            total: totalData,
            page: page,
            pageSize: pageSize,
          },
        };
      }
}
export default BaseResponse;