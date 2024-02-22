import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RATE_LIMIT_COUNT, RATE_LIMIT_TTL, jwtConstants } from './constants';
import { ScoreModule } from './score.module';
import { AppLoggerMiddleware } from './app.middleware';
import { SeederModule } from './seeder.module';
import { UserModule } from './user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        ThrottlerModule.forRoot([{
            ttl: RATE_LIMIT_TTL,
            limit: RATE_LIMIT_COUNT,
        }]),
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        }),
        UserModule,
        ScoreModule,
        SeederModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(AppLoggerMiddleware).forRoutes('*');
    }
}
