import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LeaderboardEntry } from './constants';
import { ScoreService } from './score.service';
import { UserService } from './user.service';
import { Score } from './score.entity';

@Injectable()
export class AppService {
    constructor(
        private readonly userService: UserService,
        private readonly scoreService: ScoreService
    ) { }

    async getLeaderboard(): Promise<LeaderboardEntry[]> {
        return this.scoreService.getLeaderboard().then(
            scores => {
                return scores.map(
                    score => ({ user: score.user.name, score: score.score })
                );
            }
        )
    }

    async postScore(req: any): Promise<void> {
        const jwt_payload = req.jwt_payload;
        if (jwt_payload.sub !== jwt_payload.user) {
            const submitter = await this.userService.getUserByName(jwt_payload.sub);
            if (submitter === null)
                throw new UnauthorizedException();

            // Check if admin
            if (!submitter.isAdmin)
                throw new UnauthorizedException();
        }

        // Check if user exists
        let user = await this.userService.getUserByName(jwt_payload.user);
        if (user === null)
            throw new UnauthorizedException();

        // Check if score is higher
        let score = await this.scoreService.getScoreByUser(jwt_payload.user);
        if (score === null) {
            score = new Score();
            score.user = user;
            score.score = jwt_payload.score;
        } else if (score.score < jwt_payload.score) {
            score.score = jwt_payload.score;
        }

        await this.scoreService.saveScore(score);
    }
}
