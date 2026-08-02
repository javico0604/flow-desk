import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {

    constructor(
        private prisma: PrismaService,
        private jwt: JwtService
    ) { }


    async register(data: RegisterDto) {

        const exists = await this.prisma.user.findUnique({
            where: {
                email: data.email
            }
        });

        if (exists) {
            throw new Error('Email already exists');
        }


        const password = await bcrypt.hash(
            data.password,
            10
        );


        const user = await this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password
            }
        });


        return {
            id: user.id,
            email: user.email,
            name: user.name
        };

    }


    async login(email: string, password: string) {

        const user = await this.prisma.user.findUnique({
            where: {
                email
            }
        });


        if (!user) {
            throw new UnauthorizedException();
        }


        const valid = await bcrypt.compare(
            password,
            user.password
        );


        if (!valid) {
            throw new UnauthorizedException();
        }


        const accessToken = this.jwt.sign(
            {
                sub: user.id,
                email: user.email
            },
            {
                expiresIn: '15m'
            }
        );


        const refreshToken = this.jwt.sign(
            {
                sub: user.id
            },
            {
                secret: 'refresh_secret',
                expiresIn: '7d'
            }
        );

        await this.prisma.refreshToken.create({
            data: {
                token: refreshToken,
                userId: user.id,
                expiresAt: new Date(
                    Date.now() + 7 * 24 * 60 * 60 * 1000
                )
            }
        });

        return {
            accessToken,
            refreshToken
        };

    }

    async refresh(token: string) {

        const storedToken = await this.prisma.refreshToken.findFirst({
            where: {
                token
            }
        });

        if (!storedToken) {
            throw new UnauthorizedException();
        }

        if (storedToken.expiresAt < new Date()) {
            throw new UnauthorizedException();
        }

        const payload = this.jwt.verify(token, {
            secret: 'refresh_secret'
        });

        const user = await this.prisma.user.findUnique({
            where: {
                id: payload.sub
            }
        });

        if (!user) {
            throw new UnauthorizedException();
        }

        const accessToken = this.jwt.sign({
            sub: user.id,
            email: user.email
        });

        return {
            accessToken
        };
    }

    async logout(token: string) {

        await this.prisma.refreshToken.deleteMany({
            where: {
                token
            }
        });

        return {
            message: 'Logout successful'
        };
    }

    async me(userId: number) {

        return this.prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });

    }
}