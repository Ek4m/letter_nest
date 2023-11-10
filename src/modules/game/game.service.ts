import { Injectable } from '@nestjs/common';
import { Game } from '../game/game.model';

@Injectable()
export class GameService {
  async create(name: string) {
    const game = await Game.create({ name });
    return game;
  }
}
