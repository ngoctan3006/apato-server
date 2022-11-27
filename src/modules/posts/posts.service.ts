import { PrismaService } from './../../services/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { apato } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async createPost(input: CreatePostDto, user_id: number): Promise<apato> {
    const new_post = await this.prisma.apato.create({
      data: {
        user_id,
        title: input.title,
        price: input.price,
        detail: input.detail,
        image: input.image,
        address: input.address,
      },
    });
    return new_post;
  }

  async getPostInfo(post_id: number): Promise<apato> {
    return await this.prisma.apato.findUnique({
      where: {
        id: post_id,
      },
    });
  }
}
