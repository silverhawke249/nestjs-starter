export const RATE_LIMIT_TTL = 1000;
export const RATE_LIMIT_COUNT = 5;

export const DATABASE_PROVIDER_TOKEN = 'DATA_SOURCE';
export const SCORE_PROVIDER_TOKEN = 'SCORE_REPOSITORY';
export const USER_PROVIDER_TOKEN = 'USER_REPOSITORY';
export const SEEDER_PROVIDER_TOKEN = 'SEEDER';

export const LEADERBOARD_SIZE = 10;

export type LeaderboardEntry = {user: string, score: number};

export const jwtConstants = {
    secret: 'just a placeholder secret.',
};
