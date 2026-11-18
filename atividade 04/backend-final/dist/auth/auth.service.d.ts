import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(email: string, senha: string): Promise<{
        id: number;
        email: string;
    }>;
    validarUsuario(email: string, senha: string): Promise<import("../users/entities/user.entity").User>;
    login(email: string, senha: string): Promise<{
        token: string;
        user: {
            id: number;
            email: string;
        };
    }>;
}
