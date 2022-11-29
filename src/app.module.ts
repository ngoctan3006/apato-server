import { UserModule } from './modules/user/user.module';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './services/common.module';
import { PostsModule } from './modules/posts/posts.module';

@Module({
  imports: [AuthModule, UserModule, CommonModule, PostsModule],
  providers: [AppService],
})
export class AppModule {}
