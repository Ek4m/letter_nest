import { Module } from '@nestjs/common';
import { DbModule } from './conf/db';
import { ConfigModule } from './conf';

import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ChatGateway } from './modules/events/events.gateway';
import { PlayerModule } from './modules/user_game/player.module';
import { GameModule } from './modules/game/game.module';

@Module({
  imports: [ConfigModule, AuthModule, UserModule, PlayerModule, GameModule],
  providers: [DbModule, ChatGateway],
})
export class AppModule {}
