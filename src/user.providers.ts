import { DataSource } from "typeorm";
import { DATABASE_PROVIDER_TOKEN, USER_PROVIDER_TOKEN } from "./constants";
import { User } from "./user.entity";

export const userProviders = [
    {
        provide: USER_PROVIDER_TOKEN,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
        inject: [DATABASE_PROVIDER_TOKEN],
    },
];
