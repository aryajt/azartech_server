# azartech_server


This server built with nestjs,typeorm,websocket,restAPI,sqlite.
1. CLient connects to server via websocket.
2. CLient sends userID to event:"userID" via websocket (Encrypted with AES) to server.
3. Server stores recieving timestamp message record to sqlite db.
4. At <localhost:3001>/connections/<Encrypted UserId> we can see total connection time to server in seconds
