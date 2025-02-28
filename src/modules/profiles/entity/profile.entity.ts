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
import { User } from '../../users/users.entity';
@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
