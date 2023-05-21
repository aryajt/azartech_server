import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConnectionRecord } from './connection-record.entity';

@Injectable()
export class ConnectionService {
  constructor(
    @InjectRepository(ConnectionRecord)
    private readonly connectionRecordRepository: Repository<ConnectionRecord>,
  ) { }

  async saveConnectionRecord(userId: string): Promise<void> {
    const connectionRecord = new ConnectionRecord();
    connectionRecord.userId = userId;
    connectionRecord.connectionTimestamp = new Date();
    await this.connectionRecordRepository.save(connectionRecord);
  }

  async saveDisconnectionRecord(userId: string): Promise<void> {
    const disconnectionRecord = new ConnectionRecord();
    disconnectionRecord.userId = userId;
    disconnectionRecord.disconnectionTimestamp = new Date();
    await this.connectionRecordRepository.save(disconnectionRecord);
  }

  async getConnectionDuration(encryptedUserId: string): Promise<number> {

    //Getting last Disconnecting timeStamp
    const connectionRecord = await this.connectionRecordRepository.findOne({
      where: { userId: encryptedUserId },
      order: { id: 'DESC' },
    });

    //Getting first Connecting timeStamp
    const connectionRecord2 = await this.connectionRecordRepository.findOne({
      where: { userId: encryptedUserId },
      order: { id: 'ASC' },
    });
    if (
      connectionRecord &&
      connectionRecord2.connectionTimestamp &&
      connectionRecord.disconnectionTimestamp
    ) {

      //Connection time => Disconnecting - Connecting 
      const connectionDuration =
        connectionRecord.disconnectionTimestamp.getTime() -
        connectionRecord2.connectionTimestamp.getTime();

      //Converting Timestamp to seconds
      const activityMinutes = await Math.floor(connectionDuration / 1000)
      return activityMinutes;
    }

    return 0;
  }
}
