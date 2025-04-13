import { HttpException, HttpStatus } from '@nestjs/common';
import { IsMongoId } from 'class-validator';

export class IdParam {
  @IsMongoId()
  id: string;
}

export class Meta {
  limit: number;

  offset: number;

  total: number;
}

export class ApiResponse<T = unknown> {
  code: string;
  success: boolean;
  message: string;
  meta?: Meta;
  data?: T;

  constructor({ code, success, message, meta, data }: ApiResponse<T>) {
    this.code = code;
    this.success = success;
    this.message = message;
    this.meta = meta;
    this.data = data;
  }

  static ok = <U>({ data, message, meta }: Partial<ApiResponse<U>>) => {
    return new ApiResponse<U>({
      code: 'PR000',
      success: true,
      message: message || 'Success',
      meta,
      data,
    });
  };
}

export { ApiResponse as ResponseDto };

export class ApiError extends HttpException {
  constructor({
    code,
    message,
    httpStatus,
  }: {
    code: string;
    message: string;
    httpStatus: HttpStatus;
  }) {
    super(new ApiResponse({ code, message, success: false }), httpStatus);
  }
}
