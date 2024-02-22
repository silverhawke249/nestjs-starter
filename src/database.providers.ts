import { DataSource } from "typeorm"
import { User } from "./user.entity";
import { Score } from "./score.entity";

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'sqlite',
                entities: [User, Score],
                synchronize: true,
                database: 'database.sqlite',
            })

            return dataSource.initialize();
        },
    },
]
