import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProjectorGateway } from "./gateways/projector.gateway";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ProjectorGateway],
})
export class AppModule {}
