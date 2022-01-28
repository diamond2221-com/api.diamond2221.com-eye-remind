import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { ERemindStatus } from '../enums/remind';

@EntityModel('tbl_remind')
export class Remind {
  @PrimaryGeneratedColumn({
    type: 'int',
    comment: '帖子id 唯一',
    name: 'post_id',
  })
  public postId: number;

  @Column({
    type: 'varchar',
    comment: '关联用户的id',
    name: 'user_id',
  })
  public userId: string;

  @Column({
    type: 'varchar',
    comment: '发帖时的文本内容',
    name: 'content',
  })
  public content: string;
  @Column({
    type: 'int',
    comment: `
        该帖子的状态:
        1: 所有人可见
        2: 仅自己可见
        3: 所有人不可见（被删除）
    `,
    name: 'status',
  })
  public status: ERemindStatus;
  @Column({
    type: 'varchar',
    comment: '发帖的时间戳',
    name: 'add_time',
  })
  public addTime: string; // date
}
