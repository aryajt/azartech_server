import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConnectionService } from '../connection.service';
import { decryptUserId } from '../decryption';

@WebSocketGateway({ cors: true })

export class CustomWebSocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedClients: Map<string, Socket> = new Map<string, Socket>();

  constructor(private readonly connectionService: ConnectionService) { }

  handleConnection(client: Socket): void {
    // Handle incoming connections
    client.on('userId', (encryptedUserId: string) => {
      const userId = decryptUserId(encryptedUserId); // Decrypt the userId using AES
      console.log('User connected: ', userId);
      this.connectedClients.set(encryptedUserId, client); // Store the client instance with userId
      this.connectionService.saveConnectionRecord(encryptedUserId); // Save connection record to the database
    });
  }

  handleDisconnect(client: Socket): void {
    // Handle disconnections
    const userId = this.getUserIdFromClient(client);
    if (userId) {
      console.log('User disconnected: ', userId);
      this.connectionService.saveDisconnectionRecord(userId); // Save disconnection record to the database
      this.connectedClients.delete(userId); // Remove the client from the connected clients map
    }
  }

  private getUserIdFromClient(client: Socket): string | undefined {
    for (const [userId, connectedClient] of this.connectedClients) {
      if (connectedClient === client) {
        return userId;
      }
    }
    return undefined;
  }
}
