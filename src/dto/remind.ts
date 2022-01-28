import { Rule, RuleType } from '@midwayjs/decorator';
import { ERemindStatus } from '../enums/remind';

export class RemindDTO {
  @Rule(RuleType.string())
  userId: string;

  @Rule(RuleType.string().required().max(300))
  content: string;

  @Rule(RuleType.array().items(RuleType.string().required()).required())
  imgs: string[];

  @Rule(RuleType.number().required().default(1).min(1).max(2))
  status: ERemindStatus;

  @Rule(RuleType.string().length(11))
  addTime: string;
}
