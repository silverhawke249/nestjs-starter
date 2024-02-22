import { Inject, Injectable } from "@nestjs/common";
import { USER_PROVIDER_TOKEN } from "./constants";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService {
    constructor(
        @Inject(USER_PROVIDER_TOKEN)
        private userRepository: Repository<User>,
    ) { }

    async getUserByName(userName: string): Promise<User | null> {
        return this.userRepository.findOne({
            where: {
                name: userName,
            },
        })
    }
}
