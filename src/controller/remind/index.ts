import { RemindSetDTO } from './../../dto/remind';
import { ERemindStatus } from './../../enums/remind';
import {
  UseStatusResponse,
  EColumnType,
  Column,
  RemindItem,
} from './../../types/remind_interface';
import { ResponseMessage } from './../../utils/response';
import {
  ALL,
  Controller,
  Get,
  Inject,
  Param,
  Provide,
  Put,
  Query,
  Validate,
} from '@midwayjs/decorator';
import { ContextUtil } from '../../extend/context';
import { RemindService } from '../../service/remind';
import { EResponse } from '../../enums/response';
import { RemindDTO } from '../../dto/remind';
import { bubbleSort } from '../../utils/common';
import { parseTime } from '../../utils/date';

@Provide()
@Controller('/api/reminds')
export class RemindController {
  @Inject()
  private remindService: RemindService;

  @Inject()
  private contextUtil: ContextUtil;

  @Get('/get')
  @Validate()
  public async getReminds(@Query(ALL) query: RemindDTO) {
    const weeks = [
      {
        start: new Date('2022-01-27 00:00:00'),
        end: new Date('2022-02-02 23:59:59'),
        week: '一',
      },
      {
        start: new Date('2022-02-03 00:00:00'),
        end: new Date('2022-02-09 23:59:59'),
        week: '二',
      },
      {
        start: new Date('2022-02-10 00:00:00'),
        end: new Date('2022-02-16 23:59:59'),
        week: '三',
      },
      {
        start: new Date('2022-02-17 00:00:00'),
        end: new Date('2022-02-23 23:59:59'),
        week: '四',
      },
      {
        start: new Date('2022-02-24 00:00:00'),
        end: new Date('2022-12-31 23:59:59'),
        week: '一直到滴完',
      },
    ];

    const reminds = await this.remindService.getRemindsByDate(query.date);

    const fixColumns: Column = {
      id: -1,
      key: 'name',
      title: '药品名/时间',
      type: EColumnType['text'],
    };
    const dysincColumns: Column[] = bubbleSort(
      [...new Set(reminds.map(v => v.timeId))].map(
        m => reminds.find(v => v.timeId === m)?.time
      )
    ).map(time => {
      const column: Column = {
        id: time.id,
        key: time.name ?? '',
        title: time.name ?? '',
        type: EColumnType['checkbox'],
      };
      return column;
    });

    const columns: Column[] = [fixColumns, ...dysincColumns];
    const list: RemindItem[] = [...new Set(reminds.map(v => v.medicineId))].map(
      medicineId => {
        const medicine = reminds.find(
          remind => remind.medicineId === medicineId
        ).medicine;
        const res: RemindItem = {
          name: medicine.name,
        };

        reminds
          .filter(v => v.medicineId === medicineId)
          .forEach(column => {
            res[column.time.name] = column;
          });
        return res;
      }
    );

    const nowDay = query.date;
    const weekIndex = weeks.findIndex(v => {
      return (
        v.start.getTime() < nowDay.getTime() &&
        v.end.getTime() >= nowDay.getTime()
      );
    });
    const week = weeks[weekIndex].week;

    const startWeek = parseTime(weeks[weekIndex].start, '{m}月{d}日');
    const endWeek = parseTime(weeks[weekIndex].end, '{m}月{d}日');

    const result: UseStatusResponse = {
      columns,
      list,
      pageInfo: {
        pageHeader: `${parseTime(nowDay, '{m}月{d}日')} 用药时间`,
        startWeek,
        endWeek,
        week,
      },
    };

    return new ResponseMessage(EResponse['SUCCESS'], result);
  }

  @Put('/no/:id')
  @Validate()
  public async setRemindNoDrop(@Param(ALL) params: RemindSetDTO) {
    await this.remindService.setRemindNoById(params.id);
    return new ResponseMessage(EResponse['SUCCESS']);
  }

  @Put('/yes/:id')
  @Validate()
  public async setRemindYesDrop(@Param(ALL) params: RemindSetDTO) {
    await this.remindService.setRemindYesById(params.id);
    return new ResponseMessage(EResponse['SUCCESS']);
  }
}
