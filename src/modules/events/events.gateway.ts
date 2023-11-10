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

@WebSocketGateway()
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
    client.leave(room);
    this.server.to(room).emit('user_disconnected', userId);
  }

  @SubscribeMessage('join_game')
  async handleEnterGame(
    @MessageBody() body: JoinGameDto,
    @ConnectedSocket() client: Socket,
  ) {
    const { gameStarted } = await this.playerService.enterToRoom(
      body.gameId,
      body.userId,
    );
    const roomName = body.gameId.toString();
    this.server.in(client.id).socketsJoin(roomName);
    this.server.to(roomName).emit('user_connected', body.userId);
    if (gameStarted) {
      this.server.to(roomName).emit('game_started', body.userId);
    }
  }
}
