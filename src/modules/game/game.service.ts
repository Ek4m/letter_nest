import { Injectable } from '@nestjs/common';
import { Game } from '../game/game.model';

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
    const game = await Game.create({ name });
    return game;
  }
}
