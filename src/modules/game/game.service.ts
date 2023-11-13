import { Injectable } from '@nestjs/common';
import { Game } from '../game/game.model';
import { GameCards } from 'src/constants';
import { shuffleArray } from 'src/utils';
// import { Op } from 'sequelize';

@Injectable()
export class GameService {
  async getOne(id: number) {
    return await Game.findByPk(id);
  }

  async incrementUsers(id: number) {
    await Game.increment('numberOfUsers', { where: { id } });
  }

  async decrementUsers(id: number) {
    await Game.decrement('numberOfUsers', { where: { id } });
  }

  async create(name: string) {
    const game = Game.build({ name });
    game.cards = shuffleArray(GameCards);
    await game.save();
    return game;
  }

  async getActiveGames() {
    const game = await Game.findAll({
      where: {
        // isStarted: { [Op.eq]: true },
        // isFinished: { [Op.eq]: false },
      },
    });
    return game;
  }
}
