import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { FileModule } from './file/file.module';
import { TelemetryModule } from './telemetry/telemetry.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentModule } from './content/content.module';
import { ConfigModule } from '@nestjs/config';
import { CatalogModule } from '@/catalog/catalog.module';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      retryAttempts: 3,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
    }),
    ConfigModule.forRoot({
      expandVariables: true,
    }),
    FileModule,
    TelemetryModule,
    ContentModule,
    CatalogModule,
    GatewayModule,
  ],
  controllers: [],
})
export class AppModule {}
