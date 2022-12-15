import { CreateUserInput } from '../auth/dto/register.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { hass_password } from 'src/decorators/hash-password.decorator';
import { ROLE, user } from '@prisma/client';
import { UpdateDto } from './dto/update-profile.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create_new_user(input: CreateUserInput): Promise<user> {
    const hass_pass = await hass_password(input.password);
    const new_user = await this.prisma.user.create({
      data: {
        ...input,
        role:
          input.role === 'ADMIN'
            ? ROLE.ADMIN
            : input.role === 'SELLER'
            ? ROLE.SELLER
            : ROLE.USER,
        password: hass_pass,
      },
    });
    return {
      ...new_user,
      password: input.password,
    };
  }

  async updateProfile(userId: number, updateDto: UpdateDto) {
    const updateData = {};
    const { name, phone, address } = updateDto;
    if (!!name) {
      updateData['name'] = name;
    }
    if (!!phone) {
      updateData['phone'] = phone;
    }
    if (!!address) {
      updateData['address'] = address;
    }
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: updateData,
    });
  }
}
