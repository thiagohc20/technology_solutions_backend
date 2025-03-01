import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToOne,
  BeforeUpdate,
  OneToMany,
  ManyToMany,
  PrimaryColumn,
} from 'typeorm';

import { UserEntity } from 'src/modules/users/users.entity';
@Entity('profiles')
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => UserEntity)
  user: UserEntity;
}
