import { CommentPost } from './dto/comment.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { apato, user } from '@prisma/client';
import { Auth } from 'src/decorators/authentication.decorator';
import { PostFilter } from './dto/post-filter.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Auth('SELLER')
  @Post()
  @UseInterceptors(
    FilesInterceptor('file', 4, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = uniqueSuffix + ext;
          callback(null, filename.replace(/\\/g, '/'));
        },
      }),
    }),
  )
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser() user: user,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<apato> {
    const filePaths = [];
    files.forEach((file) => {
      filePaths.push('localhost:4000/' + file.path);
    });
    return await this.postsService.createPost(
      createPostDto,
      user.id,
      filePaths,
    );
  }

  @Get(':id')
  async getPostInfo(@Param('id') post_id: number): Promise<apato> {
    return await this.postsService.getPostInfo(+post_id);
  }

  @Post('all')
  async getAllPosts(@Body() filter: PostFilter): Promise<apato[]> {
    return await this.postsService.getAllPosts(filter);
  }

  @Put(':id')
  @Auth('SELLER')
  @UseInterceptors(
    FilesInterceptor('file', 4, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = uniqueSuffix + ext;
          callback(null, filename);
        },
      }),
    }),
  )
  @Auth()
  async updatePost(
    @Param('id') postId: string,
    @Body() updatePostDto: UpdatePostDto,
    @CurrentUser() user: user,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<apato> {
    const filePaths = [];
    files.forEach((file) => {
      filePaths.push('localhost:4000/' + file.path);
    });
    return await this.postsService.updatePost(
      +postId,
      updatePostDto,
      user,
      filePaths,
    );
  }
  @Auth()
  @Delete(':id')
  async deletePost(@CurrentUser() user: user, @Param('id') postId: string) {
    return await this.postsService.deletePost(user, +postId);
  }

  @Post('/comment/:id')
  async commentPost(
    @CurrentUser() user: user,
    @Param('id') postId: string,
    @Body() commentPost: CommentPost,
  ) {
    return await this.postsService.commentPost(user.id, +postId, commentPost);
  }
}
