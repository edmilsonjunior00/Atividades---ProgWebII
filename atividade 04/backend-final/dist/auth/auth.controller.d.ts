import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: AuthDto): Promise<{
        id: number;
        email: string;
    }>;
    login(dto: AuthDto, res: Response): Promise<{
        user: {
            id: number;
            email: string;
        };
    }>;
    logout(res: Response): {
        ok: boolean;
    };
    me(req: Request): Express.User;
}
