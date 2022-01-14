import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/user.module';
import { MachineModule } from './modules/machine/machine.module';
import { RequestModule } from './modules/request/request.module';
import { LogModule } from './modules/log/log.module';
import { LinesModule } from './modules/lines/lines.module';
import { SettingsModule } from './modules/settings/settings.module';
import { AuthModule } from './modules/auth/auth.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmOptions } from './config/mikro-orm.config';
import { DatabaseModule } from './database/database.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    MikroOrmModule.forRootAsync({
      useClass: MikroOrmOptions,
      inject: [ConfigModule],
    }),
    AuthModule,
    UserModule,
    MachineModule,
    RequestModule,
    LogModule,
    LinesModule,
    SettingsModule,
    DatabaseModule,
  ],
})
export class AppModule {}
