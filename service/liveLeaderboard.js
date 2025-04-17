const { WebSocketServer } = require('ws');
const WebSocket = require('ws'); // Needed for WebSocket.OPEN

function liveLeaderboard(httpServer) {
  // Create the WebSocket server on the existing HTTP server
  const socketServer = new WebSocketServer({ server: httpServer });

  socketServer.on('connection', (socket) => {
    socket.isAlive = true;

    // Keep-alive: Respond to ping/pong to ensure connections are active
    socket.on('pong', () => {
      socket.isAlive = true;
    });
  });

  // Keep-alive ping check
  setInterval(() => {
    socketServer.clients.forEach((client) => {
      if (client.isAlive === false) return client.terminate();

      client.isAlive = false;
      client.ping();
    });
  }, 10000);

  // This function can be called to broadcast new high scores
  function broadcastHighScores(highScores) {
    const data = JSON.stringify({ type: 'highScoresUpdate', highScores });

    socketServer.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  }

  return {
    broadcastHighScores,
  };
}

module.exports = { liveLeaderboard };
