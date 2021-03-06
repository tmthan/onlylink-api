import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  private defaultTtl: number;
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private configService: ConfigService,
  ) {
    this.defaultTtl = this.configService.get('REDIS_DEFAULT_TTL') ?? 0;
  }

  set(key: string, value: string, ttl: number = this.defaultTtl ?? 0) {
    return this.cache.set(key, value, { ttl });
  }

  get(key: string) {
    return this.cache.get(key);
  }

  setObject(key: string, value: Object, ttl: number = this.defaultTtl ?? 0) {
    return this.cache.set(key, JSON.stringify(value), { ttl });
  }

  getObject(key: string) {
    return this.cache
      .get(key)
      .then((result: string | undefined) =>
        result ? JSON.parse(result) : undefined,
      );
  }

  delete(key: string) {
    return this.cache.del(key);
  }

  deleteAll() {
    return this.cache.reset();
  }
}
