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

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @CreateDateColumn()
  @Exclude()
  updated_at: Date;

  @CreateDateColumn()
  @Exclude()
  expiration: Date;

  // @OneToOne(() => UserEntity)
  // @JoinColumn({ name: 'user_id' })
  // @Exclude()
  // user: UserEntity;
}
