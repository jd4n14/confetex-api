import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { MikroOrmModuleOptions, MikroOrmOptionsFactory } from '@mikro-orm/nestjs';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { ConfigService } from '@nestjs/config';
// import * as migrations from '../../database/migrations/index';

@Injectable()
export class MikroOrmOptions implements MikroOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMikroOrmOptions(): MikroOrmModuleOptions {
    const logger = new Logger('MikroORM');
    // const migrationsList = this.generateMigrationList();
    return {
      entities: ['dist/**/*.entity{.ts,.js}'],
      entitiesTs: ['src/**/*.entity.ts'],
      registerRequestContext: true,
      metadataProvider: TsMorphMetadataProvider,
      tsNode: false,
      dbName: this.configService.get<string>('database.name'),
      host: this.configService.get<string>('database.host'),
      type: 'postgresql',
      user: this.configService.get<string>('database.user'),
      password: this.configService.get<string>('database.password'),
      highlighter: new SqlHighlighter(),
      debug: true,
      logger: logger.log.bind(logger),
      findOneOrFailHandler: (entityName, values) => {
        throw new NotFoundException(`The resource you are loking in ${entityName} does not exist`);
      },
      discovery: {
        warnWhenNoEntities: false,
      },
      migrations: {
        path: '../../database/migrations',
        tableName: 'migrations',
        emit: 'ts',
        // migrationsList,
      },
    };
  }

  //   generateMigrationList(): MigrationObject[] {
  //     const migrationList: MigrationObject[] = [];
  //     const keys = Object.keys(migrations);
  //     keys.forEach((key) => {
  //       const name = key;
  //       const migrationClass = migrations[key];
  //       migrationList.push({ name, class: migrationClass });
  //     });
  //     return migrationList;
  //   }
}
