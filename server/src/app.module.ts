import { Module } from '@nestjs/common';
import { ProjectorGateway } from './gateways/projector.gateway';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { FileModule } from './file/file.module';
import { TelemetryModule } from './telemetry/telemetry.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentModule } from './content/content.module';
import { ConfigModule } from '@nestjs/config';
import { CatalogModule } from '@/catalog/catalog.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      retryAttempts: 3,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
    }),
    ConfigModule.forRoot(),
    FileModule,
    TelemetryModule,
    ContentModule,
    CatalogModule,
  ],
  controllers: [],
  providers: [ProjectorGateway],
})
export class AppModule {}
