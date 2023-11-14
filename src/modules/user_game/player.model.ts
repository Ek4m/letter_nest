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
import { LoveLetterCard } from 'src/constants';

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

  @Column({
    type: DataType.TEXT('medium'),
    set(val: any) {
      this.setDataValue('cards', JSON.stringify(val));
    },
    get() {
      const cardArray = JSON.parse(this.getDataValue('cards'));
      return cardArray;
    },
  })
  cards: LoveLetterCard[];

  @Column({
    type: DataType.TEXT('medium'),
    set(val: any) {
      this.setDataValue('drawedCards', JSON.stringify(val));
    },
    get() {
      const cardArray = JSON.parse(this.getDataValue('drawedCards'));
      return cardArray;
    },
  })
  drawedCards: LoveLetterCard[];

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isAdmin: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  turn: boolean;

  @DeletedAt
  deletedAt: Date;
}
