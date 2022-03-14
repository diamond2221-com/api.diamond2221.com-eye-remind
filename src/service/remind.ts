import { SetRemindData } from './../types/remind_interface';
import {
  EColumnType,
  RemindItem,
  UseStatusResponse,
} from './../types/remind_interface';
import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Context } from 'egg';
import { Repository } from 'typeorm';
import { MedicineEnum } from '../entity/medicine-enum';
import { Remind } from '../entity/remind';
import { TimeEnum } from '../entity/time-enum';
import { EIsDel, ERemindStatus } from '../enums/remind';
import { Column } from '../types/remind_interface';
import { parseTime } from '../utils/date';
import { bubbleSort } from '../utils/common';
import { EResponse } from '../enums/response';
import { ResponseMessage } from '../utils/response';

@Provide()
export class RemindService {
  @Inject()
  private ctx: Context;

  @InjectEntityModel(Remind)
  private remindModel: Repository<Remind>;

  @InjectEntityModel(TimeEnum)
  private timeEnumModel: Repository<TimeEnum>;

  @InjectEntityModel(MedicineEnum)
  private medicineEnumModel: Repository<MedicineEnum>;

  private async getReminds(date: Date) {
    const reminds = await this.remindModel.find({
      where: {
        date: date.toLocaleDateString('zh'),
        isDel: EIsDel['unDel'],
      },
    });
    return reminds;
  }

  public async getRemindsByDate(date: Date) {
    const reminds = await this.getReminds(date);
    const results: (Remind & { medicine?: MedicineEnum; time?: TimeEnum })[] =
      [];
    for (let i = 0; i < reminds.length; i++) {
      const remind = reminds[i];
      const medicine = await this.medicineEnumModel.findOne({
        where: {
          id: remind.medicineId,
        },
      });
      const time = await this.timeEnumModel.findOne({
        where: { id: remind.timeId },
      });

      results.push({
        ...remind,
        medicine,
        time,
      });
    }

    return results;
  }

  public async setRemindYesById(id: number) {
    const remind = await this.remindModel.findOne(id);
    if (remind) {
      remind.status = ERemindStatus['yes'];
      remind.remark = `${parseTime(new Date(), '{h}点{i}分')}`;
      return await this.remindModel.save(remind);
    }
  }

  public async setRemindNoById(id: number) {
    const remind = await this.remindModel.findOne(id);

    if (remind) {
      remind.status = ERemindStatus['no'];
      remind.remark = '';
      await this.remindModel.save(remind);
    }
    return;
  }

  public async getAllMedicine() {
    return await this.medicineEnumModel.find();
  }

  public async getAllTime() {
    return await this.timeEnumModel.find();
  }

  public getPageInfo(date: Date): UseStatusResponse['pageInfo'] {
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
    const weekIndex = weeks.findIndex(v => {
      return (
        v.start.getTime() < date.getTime() && v.end.getTime() >= date.getTime()
      );
    });
    const week = weeks[weekIndex].week;

    const startWeek = parseTime(weeks[weekIndex].start, '{m}月{d}日');
    const endWeek = parseTime(weeks[weekIndex].end, '{m}月{d}日');

    return {
      pageHeader: `${parseTime(date, '{m}月{d}日')} 用药时间`,
      week,
      startWeek,
      endWeek,
    };
  }

  public async getColumns(date: Date, all = false): Promise<Column[]> {
    const reminds = await this.getRemindsByDate(date);
    const fixColumns: Column = {
      id: -1,
      key: 'name',
      title: '药品名/时间',
      type: EColumnType['text'],
    };

    let times: TimeEnum[] = [];
    if (all) {
      times = await this.getAllTime();
    }
    const dysincColumns: Column[] = bubbleSort(
      all
        ? times
        : [...new Set(reminds.map(v => v.timeId))].map(
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
    return columns;
  }

  public async getRows(date: Date, all = false): Promise<RemindItem[]> {
    const reminds = await this.getRemindsByDate(date);
    const medicines = await this.getAllMedicine();

    const medicineIds = all
      ? medicines.map(v => v.id)
      : [...new Set(reminds.map(v => v.medicineId))];

    const rows: RemindItem[] = medicineIds.map(medicineId => {
      const medicineName =
        (all
          ? medicines.find(v => v.id === medicineId)?.name
          : reminds.find(remind => remind.medicineId === medicineId)?.medicine
              .name) ?? '';
      const res: RemindItem = {
        name: medicineName,
        medicineId,
      };

      reminds
        .filter(v => v.medicineId === medicineId)
        .forEach(column => {
          res[column.time.name] = column;
        });
      return res;
    });

    return rows;
  }

  public async getConfigByDate(date: Date, all = false) {
    const result: UseStatusResponse = {
      columns: await this.getColumns(date, all),
      rows: await this.getRows(date, all),
      pageInfo: this.getPageInfo(date),
    };

    return result;
  }

  public async setRemind(data: SetRemindData): Promise<void> {
    const remind: void | Remind = await this.remindModel.findOne({
      where: {
        timeId: data.timeId,
        medicineId: data.medicineId,
        date: data.date.toLocaleDateString(),
      },
    });
    if (data.status === ERemindStatus['yes'] && !remind) {
      const model = new Remind();
      model.timeId = data.timeId;
      model.medicineId = data.medicineId;
      model.date = data.date;
      model.status = ERemindStatus['no'];
      model.addTime = new Date();
      model.updateTime = new Date();
      await this.remindModel.save(model);
    }
    if (data.status === ERemindStatus['yes'] && remind) {
      remind.isDel = EIsDel['unDel'];
      await this.remindModel.save(remind);
    }
    if (data.status === ERemindStatus['no'] && remind) {
      remind.isDel = EIsDel['del'];
      await this.remindModel.save(remind);
    }
    return;
  }

  /**
   * @description
   * @author ZhangYù
   * @date 14/03/2022
   * @param {Date} date1 被复制的当天日期
   * @param {Date} date2 将要复制到某一天的日期
   * @return {*}  {Promise<ResponseMessage<Remind[]>>}
   * @memberof RemindService
   */
  public async copyDayRemind(
    date1: Date,
    date2: Date
  ): Promise<ResponseMessage<Remind[]>> {
    if (date1.toLocaleDateString('zh') === date2.toLocaleDateString('zh')) {
      return new ResponseMessage(
        EResponse['ERROR'],
        null,
        '两个日期不可以相同'
      );
    }
    const reminds = await this.getReminds(date1);
    reminds.forEach(v => {
      delete v.id;
      v.status = ERemindStatus['no'];
      v.remark = '';
      v.date = date2;
      v.addTime = new Date();
      v.updateTime = new Date();
    });
    const res = await this.remindModel.save(reminds);
    return new ResponseMessage(EResponse['SUCCESS'], res);
  }
}
