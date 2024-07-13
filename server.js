const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

let dadosRecebidos = false; // Variável para controlar se os dados já foram recebidos

io.on('connection', (socket) => {
  console.log('Um usuário se conectou');
  
  socket.on('formSubmit', (data) => {
    if (!dadosRecebidos) {
      console.log(`Campo 1: ${data.campo1}`);
      console.log(`Campo 2: ${data.campo2}`);
      dadosRecebidos = true; // Marca os dados como recebidos
    }
  });

  socket.on('disconnect', () => {
    console.log('Usuário se desconectou');
  });
});

const PORT = process.env.PORT || 3000;
const IP_LOCAL = '192.168.1.10'; // Substitua pelo seu endereço IPv4
server.listen(PORT, IP_LOCAL, () => {
  console.log(`Servidor rodando em http://${IP_LOCAL}:${PORT}`);
});
