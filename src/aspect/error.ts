import { ILogger } from '@midwayjs/logger';
import {
  Aspect,
  IMethodAspect,
  JoinPoint,
  Provide,
  Logger,
} from '@midwayjs/decorator';
import { EResponse } from '../enums/response';
import { ResponseMessage } from '../utils/response';
import { RemindController } from '../controller/remind';

@Provide()
@Aspect([RemindController])
export class ErrorInfo implements IMethodAspect {
  @Logger()
  logger: ILogger;

  async around(point: JoinPoint): Promise<ResponseMessage> {
    try {
      const result = await point.proceed(...point.args); // 执行原方法
      return result;
    } catch (error) {
      if (error.name === 'ValidationError') {
        return new ResponseMessage(EResponse['INVALID'], null, '参数有误');
      }
      this.logger.error(error);
      return new ResponseMessage(EResponse['ERROR'], null, '系统出现错误');
    }
  }
}
