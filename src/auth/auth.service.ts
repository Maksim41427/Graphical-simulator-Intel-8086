import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import TokenPayload from './tokenPayload.interface';
import {RegisterDto} from './dto/register.dto'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService){};

    public getCookieForLogOut() {
      return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
    }

      public async  getCookieWithJwtToken(userId: number) {
      const payload: TokenPayload = { userId };
      const token = await this.jwtService.sign(payload);
      return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${process.env.JWT_EXPIRATION_TIME}`;
    }

    public async register(registrationData: RegisterDto) {
      try {
        const hashedPassword = await bcrypt.hash(registrationData.password, 10);
        const createdUser = await this.usersService.create({
          ...registrationData,
          password: hashedPassword
        });
        createdUser.password = null;
        return createdUser;
      } catch (error) {
        throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
      }

    }
  

    public async getAuthenticatedUser(login: string, plainTextPassword: string) {
      try {
        const user = await this.usersService.getBylogin(login);
        await this.verifyPassword(plainTextPassword, user.password);
        user.password = null;
        return user;
      } catch (error) {
        throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
      }
    }
     
    private async verifyPassword(plainTextPassword: string, hashedPassword: string | null) {
      const isPasswordMatching = await bcrypt.compare(
        plainTextPassword,
        hashedPassword
      );
      if (!isPasswordMatching) {
        throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
      }
    }

} 


