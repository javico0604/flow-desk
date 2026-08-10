import { RegisterDto } from "../api-client/models";

export class Register {
    name: string;
    email: string;
    password: string;

    constructor(dto: RegisterDto) {
        this.name = dto.name;
        this.email = dto.email;
        this.password = dto.password;
    }
}