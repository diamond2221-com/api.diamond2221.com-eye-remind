import {
  RemindChangeDTO,
  RemindSetDTO,
  RemindCopyDTO,
} from './../../dto/remind';
import { ResponseMessage } from './../../utils/response';
import {
  ALL,
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Provide,
  Put,
  Query,
  Validate,
} from '@midwayjs/decorator';
import { RemindService } from '../../service/remind';
import { EResponse } from '../../enums/response';
import { RemindDTO } from '../../dto/remind';

@Provide()
@Controller('/api/reminds')
export class RemindController {
  @Inject()
  private remindService: RemindService;

  @Get('/get')
  @Validate()
  public async getReminds(@Query(ALL) query: RemindDTO) {
    return new ResponseMessage(
      EResponse['SUCCESS'],
      await this.remindService.getConfigByDate(query.date, false)
    );
  }

  @Get('/getAll')
  @Validate()
  public async getAllReminds(@Query(ALL) query: RemindDTO) {
    return new ResponseMessage(
      EResponse['SUCCESS'],
      await this.remindService.getConfigByDate(query.date, true)
    );
  }

  @Put('/no/:id')
  @Validate()
  public async setRemindNoDrop(@Param(ALL) params: RemindChangeDTO) {
    await this.remindService.setRemindNoById(params.id);
    return new ResponseMessage(EResponse['SUCCESS']);
  }

  @Put('/yes/:id')
  @Validate()
  public async setRemindYesDrop(@Param(ALL) params: RemindChangeDTO) {
    return new ResponseMessage(
      EResponse['SUCCESS'],
      await this.remindService.setRemindYesById(params.id)
    );
  }

  @Post('/set')
  @Validate()
  public async setRemind(@Body(ALL) body: RemindSetDTO) {
    return new ResponseMessage(
      EResponse['SUCCESS'],
      await this.remindService.setRemind(body)
    );
  }

  @Post('/copy')
  @Validate()
  public async copyRemind(@Body(ALL) body: RemindCopyDTO) {
    return await this.remindService.copyDayRemind(body.date1, body.date2);
  }
}
