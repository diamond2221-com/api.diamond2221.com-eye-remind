import { Rule, RuleType } from '@midwayjs/decorator';

export class PagingDto {
  @Rule(RuleType.number().required())
  page: number;

  @Rule(RuleType.number().required())
  size: number;
}
