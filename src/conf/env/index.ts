import { ConfigModule as Conf } from '@nestjs/config';
import { resolve } from 'path';

const __ENV_DIR = `${process.cwd()}/.env`;
export const ConfigModule = Conf.forRoot({
  envFilePath: [resolve(__ENV_DIR)],
  isGlobal: true,
});
