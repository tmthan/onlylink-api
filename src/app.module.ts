import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './modules/post';
import { LikeModule } from './modules/like';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    ConfigModule,
    PostModule,
    LikeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
