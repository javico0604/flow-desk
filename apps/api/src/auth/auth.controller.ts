import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Response, Request } from 'express';
import { CurrentUser } from './decorators/current-user.decorator';
import { REFRESH_TOKEN_COOKIE } from './constants/auth.constants';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse({
    type: RegisterResponseDto,
  })
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @ApiOkResponse({
    type: LoginResponseDto,
  })
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(dto.email, dto.password);

    res.cookie(REFRESH_TOKEN_COOKIE, result.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      accessToken: result.accessToken,
    };
  }

  @ApiOkResponse({
    type: LoginResponseDto,
  })
  @Post('refresh')
  refresh(@Req() req: Request) {
    return this.authService.refresh(req.cookies[REFRESH_TOKEN_COOKIE]);
  }

  @Post('logout')
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    res.clearCookie('refresh_token');

    return this.authService.logout(req.cookies.refresh_token);
  }

}
