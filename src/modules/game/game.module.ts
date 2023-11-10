import { Global, Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';

@Global()
@Module({
  controllers: [GameController],
  exports: [GameService],
  providers: [GameService],
})
export class GameModule {}
