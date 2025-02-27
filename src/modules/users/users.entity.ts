import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Profile } from '../profiles/entity/profile.entity';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @Column()
  @Expose()
  name: string;

  @Column({ unique: true })
  @Expose()
  email: string;

  @Column({ unique: true })
  @Expose()
  cpf: string;

  @Column({ nullable: true })
  @Exclude()
  transfer_password?: string;

  @Column({ default: false })
  @Exclude()
  hasTransferPassword: boolean;

  @Column({ nullable: true })
  @Exclude()
  password?: string;

  @ManyToMany(() => Profile, (profile) => profile.users)
  @JoinTable()
  profiles: Profile[];

  @ManyToMany(() => User, (user) => user.contacts)
  @JoinTable({
    name: 'user_contacts',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'contact_id', referencedColumnName: 'id' },
  })
  contacts: User[];

  @Column()
  @Exclude()
  created_at: Date;

  @Column()
  updated_at: Date;

  // @Column()
  // updated_by: string;

  @BeforeInsert()
  public insert(): void {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  // @BeforeUpdate()
  // public update(): void {
  // 	this.updated_by;
  // }
}
