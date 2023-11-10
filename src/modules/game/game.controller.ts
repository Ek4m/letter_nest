import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GameService } from './game.service';
import { JwtGuard } from '../auth/jwt.guard';

@UseGuards(JwtGuard)
@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Post('create_room')
  async create(@Body() body: { name: string }) {
    const game = await this.gameService.create(body.name);
    return game;
  }
}
