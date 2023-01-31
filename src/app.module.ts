import { UserModule } from './modules/user/user.module';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './services/common.module';
import { PostsModule } from './modules/posts/posts.module';
import { AdminModule } from './modules/admin/admin.module';
import { ReportModule } from './modules/report/report.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { TagsModule } from './modules/tags/tags.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    CommonModule,
    PostsModule,
    AdminModule,
    ReportModule,
    CloudinaryModule,
    TagsModule,
  ],
  providers: [AppService],
})
export class AppModule {}
