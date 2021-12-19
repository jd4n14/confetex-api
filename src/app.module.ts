import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { MachineModule } from './modules/machine/machine.module';
import { RequestModule } from './modules/request/request.module';
import { LogModule } from './modules/log/log.module';

@Module({
  imports: [UserModule, MachineModule, RequestModule, LogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
