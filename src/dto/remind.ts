import { Rule, RuleType } from '@midwayjs/decorator';
// import { ERemindStatus } from '../enums/remind';

export class RemindDTO {
  @Rule(RuleType.date().required())
  date: Date;
}

export class RemindSetDTO {
  @Rule(RuleType.number().required().min(1))
  id: number;
}
