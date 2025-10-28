export default class ResponseDto<T = any> {
  success: boolean;
  message: string;
  statusCode: number;
  data?: T;
  error?: string;
  timestamp: string;

  constructor(partial: Partial<ResponseDto<T>>) {
    Object.assign(this, partial);
    this.timestamp = new Date().toISOString();
  }

  // 成功响应快捷方法
  static success<T>(
    data: T,
    message: string = '成功',
    statusCode: number = 200,
  ): ResponseDto<T> {
    return new ResponseDto({
      success: true,
      message,
      statusCode,
      data,
    });
  }

  // 错误响应快捷方法
  static error(
    message: string,
    statusCode: number = 500,
    error?: string,
  ): ResponseDto {
    return new ResponseDto({
      success: false,
      message,
      statusCode,
      error,
    });
  }
}
