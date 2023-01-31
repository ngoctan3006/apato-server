import { CreateTagDto } from './dto/create-tag.dto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaService) {}
  async createNewTag(createTagDto: CreateTagDto) {
    const { tagName } = createTagDto;
    const exist = await this.prisma.tag.findUnique({
      where: {
        tag_name: tagName,
      },
    });
    if (!!exist) {
      throw new BadRequestException('TAG IS ALREADY EXIST');
    }
    return await this.prisma.tag.create({
      data: {
        tag_name: tagName,
      },
    });
  }

  async getAllTags() {
    return await this.prisma.tag.findMany();
  }
}
