import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database.module";
import { Seeder } from "./seeder.providers";
import { ScoreModule } from "./score.module";
import { UserModule } from "./user.module";

@Module({
    imports: [
        DatabaseModule,
        ScoreModule,
        UserModule,
    ],
    providers: [Seeder],
})
export class SeederModule { }
