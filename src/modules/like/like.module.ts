import { Module } from '@nestjs/common';
import { LikeController } from './controllers';
import { LikeService } from './services';
import { PostgresUnitOfWorkModule } from 'src/database/unit-of-work/postgres';
import { RedisCacheModule } from 'src/shared/cache';

@Module({
  imports: [PostgresUnitOfWorkModule, RedisCacheModule],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
