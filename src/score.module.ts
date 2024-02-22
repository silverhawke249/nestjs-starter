import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database.module";
import { scoreProviders } from "./score.providers";
import { ScoreService } from "./score.service";

@Module({
    imports: [DatabaseModule],
    providers: [
        ...scoreProviders,
        ScoreService,
    ],
    exports: [
        ...scoreProviders,
        ScoreService,
    ],
})
export class ScoreModule { }
