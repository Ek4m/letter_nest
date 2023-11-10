import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PlayerService } from '../user_game/player.service';

const users: any[] = [];

@WebSocketGateway()
export class ChatGateway {
  constructor(private playerService: PlayerService) {}
  @WebSocketServer()
  server: Server;

  handleConnection() {
    console.log('USER CONNECTED');
  }

  async handleDisconnect(client: Socket) {
    const roomName = await this.playerService.removePlayerFromGame(client.id);
    client.leave(roomName);
  }

  @SubscribeMessage('join_game')
  handleEnterGame(
    @MessageBody() name: string,
    @ConnectedSocket() client: Socket,
  ) {
    users.push({ id: client.id });
    this.server.in(client.id).socketsJoin(name);
    this.server.to(name).emit('game_state', users);
  }
}
