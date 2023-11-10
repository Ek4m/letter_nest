import { Injectable } from '@nestjs/common';
import { UserGame } from './player.model';
import { Game } from '../game/game.model';
import { GameService } from '../game/game.service';

@Injectable()
export class PlayerService {
  constructor(private gameService: GameService) {}

  async removePlayerFromGame(socketId: string) {
    const player = await UserGame.findOne({
      where: { socketId },
      include: [{ model: Game }],
    });
    const room = player.game.name;
    await this.gameService.incrementUsers(player.game.id);
    await player.destroy({ force: true });
    return { room, userId: player.userId };
  }

  async enterToRoom(gameId: number, userId: number) {
    const game = await this.gameService.getOne(gameId);
    if (game.numberOfUsers < 4) {
      await UserGame.create({
        gameId,
        userId,
      });
      await game.increment('numberOfUsers');
    }
    let gameStarted = false;
    if (game.numberOfUsers === 4 && !game.isStarted) {
      game.isStarted = true;
      gameStarted = true;
    }
    await game.save();
    return { game, gameStarted };
  }
}
