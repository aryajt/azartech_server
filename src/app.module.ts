import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionService } from './connection.service';
import { CustomWebSocketGateway } from './websocket/gateway';
import { ConnectionRecord } from './connection-record.entity';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "/home/arya/projects/activity-tracker/database.sqlite",
      entities: [ConnectionRecord],
      synchronize: true, // Auto-create database tables (for development only)
    }),
    TypeOrmModule.forFeature([ConnectionRecord]),
  ],
  controllers: [AppController],
  providers: [ConnectionService, CustomWebSocketGateway],
})
export class AppModule {}
