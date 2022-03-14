import { Controller, Inject, Post, Provide } from '@midwayjs/decorator';
import { ToolsService } from '../../service/tools';

@Provide()
@Controller('/api/tools')
export class ToolsController {
  @Inject()
  private toolsService: ToolsService;

  @Post('/resetRemark')
  public async resetRemark() {
    return await this.toolsService.resetRemark();
  }
}
