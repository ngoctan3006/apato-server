import { Controller, Get, Param, Put } from '@nestjs/common';
import { async } from 'rxjs';
import { Auth } from 'src/decorators/authentication.decorator';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Auth('ADMIN')
  @Put('block/:id')
  async blockUser(@Param('id') userId: string) {
    return await this.adminService.blockUser(+userId);
  }
}
