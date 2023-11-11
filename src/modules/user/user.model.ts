import {
  Column,
  DataType,
  DeletedAt,
  Model,
  Table,
} from 'sequelize-typescript';
import { Encryption } from 'src/utils';
import { UserRole } from './user.enum';

@Table
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'Email is required' },
      isEmail: { msg: 'Email is in invalid format' },
    },
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'First name is required' },
      len: {
        msg: 'First name must contain min 2 and max 12 characters',
        args: [2, 12],
      },
    },
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'Last name is required' },
      len: {
        msg: 'Last name must contain min 2 and max 12 characters',
        args: [2, 12],
      },
    },
  })
  lastName: string;

  @Column({
    set(val: any) {
      this.setDataValue('password', Encryption.hashPassword(val));
    },
    allowNull: false,
    validate: { notNull: { msg: 'Password is required' } },
    type: DataType.STRING,
  })
  password: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  @Column({
    defaultValue: UserRole.USER,
    type: DataType.STRING,
  })
  role: UserRole;

  @DeletedAt
  deletedAt: Date;
}
