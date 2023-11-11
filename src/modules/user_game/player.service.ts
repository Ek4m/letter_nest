import { Injectable } from '@nestjs/common';
import { UserGame } from './player.model';
import { Game } from '../game/game.model';
import { GameService } from '../game/game.service';

@Injectable()
export class PlayerService {
  constructor(private gameService: GameService) {}

  async removePlayerFromGame(socketId: string) {
    console.log('______SOCKET ID', socketId);
    const player = await UserGame.findOne({
      where: { socketId },
      include: [{ model: Game }],
    });
    const room = player.game.id;
    await this.gameService.decrementUsers(player.game.id);
    await player.destroy({ force: true });
    return { room, userId: player.userId };
  }

  async enterToRoom(gameId: number, userId: number, socketId: string) {
    const game = await this.gameService.getOne(gameId);
    let gameStarted = false;
    const alreadyInLobby = await UserGame.findOne({
      where: { userId, gameId, socketId },
    });
    if (!alreadyInLobby) {
      if (game.numberOfUsers < 4) {
        console.log('____CREATED');
        await UserGame.create({
          gameId,
          userId,
          socketId,
        });
        await game.increment('numberOfUsers');
      }
      if (game.numberOfUsers === 4 && !game.isStarted) {
        gameStarted = true;
        game.isStarted = true;
      }
      await game.save();
    }
    return { game, gameStarted, alreadyInLobby };
  }
}
