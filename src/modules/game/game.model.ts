import {
  Column,
  DataType,
  DeletedAt,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { GameStatus } from './game_state.enum';
import { UserGame } from '../user_game/user_game.model';

@Table
export class Game extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({ type: DataType.INTEGER })
  numberOfUsers: number;

  @Column({ type: DataType.STRING, defaultValue: GameStatus.PENDING })
  state: GameStatus;

  @Column({ type: DataType.DATE })
  startsAt: Date;

  @Column({ type: DataType.DATE })
  endsAt: Date;

  @HasMany(() => UserGame)
  users: UserGame[];

  @Column({ type: DataType.TEXT('long') })
  gameProgress: string;

  @DeletedAt
  deletedAt: Date;
}