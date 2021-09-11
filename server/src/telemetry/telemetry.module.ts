import { Module } from '@nestjs/common';
import { TelemetryResolver } from './telemetry.resolver';

@Module({
  providers: [TelemetryResolver],
})
export class TelemetryModule {}
