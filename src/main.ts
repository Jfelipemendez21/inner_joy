import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions: CorsOptions = {
    origin: true, // Permitir solicitudes de cualquier origen
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Permitir todos los métodos HTTP
    allowedHeaders: '*', // Permitir todos los encabezados
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };

  app.enableCors(corsOptions);
  await app.listen(3000);
}
bootstrap();
