import { Inject, Injectable } from "@nestjs/common";
import { LEADERBOARD_SIZE, SCORE_PROVIDER_TOKEN } from "./constants";
import { Repository } from "typeorm";
import { Score } from "./score.entity";

@Injectable()
export class ScoreService {
    constructor(
        @Inject(SCORE_PROVIDER_TOKEN)
        private scoreRepository: Repository<Score>,
    ) {}

    async getLeaderboard(): Promise<Score[]> {
        return this.scoreRepository.find({
            order: {
                score: "DESC",
            },
            take: LEADERBOARD_SIZE,
        })
    }

    async getScoreByUser(userName: string): Promise<Score | null> {
        return this.scoreRepository.findOne({
            where: {
                user: {
                    name: userName,
                },
            },
        })
    }

    async saveScore(score: Score): Promise<void> {
        this.scoreRepository.manager.save(score);
    }
}
