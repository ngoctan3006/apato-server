import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Auth } from 'src/decorators/authentication.decorator';
import { AdminService } from './admin.service';
import { SearchUserDto } from './dto/search-user.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Auth('ADMIN')
  @Put('block/:id')
  async blockUser(@Param('id') userId: string) {
    return await this.adminService.blockUser(+userId);
  }
  @Auth('ADMIN')
  @Put('delete-comment/:id')
  async deleteComment(@Param('id') commentId: string) {
    return await this.adminService.deleteComment(+commentId);
  }

  @Auth('ADMIN')
  @Post('all-user')
  async getAllUsers(@Body() input: SearchUserDto) {
    return await this.adminService.getAllUsers(input);
  }

  @Auth('ADMIN')
  @Put('approve/:id')
  async approvePost(@Param('id') postId: string) {
    return await this.adminService.approvePost(+postId);
  }

  @Auth('ADMIN')
  @Put('reject/:id')
  async rejectPost(@Param('id') postId: string) {
    return await this.adminService.rejectPost(+postId);
  }
}
