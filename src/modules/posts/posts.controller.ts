import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { apato, user } from '@prisma/client';
import { Auth } from 'src/decorators/authentication.decorator';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Auth('SELLER')
  @Post()
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser() user: user,
  ): Promise<apato> {
    return await this.postsService.createPost(createPostDto, user.id);
  }

  @Get(':id')
  async getPostInfo(@Param('id') post_id: number): Promise<apato> {
    return await this.postsService.getPostInfo(+post_id);
  }
}
