import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExceptionFilter } from '@shared/index';
import * as process from 'node:process';

/**
 * Bootstrap function to initialize the application.
 */
async function bootstrap(): Promise<[number, string, Logger]> {
    const port: number = Number(process.env.APP_PORT);
    const swaggerPath: string = process.env.SWAGGER_PATH!;

    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.setGlobalPrefix(process.env.APP_GLOBAL_PREFIX!);
    app.useGlobalFilters(new NestExceptionFilter());
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    /**
     * Setup Swagger documentation for the application.
     */
    const swaggerBuilder = new DocumentBuilder().setTitle(process.env.SWAGGER_TITLE!).build();
    const swaggerDocument = SwaggerModule.createDocument(app, swaggerBuilder);
    SwaggerModule.setup(swaggerPath, app, swaggerDocument);

    await app.listen(port);
    return [port, swaggerPath, app.get(Logger)];
}

void bootstrap().then(([port, swaggerPath, logger]) => {
    logger.log(`App is running on port: ${port}`, 'Bootstrap');
    logger.log(`Swagger is available at: ${swaggerPath}`, 'Bootstrap');
});
