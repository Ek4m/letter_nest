import { Injectable } from '@nestjs/common';
import { UserGame } from './player.model';
import { Game } from '../game/game.model';

@Injectable()
export class PlayerService {
  async removePlayerFromGame(socketId: string) {
    const player = await UserGame.findOne({
      where: { socketId },
      include: [{ model: Game }],
    });
    const room = player.game.name;
    await player.destroy({ force: true });
    return room;
  }

  async enterToRoom(gameId: number, userId: number) {
    const player = await UserGame.create({
      gameId,
      userId,
    });
    return player;
  }
}
