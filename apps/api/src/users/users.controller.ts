import { Controller, Get, Put, Body, UseGuards, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthUser } from '../auth/types/auth-user';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from './dto/user-response.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    type: UserResponseDto,
  })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@CurrentUser() user: { id: number; email: string }) {
    return this.usersService.findOne(user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    type: UserResponseDto,
  })
  @ApiBody({
    type: UpdateUserDto,
  })
  @Put('me')
  update(@CurrentUser() user: AuthUser, @Body() dto: UpdateUserDto) {
    return this.usersService.update(user.id, dto);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: UserResponseDto,
  })
  @UseGuards(JwtAuthGuard)
  @Delete('me')
  delete(@CurrentUser() user: AuthUser) {
    return this.usersService.delete(user.id);
  }

  @ApiBearerAuth()
@ApiOkResponse({
  type: [UserResponseDto],
})
@UseGuards(JwtAuthGuard)
@Get('search')
search(
  @Query('email') email:string
){

  return this.usersService.search(email);

}
}
