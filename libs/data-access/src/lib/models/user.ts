import { UserResponseDto } from "../api-client/models";

export class User {
    email: string;
    id: number;
    name: string;
    initial: string;

    constructor(dto: UserResponseDto) {
        this.email = dto.email;
        this.id = dto.id;
        this.name = dto.name;
        this.initial = dto.name.charAt(0).toUpperCase();
    }
}