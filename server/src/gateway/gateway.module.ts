import { Module } from '@nestjs/common';
import { ProjectorGateway } from './projector.gateway';
import { PodiumGateway } from '@/gateway/podium.gateway';

@Module({
  providers: [ProjectorGateway, PodiumGateway],
  exports: [ProjectorGateway, PodiumGateway],
})
export class GatewayModule {}
