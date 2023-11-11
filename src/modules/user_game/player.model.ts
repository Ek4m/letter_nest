import {
  BelongsTo,
  Column,
  DataType,
  DeletedAt,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../user/user.model';
import { Game } from '../game/game.model';

@Table({ timestamps: true })
export class UserGame extends Model {
  @ForeignKey(() => Game)
  gameId: number;

  @BelongsTo(() => Game)
  game: Game;

  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  user: Game;

  @Column({
    type: DataType.STRING,
  })
  socketId: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isAdmin: boolean;

  @DeletedAt
  deletedAt: Date;
}
