import { ResponseMessage } from './../../utils/response';
import { Controller, Get, Inject, Provide, Query } from '@midwayjs/decorator';
import { ContextUtil } from '../../extend/context';
import { RemindService } from '../../service/remind';
import { EResponse } from '../../enums/response';

@Provide()
@Controller('/api/reminds')
export class RemindController {
  @Inject()
  private remindService: RemindService;

  @Inject()
  private contextUtil: ContextUtil;

  @Get('/get')
  public getReminds(@Query('date') date: string) {
    return new ResponseMessage(EResponse['SUCCESS'], date);
  }
}
