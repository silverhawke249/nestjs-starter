import { Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { LeaderboardEntry } from './constants';
import { AuthGuard } from './auth.guard';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get('leaderboard')
    async getLeaderboard(): Promise<LeaderboardEntry[]> {
        return this.appService.getLeaderboard();
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('scores')
    async postScore(@Request() req): Promise<void> {
        this.appService.postScore(req);
    }
}
