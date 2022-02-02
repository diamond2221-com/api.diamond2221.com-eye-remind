import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Context } from 'egg';
import { Repository } from 'typeorm';
import { MedicineEnum } from '../entity/medicine-enum';
import { Remind } from '../entity/remind';
import { TimeEnum } from '../entity/time-enum';
import { ERemindStatus } from '../enums/remind';

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

  public async getRemindsByDate(date: Date) {
    const reminds = await this.remindModel.find({
      where: {
        date: date.toLocaleDateString(),
      },
    });
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
    return await this.remindModel.update(
      { id },
      { status: ERemindStatus['yes'] }
    );
  }

  public async setRemindNoById(id: number) {
    return await this.remindModel.update(
      { id },
      { status: ERemindStatus['no'] }
    );
  }
}
