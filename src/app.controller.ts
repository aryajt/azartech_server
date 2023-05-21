import { Controller, Get, Param } from '@nestjs/common';
import { ConnectionService } from './connection.service';

@Controller('connections')
export class AppController {
  constructor(private readonly connectionService: ConnectionService) { }

  @Get(':encryptedUserId')
  async getConnectionDuration(@Param('encryptedUserId') encryptedUserId: string): Promise<number> {
    const duration = await this.connectionService.getConnectionDuration(encryptedUserId);
    return duration;
  }

}
