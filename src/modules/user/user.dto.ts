import { UserRole } from './user.enum';

export interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RefreshDto {
  refresh_token: string;
}

export interface UserDto extends RegisterDto {
  role: UserRole;
}

export interface UpdateNameDto {
  firstName: string;
  lastName: string;
}

export interface UpdatePasswordDto {
  newPassword: string;
  currentPassword: string;
}
