import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { PlayerService } from '../user_game/player.service';
import { JoinGameDto } from './game.dto';

@WebSocketGateway({ cors: { origin: 'http://localhost:3000' } })
export class ChatGateway {
  constructor(private playerService: PlayerService) {}
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    client.emit('is_online', client.id);
  }

  async handleDisconnect(client: Socket) {
    console.log('EXITING CLIENT ID', client.id);
    const { room, userId } = await this.playerService.removePlayerFromGame(
      client.id,
    );
    client.leave(room);
    this.server.to(room).emit('user_connected', userId);
  }

  @SubscribeMessage('join_game')
  async handleEnterGame(
    @MessageBody() body: JoinGameDto,
    @ConnectedSocket() client: Socket,
  ) {
    const { game, gameStarted, alreadyInLobby } =
      await this.playerService.enterToRoom(body.gameId, body.userId, client.id);
    const roomName = body.gameId.toString();
    if (game.numberOfUsers >= 3) {
      this.server.to(roomName).emit('room_full');
    } else {
      if (!alreadyInLobby) {
        this.server.in(client.id).socketsJoin(roomName);
        const gameCopy = game.get();
        this.server
          .to(roomName)
          .emit('user_connected', { userId: body.userId, game: gameCopy });
        if (gameStarted) {
          const { players, cards } = await this.playerService.drawCards(game);
          gameCopy.users = players;
          game.cards = cards;
          gameCopy.cards = cards;
          game.startsAt = new Date();
          await game.save();
          this.server.to(roomName).emit('game_started');
          setTimeout(() => {
            this.server.to(roomName).emit('game_state', gameCopy);
          }, 2000);
        }
      } else {
        this.server.to(roomName).emit('already_in_room');
      }
    }
  }
}
