import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const {env} = process;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api');

    const config = new DocumentBuilder()
        .setTitle('User-role Project')
        .setDescription('REST API')
        .setVersion('1.0.0')
        .addTag('NestJS,Postgress,Sequielize')
        .build()


    const document = SwaggerModule.createDocument(app,config)
    SwaggerModule.setup('api/docs',app,document)
    await app.listen(env.PORT, () => {
      console.log("listening on port " + env.PORT);
    });
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
