import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { DbModule } from './conf/db';
import { ConfigModule } from './conf';

@Module({
  imports: [ConfigModule, AuthModule, UserModule],
  controllers: [],
  providers: [DbModule],
})
export class AppModule {}
