import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Like, Repository } from 'typeorm';
import { MedicineEnum } from '../entity/medicine-enum';
import { Remind } from '../entity/remind';
import { TimeEnum } from '../entity/time-enum';
import { EResponse } from '../enums/response';
import { ResponseMessage } from '../utils/response';

@Provide()
export class ToolsService {
  @InjectEntityModel(Remind)
  private remindModel: Repository<Remind>;

  @InjectEntityModel(TimeEnum)
  private timeEnumModel: Repository<TimeEnum>;

  @InjectEntityModel(MedicineEnum)
  private medicineEnumModel: Repository<MedicineEnum>;

  public async resetRemark() {
    const res = await this.remindModel.find({
      where: {
        remark: Like('%点的药%'),
      },
    });
    res.forEach(v => (v.remark = v.remark.replace('点的药', '')));
    return new ResponseMessage(
      EResponse['SUCCESS'],
      await this.remindModel.save(res)
    );
  }
}
