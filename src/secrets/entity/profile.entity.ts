import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'secrets_profile',
})
export default class ProfileEntity implements Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  openid: string;

  @Column()
  avatar: string;

  @Column()
  nickname: string;

  @Column()
  homeUrl: string;
}
