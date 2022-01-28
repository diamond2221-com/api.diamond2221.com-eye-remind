import { EResponse } from '../enums/response';

export class ResponseImp<T> {
  public code: number;
  public message: string;
  public data: T;
}

export class ResponseMessage<T = null> implements ResponseImp<T> {
  public code = 200;
  constructor(
    status: EResponse,
    public data: T = null as any,
    public message: string = 'success',
    public responseCode?: number
  ) {
    this.code = responseCode || status;
    this.data = data;
    if (status === EResponse.NOTHAS) {
      this.message = '用户不存在';
    } else if (status === EResponse.NOTAUTH) {
      this.message = '您未登录，请登录后再试';
    } else if (status === EResponse.LOGINED) {
      this.message === '账号已在别处,请您重新登录';
    } else if (status === EResponse.CODE_INVALID) {
      this.message === '验证码已失效';
    } else if (status === EResponse.CODE_INCORRECT) {
      this.message === '验证码不正确';
    }
  }
}
