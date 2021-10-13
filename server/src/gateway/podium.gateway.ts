import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ namespace: 'podium' })
export class PodiumGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger('PodiumGateway');

  afterInit(server: Server): any {
    this.logger.log('Podium gateway initialized');
  }

  handleConnection(client: Socket, ...args): any {
    this.logger.log(`Podium ${client.id} connected`);
  }

  handleDisconnect(client: Socket): any {
    this.logger.log(`Podium ${client.id} disconnect`);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() payload: any): WsResponse<string> {
    this.logger.log(`Got message ${payload}`);
    return { event: 'message', data: 'Hello from the Nest Server!' };
  }
}
