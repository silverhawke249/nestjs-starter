import { DataSource } from "typeorm";
import { DATABASE_PROVIDER_TOKEN, SCORE_PROVIDER_TOKEN } from "./constants";
import { Score } from "./score.entity";

export const scoreProviders = [
    {
        provide: SCORE_PROVIDER_TOKEN,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Score),
        inject: [DATABASE_PROVIDER_TOKEN],
    },
];
