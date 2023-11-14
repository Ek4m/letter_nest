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
    if (player) {
      const room = player.game.id.toString();
      await this.gameService.decrementUsers(player.game.id);
      await player.destroy({ force: true });
      return { room, userId: player.userId };
    }
  }

  async enterToRoom(gameId: number, userId: number, socketId: string) {
    const game = await this.gameService.getOne(gameId);
    let gameStarted = false;
    const alreadyInLobby = await UserGame.findOne({
      where: { userId, gameId, socketId },
    });
    if (!alreadyInLobby) {
      if (game.numberOfUsers < 3) {
        await UserGame.create({
          gameId,
          userId,
          socketId,
        });
        await game.increment('numberOfUsers');
      }
      console.log(game.get());
      if (game.numberOfUsers === 2 && !game.isStarted) {
        gameStarted = true;
        game.isStarted = true;
      }
      await game.save();
    }
    return { game, gameStarted, alreadyInLobby };
  }

  async drawCards(game: Game) {
    const players = await UserGame.findAll({ where: { gameId: game.id } });
    const cards = game.cards;
    console.log('____CARDS', cards);
    for (const player of players) {
      player.cards = cards.splice(0, 2);
      await player.save();
    }
    game.cards = cards;
    await game.save();
    return { players, cards };
  }
}
