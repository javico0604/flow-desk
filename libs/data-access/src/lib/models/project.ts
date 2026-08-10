import { ProjectResponseDto } from "../api-client/models";

export class Project {
    id: number;
    name: string;
    description: string;
    ownerId: number;
    createdAt: string;
    updatedAt: string;

    constructor(dto: ProjectResponseDto) {
        this.id = dto.id;
        this.name = dto.name;
        this.description = dto.description ?? '';
        this.ownerId = dto.ownerId;
        this.createdAt = dto.createdAt;
        this.updatedAt = dto.updatedAt;
    }
}