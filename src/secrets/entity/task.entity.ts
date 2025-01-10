import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'secrets_task',
})
export default class TaskEntity implements Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '微信用户 openid',
    update: false,
  })
  openid: string;

  @Column({
    comment: '可见模式',
    default: 'public',
    type: 'varchar',
  })
  visible: Task['visible'];

  @Column({
    comment: '优先级',
    default: 'common',
    type: 'varchar',
  })
  priority: Task['priority'];

  @Column({
    comment: '一级目录',
  })
  catalog: string;

  @Column({
    comment: '任务标题',
  })
  title: string;

  @Column({
    comment: '任务描述',
  })
  taskDesc?: string;

  @Column({
    comment: '任务截止时间',
  })
  deadline: string;

  @Column({
    comment: '任务第一次编辑的时间',
    update: false,
  })
  registerDate: string;

  @Column({
    comment: '任务最后一次更新的时间',
  })
  lastUpdateDate: string;

  @Column({
    comment: '任务完成标志',
    update: false,
    default: false,
  })
  done: boolean;

  @Column({
    comment: '任务完成时间',
    update: false,
    default: '',
  })
  doneDate: string;

  @Column({
    comment: '任务完成的文本描述',
    default: '',
  })
  doneDesc: string;

  @Column({
    comment: '任务完成的附件地址',
    default: '',
  })
  doneAttachMent: string;
}
