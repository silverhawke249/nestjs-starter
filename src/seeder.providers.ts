import { Inject, Injectable } from "@nestjs/common";
import { SCORE_PROVIDER_TOKEN, SEEDER_PROVIDER_TOKEN, USER_PROVIDER_TOKEN } from "./constants";
import { User } from "./user.entity";
import { Score } from "./score.entity";
import { Repository } from "typeorm";

@Injectable()
export class Seeder {
    constructor(
        @Inject(SCORE_PROVIDER_TOKEN)
        private scoreRepository: Repository<Score>,
        @Inject(USER_PROVIDER_TOKEN)
        private userRepository: Repository<User>,
    ) { }

    async seed() {
        for (let i = 1; i <= 10; i++) {
            let user = await this.userRepository.findOne({
                where: [{
                    name: `foo${i}`,
                }],
            });
            if (user === null) {
                user = new User();
                user.name = `foo${i}`;
                user.isAdmin = Math.random() < 0.5;
            }

            let score = await this.scoreRepository.findOne({
                where: [{
                    user: user,
                }],
            });
            if (score === null) {
                score = new Score();
                score.user = user;
                score.score = 160 - i * 10;
            }

            await this.userRepository.manager.save(user);
            await this.scoreRepository.manager.save(score);
        }
    }
}
