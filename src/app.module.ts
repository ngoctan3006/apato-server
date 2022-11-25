import { UserModule } from './modules/user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './services/common.module';

@Module({
  imports: [AuthModule, UserModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
