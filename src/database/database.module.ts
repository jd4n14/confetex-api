import { MikroOrmMiddleware } from '@mikro-orm/nestjs';
import { MiddlewareConsumer, Module, NestModule, OnApplicationBootstrap } from '@nestjs/common';

@Module({})
export class DatabaseModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MikroOrmMiddleware).forRoutes('*');
  }
}
