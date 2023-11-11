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
    const { room, userId } = await this.playerService.removePlayerFromGame(
      client.id,
    );
    console.log('ROOM ' + room);
    client.leave(room);
    client.broadcast.emit('user_disconnected', userId);
  }

  @SubscribeMessage('join_game')
  async handleEnterGame(
    @MessageBody() body: JoinGameDto,
    @ConnectedSocket() client: Socket,
  ) {
    const { game, gameStarted, alreadyInLobby } =
      await this.playerService.enterToRoom(body.gameId, body.userId, client.id);
    const roomName = body.gameId.toString();
    if (game.numberOfUsers >= 4) {
      this.server.to(roomName).emit('room_full');
    } else {
      if (!alreadyInLobby) {
        this.server.in(client.id).socketsJoin(roomName);
        this.server.to(roomName).emit('user_connected', body.userId);
        if (gameStarted) {
          this.server.to(roomName).emit('game_started', body.userId);
        }
      } else {
        this.server.to(roomName).emit('already_in_room');
      }
    }
  }
}
