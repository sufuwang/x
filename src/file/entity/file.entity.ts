import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'secrets_files',
})
export class SecretsFilesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '微信用户 openid',
    update: false,
  })
  openid: string;

  @Column({
    comment: '文件使用缘由',
    update: false,
    default: '',
  })
  parentType: string;

  @Column({
    comment: '文件使用缘由 ID',
    update: false,
  })
  parentId: number;

  @Column({
    comment: '上传时间',
    update: false,
  })
  uploadDate: string;

  @Column({
    comment: '文件名称',
    update: false,
  })
  fileName: string;
}
