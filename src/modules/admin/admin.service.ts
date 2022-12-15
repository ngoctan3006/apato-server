import { ROLE } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SearchUserDto } from './dto/search-user.dto';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}
  async blockUser(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new NotFoundException('USER WAS NOT FOUND');
    }
    if (user.status === false) {
      throw new BadRequestException('USER ALREADY BLOCKED');
    }
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        status: false,
      },
    });
  }

  async deleteComment(commentId: number) {
    await this.prisma.apato_comment.update({
      where: {
        id: commentId,
      },
      data: {
        deleted: true,
      },
    });
  }

  async getAllUsers(input: SearchUserDto) {
    const whereOption = {
      role: { not: ROLE.ADMIN },
    };
    if (!!input.searchValue) {
      whereOption['OR'] = [
        {
          name: { contains: input.searchValue, mode: 'insensitive' },
        },
        {
          email: { contains: input.searchValue, mode: 'insensitive' },
        },
        {
          phone: { contains: input.searchValue, mode: 'insensitive' },
        },
      ];
    }
    return await this.prisma.user.findMany({
      where: whereOption,
      orderBy: {
        created_at: 'desc',
      },
    });
  }
}
