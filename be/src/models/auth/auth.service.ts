import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const userExists = await this.usersService.getUserByEmail(
      createUserDto.email,
    );
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    const newUser = await this.usersService.createUser(createUserDto);
    const tokens = await this.getTokens(
      newUser._id.toString(),
      newUser.username,
    );
    await this.updateRefreshToken(newUser._id.toString(), tokens.refreshToken);
    return {
      tokens,
      user: {
        _id: newUser._id,
        email: newUser.email,
        username: newUser.username,
      },
    };
  }

  async signIn(data: AuthDto) {
    const user = await this.usersService.getUserByEmail(data.email);

    if (!user) {
      throw new BadRequestException('User does not exist');
    }
    const passwordMatches = await bcrypt.compare(data.password, user.password);

    if (!passwordMatches) {
      throw new BadRequestException('Password is incorrect');
    }
    const tokens = await this.getTokens(user._id.toString(), user.username);
    await this.updateRefreshToken(user._id.toString(), tokens.refreshToken);

    return {
      tokens,
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
      },
    };
  }

  async logout(userId: string) {
    return this.usersService.partialUpdateUser(userId, { refreshToken: null });
  }

  async hashData(data: string) {
    return await bcrypt.hash(data, parseInt(process.env.CRYPT_SALT));
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.usersService.partialUpdateUser(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(userId: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findById(userId);
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }

    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );

    if (!refreshTokenMatches) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.getTokens(user._id.toString(), user.username);
    await this.updateRefreshToken(user._id.toString(), tokens.refreshToken);
    return {
      tokens,
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
      },
    };
  }
}
