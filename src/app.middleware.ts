import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { writeFileSync } from 'fs';

class LogToFile extends Logger {
    log(message: any, context?: string): void {
        const date = new Date();
        const msg = `${date.toLocaleString()} - ${message}\n`;
        writeFileSync('logfile.log', msg, { flag: 'a+' });
    }
}

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
    private logger = new LogToFile('HTTP');

    use(request: Request, response: Response, next: NextFunction): void {
        const { ip, method, baseUrl: url } = request;
        console.log(request);

        response.on('close', () => {
            const { statusCode } = response;

            this.logger.log(
                `${ip} - ${method} ${url} ${statusCode}`
            );
        });

        next();
    }
}
