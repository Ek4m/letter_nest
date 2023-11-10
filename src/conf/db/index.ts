import { Sequelize } from 'sequelize-typescript';
import { Game } from 'src/modules/game/game.model';

import { User } from 'src/modules/user/user.model';
import { UserGame } from 'src/modules/user_game/player.model';

export const DbModule = {
  provide: 'SEQUELIZE',
  useFactory: async () => {
    const sequelize = new Sequelize({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: true,
    });
    sequelize.addModels([User, Game, UserGame]);
    sequelize
      .sync({ alter: true, logging: true })
      .then(() => {
        console.log('DB Connected!');
      })
      .catch((e) => {
        console.log(e);
      });
    return sequelize;
  },
};
