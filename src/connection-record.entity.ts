import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ConnectionRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column({ type: 'datetime', nullable: true })
  connectionTimestamp: Date;

  @Column({ type: 'datetime', nullable: true })
  disconnectionTimestamp: Date;
}
