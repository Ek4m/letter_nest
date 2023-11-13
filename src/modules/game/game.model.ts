import {
  Column,
  DataType,
  DeletedAt,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { GameStatus } from './game_state.enum';
import { UserGame } from '../user_game/player.model';
import { LoveLetterCard } from 'src/constants';

@Table
export class Game extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  numberOfUsers: number;

  @Column({ type: DataType.STRING, defaultValue: GameStatus.PENDING })
  state: GameStatus;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isStarted: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isFinished: boolean;

  @Column({ type: DataType.DATE })
  startsAt: Date;

  @Column({ type: DataType.DATE })
  endsAt: Date;

  @Column({
    type: DataType.TEXT('medium'),
    set(val: any) {
      this.setDataValue('cards', JSON.stringify(val));
    },
    get() {
      return JSON.parse(this.getDataValue('cards'));
    },
  })
  cards: LoveLetterCard[];

  @HasMany(() => UserGame)
  users: UserGame[];

  @Column({ type: DataType.TEXT('long') })
  gameProgress: string;

  @DeletedAt
  deletedAt: Date;
}
