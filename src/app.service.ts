import { Injectable, OnModuleInit } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService implements OnModuleInit {
  async onModuleInit() {
    setInterval(async () => {
      try {
        // Enviar um "ping" para a rota /health para garantir que a API está ativa
        await axios.get('https://painelbeatloop-backend.onrender.com');
        console.log('Ping enviado para manter a API ativa');
      } catch (error) {
        console.error('Erro ao enviar ping:', error);
      }
    }, 1000 * 60 * 14); // A cada 5 minutos
  }
}
