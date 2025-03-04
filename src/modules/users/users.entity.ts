import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { ProfileEntity } from '../profiles/entity/profile.entity';
import { EmployeeEntity } from '../employees/entity/employee.entity';
@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @Column({ type: 'nvarchar', unique: true })
  password?: string;

  @Exclude()
  @Column({ name: 'profile_id' })
  profileId: number;

  @OneToOne(() => ProfileEntity)
  @JoinColumn({ name: 'profile_id' })
  profile: ProfileEntity;

  @OneToOne(() => EmployeeEntity)
  @JoinColumn({ name: 'employee_id' })
  employee: EmployeeEntity;

  @CreateDateColumn() // Este campo será automaticamente preenchido com a data e hora de criação
  created_at: Date;

  @CreateDateColumn() // Este campo será automaticamente preenchido com a data e hora de criação
  updated_at: Date;
}
