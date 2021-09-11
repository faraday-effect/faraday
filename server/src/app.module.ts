import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ProjectorGateway } from './gateways/projector.gateway';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { FileModule } from './file/file.module';
import { TelemetryModule } from './telemetry/telemetry.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
    }),
    FileModule,
    TelemetryModule,
  ],
  controllers: [],
  providers: [AppService, ProjectorGateway],
})
export class AppModule {}
