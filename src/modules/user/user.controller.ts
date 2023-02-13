import { UserService } from './user.service';
import { Body, Controller, Post, Get } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { Auth } from 'src/decorators/authentication.decorator';
import { UpdateDto } from './dto/update-profile.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @Get('me')
  async getMe(@CurrentUser('id') userId: number) {
    return { user_info: await this.userService.getMe(userId) };
  }

  @Auth()
  @Post('update')
  async updateProfile(
    @CurrentUser('id') userId: number,
    @Body() updateDto: UpdateDto,
  ) {
    return await this.userService.updateProfile(userId, updateDto);
  }
}
