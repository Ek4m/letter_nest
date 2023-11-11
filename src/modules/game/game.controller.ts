import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GameService } from './game.service';
import { JwtGuard } from '../auth/jwt.guard';

@UseGuards(JwtGuard)
@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Get()
  async getActiveGames() {
    return await this.gameService.getActiveGames();
  }

  @Post('create_room')
  async create(@Body() body: { name: string }) {
    const game = await this.gameService.create(body.name);
    return game;
  }
}
