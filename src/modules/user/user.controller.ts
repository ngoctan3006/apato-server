import { UserService } from './user.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { Auth } from 'src/decorators/authentication.decorator';
import { UpdateDto } from './dto/update-profile.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Auth()
  @Post('update')
  async updateProfile(
    @CurrentUser('id') userId: number,
    @Body() updateDto: UpdateDto,
  ) {
    return await this.userService.updateProfile(userId, updateDto);
  }
}
