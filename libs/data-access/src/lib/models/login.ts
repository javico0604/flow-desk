import { LoginDto } from "../api-client/models";

export class Login {
    email: string;
    password: string;

    constructor(dto: LoginDto) {
        this.email = dto.email;
        this.password = dto.password;
    }
}