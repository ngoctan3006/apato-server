import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

@Module({
  imports: [CloudinaryModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
