import { UserModule } from './modules/user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './services/common.module';
import { UploadModule } from './modules/upload/upload.module';
import { PostsModule } from './modules/posts/posts.module';

@Module({
  imports: [AuthModule, UserModule, CommonModule, UploadModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
