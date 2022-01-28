import { Aspect, IMethodAspect, Provide } from '@midwayjs/decorator';
import { RemindController } from '../controller/remind';

@Provide()
@Aspect([RemindController])
export class ReportInfo implements IMethodAspect {
  // async before(point: JoinPoint): Promise<void> {}
}
