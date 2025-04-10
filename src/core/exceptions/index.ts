import { HttpException, HttpStatus } from '@nestjs/common';
import { ResponseDto } from '../dto';

export class ErrorException extends HttpException {
  static BAD_REQUEST = () =>
    new ErrorException(
      {
        code: 'PR001',
        message: 'Bad Request',
        success: false,
      },
      HttpStatus.BAD_REQUEST,
    );

  static BAD_REQUEST_WITH = ({ message }: Partial<ResponseDto>) => {
    return new ErrorException(
      {
        code: 'PR001',
        message: message || 'Bad Request',
        success: false,
      },
      HttpStatus.BAD_REQUEST,
    );
  };

  static UNAUTHORIZED = () =>
    new ErrorException(
      {
        code: 'PR002',
        message: 'Unauthorized',
        success: false,
      },
      HttpStatus.UNAUTHORIZED,
    );

  static FORBIDDEN = () =>
    new ErrorException(
      {
        code: 'PR003',
        message: 'Forbidden',
        success: false,
      },
      HttpStatus.FORBIDDEN,
    );

  static FORBIDDEN_WITH = ({ message }: Partial<ResponseDto>) => {
    return new ErrorException(
      {
        code: 'PR003',
        message: message || 'Forbidden',
        success: false,
      },
      HttpStatus.FORBIDDEN,
    );
  };

  static INTERNAL_SERVER_ERROR = () =>
    new ErrorException(
      {
        code: 'PR004',
        message: 'Internal Server Error',
        success: false,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );

  static INTERNAL_SERVER_ERROR_WITH = ({ data }: Partial<ResponseDto>) => {
    return new ErrorException(
      {
        code: 'PR004',
        message: 'Internal Server Error',
        success: false,
        data,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  };

  static NOT_FOUND = () =>
    new ErrorException(
      {
        code: 'PR005',
        message: 'Not Found',
        success: false,
      },
      HttpStatus.NOT_FOUND,
    );

  static NOT_FOUND_WITH = ({ message }: Partial<ResponseDto>) => {
    return new ErrorException(
      {
        code: 'PR005',
        message: message || 'Not Found',
        success: false,
      },
      HttpStatus.NOT_FOUND,
    );
  };

  static CONFLICT_WITH = ({ message }: Partial<ResponseDto>) => {
    return new ErrorException(
      {
        code: 'PR006',
        message,
        success: false,
      },
      HttpStatus.CONFLICT,
    );
  };
}
