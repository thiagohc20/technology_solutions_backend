import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { UserEntity } from 'src/modules/users/users.entity';
@Entity('status_invitation')
export class StatusInvitationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Expose()
  email: string;

  @Column({ name: 'status_id' })
  @Expose()
  statusId: number;

  @CreateDateColumn() // Este campo será automaticamente preenchido com a data e hora de criação
  @Exclude()
  created_at: Date;

  @CreateDateColumn() // Este campo será automaticamente preenchido com a data e hora de criação
  @Exclude()
  updated_at: Date;

  // @OneToOne(() => UserEntity)
  // @JoinColumn({ name: 'user_id' })
  // @Exclude()
  // user: UserEntity;
}
