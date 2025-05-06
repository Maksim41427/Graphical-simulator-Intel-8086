import {
  Controller,
  Request,
  Get,
  Post, Body, HttpCode, UseGuards, Req, Res
} from '@nestjs/common';
import { AuthService } from './auth.service';
import RequestWithUser from './requestWithUser.interface';
import JwtAuthenticationGuard from './jwt-auth.guard';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';
;

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(

    @Request() request: RequestWithUser,
    @Res() response: Response,
  ): Promise<Object> {
    const { user } = request
    const cookie = this.authService.getCookieWithJwtToken(
      user.id,
    )
    response.set('Set-Cookie', await cookie)
    user.password = null;
    return response.send(user)
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = null;
    return user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut(@Request() request: RequestWithUser, @Res() response: Response) {
    const cookie = this.authService.getCookieForLogOut()

    response.header['Set-Cookie'] = cookie;
    return { success: true }
  }
}


