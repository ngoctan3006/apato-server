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
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UploadApiResponse } from 'cloudinary';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly cloundary: CloudinaryService,
  ) {}
  @Auth('SELLER')
  @Post()
  @UseInterceptors(FilesInterceptor('file', 10))
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser() user: user,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<apato & { creator: user }> {
    const cloudFiles = await Promise.allSettled(
      files.map((file) => this.cloundary.uploadFile(file)),
    );
    const filePaths = [];
    for (let i = 0; i < cloudFiles.length; i++) {
      if (cloudFiles[i].status === 'fulfilled') {
        const successFile = cloudFiles[
          i
        ] as PromiseFulfilledResult<UploadApiResponse>;
        filePaths.push(successFile.value.url);
      }
    }
    return await this.postsService.createPost(
      createPostDto,
      user.id,
      filePaths,
    );
  }

  @Get(':id')
  async getPostInfo(@Param('id') post_id: number) {
    return await this.postsService.getPostInfo(+post_id);
  }

  @Post('all')
  async getAllPosts(@Body() filter: PostFilter) {
    return await this.postsService.getAllPosts(filter);
  }

  @Auth('ADMIN')
  @Post('pending')
  async getPendingPosts(@Body() filter: PostFilter) {
    return await this.postsService.getAllPendingPosts(filter);
  }

  @Auth('SELLER')
  @Post('get-my-posts/:status')
  async getMyPosts(
    @Body() filter: PostFilter,
    @CurrentUser() user: user,
    @Param('status') status: number,
  ) {
    return await this.postsService.getPostsByUser(user.id, filter, +status);
  }

  @Put(':id')
  @Auth('SELLER')
  @UseInterceptors(FilesInterceptor('file', 4))
  async updatePost(
    @Param('id') postId: string,
    @Body() updatePostDto: UpdatePostDto,
    @CurrentUser() user: user,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<apato> {
    // const filePaths = [];
    // files.forEach((file) => {
    //   filePaths.push('localhost:4000/' + file.path);
    // });
    const cloudFiles = await Promise.allSettled(
      files.map((file) => this.cloundary.uploadFile(file)),
    );
    const filePaths = [];
    for (let i = 0; i < cloudFiles.length; i++) {
      if (cloudFiles[i].status === 'fulfilled') {
        const successFile = cloudFiles[
          i
        ] as PromiseFulfilledResult<UploadApiResponse>;
        filePaths.push(successFile.value.url);
      }
    }
    return await this.postsService.updatePost(
      +postId,
      updatePostDto,
      user,
      filePaths,
    );
  }
  @Auth('SELLER', 'ADMIN')
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
