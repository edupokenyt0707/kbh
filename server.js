// server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const readline = require('readline');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configuração do readline para ler dados do console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let dadosRecebidos = false; // Variável para controlar se os dados já foram recebidos

io.on('connection', (socket) => {
  console.log('Um usuário se conectou');
  
  socket.on('formSubmit', (data) => {
    if (!dadosRecebidos) {
      console.log(`Campo 1: ${data.campo1}`);
      console.log(`Campo 2: ${data.campo2}`);
      // Envia os dados para o prompt de comando usando readline
      rl.question('Dados recebidos. Digite algo para continuar: ', (answer) => {
        console.log(`Você digitou: ${answer}`);
        rl.close();
      });
      dadosRecebidos = true; // Marca os dados como recebidos
    }
  });

  socket.on('disconnect', () => {
    console.log('Usuário se desconectou');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
