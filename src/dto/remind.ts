import { SetRemindData } from './../types/remind_interface';
import { PickDto, Rule, RuleType } from '@midwayjs/decorator';
import { ERemindStatus } from '../enums/remind';

const NumberRequired = RuleType.number().required();

export class RemindDTO {
  @Rule(RuleType.date().required())
  date: Date;
}

export class RemindChangeDTO {
  @Rule(NumberRequired.min(1))
  id: number;
}

export class RemindSetDTO
  extends PickDto(RemindDTO, ['date'])
  implements SetRemindData
{
  @Rule(NumberRequired)
  timeId: number;

  @Rule(NumberRequired)
  medicineId: number;

  @Rule(NumberRequired)
  status: ERemindStatus;
}
