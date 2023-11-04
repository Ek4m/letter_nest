import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from './user.model';

import { Encryption } from 'src/utils';
import {
  RefreshDto,
  RegisterDto,
  UpdateNameDto,
  UpdatePasswordDto,
  UserDto,
} from './user.dto';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserService {
  constructor(private jwtService: JwtService) {}

  async getAllUsers(page: number, pageSize: number) {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    const total = await User.count();
    const users = await User.findAll({
      limit,
      offset,
      attributes: { exclude: ['password'] },
    });
    return { data: users, total };
  }

  async getById(id: string) {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    return user;
  }

  async update(id: string, body: UserDto) {
    const user = await User.findByPk(id);
    for (const key in body) {
      if (!!body[key]) user[key] = body[key];
    }
    await user.save();
    return user;
  }

  async create(body: UserDto) {
    const user = await User.create({ ...body });
    await user.save();
    return user;
  }

  async delete(id: string) {
    await User.destroy({ where: { id } });
  }

  async getUserByEmail(email: string) {
    const user = await User.findOne({ where: { email } });
    return user;
  }

  async retrieveUser(email: string, password: string) {
    const foundUser = await this.getUserByEmail(email);
    if (!foundUser) return null;
    const isMatched = await Encryption.isMatched(password, foundUser.password);
    if (!isMatched) return null;
    delete foundUser.password;
    return foundUser;
  }

  async register(body: RegisterDto) {
    const user = User.build({ ...body });
    await user.save();
    delete user.password;
    return user;
  }

  async login(user: User) {
    const refresh_token = this.jwtService.sign(
      { id: user.id },
      { expiresIn: `5d` },
    );
    const access_token = this.jwtService.sign(
      { email: user.email },
      { expiresIn: '1h' },
    );
    return { access_token, refresh_token };
  }

  async getUserCredentials(user: User) {
    const copy = Object.assign({}, user);

    const usr = await UserMapper.assignUrl(copy);
    delete usr.password;
    return usr;
  }

  refresh = async (body: RefreshDto) => {
    try {
      const payload = this.jwtService.decode(body.refresh_token) as {
        id: string;
      };
      const user = await User.findByPk(payload.id);
      if (!user) throw new BadRequestException();
      const access_token = this.jwtService.sign(
        { email: user.email },
        { expiresIn: '3600s' },
      );
      return { access_token };
    } catch (e) {
      throw new BadRequestException();
    }
  };

  async resetName(user: User, dto: UpdateNameDto) {
    const userFound = await User.findByPk(user.id);
    Object.keys(dto).forEach((key) => {
      if (!!dto[key]) {
        userFound[key] = dto[key];
      }
    });
    await userFound.save();
    return userFound;
  }

  async updatePassword(user: User, dto: UpdatePasswordDto) {
    const userFound = await User.findByPk(user.id);
    if (!dto.currentPassword || !dto.newPassword) {
      throw new BadRequestException({
        currentPassword: 'Passwords are not matched',
      });
    }
    const matched = await Encryption.isMatched(
      dto.currentPassword,
      user.password,
    );
    if (!matched) {
      throw new BadRequestException({
        currentPassword: 'Current password is not correct',
      });
    }

    userFound.password = dto.newPassword;
    await userFound.save();
    return userFound;
  }
}
