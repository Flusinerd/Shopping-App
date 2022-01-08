import { hash } from 'bcrypt';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
@Index('users_email_unique', ['email'], { unique: true })
@Index('users_username_unique', ['username'], { unique: true })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  private hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }

  @BeforeInsert()
  async hashPasswordBeforeSave() {
    this.password = await this.hashPassword(this.password);
  }

  @BeforeUpdate()
  async hashPasswordBeforeUpdate() {
    if (this.password) {
      this.password = await this.hashPassword(this.password);
    }
  }
}
