import { AuthService } from "src/auth/auth.service";
import { CreateUserDto, LoginUserDto } from "src/dtos/auth.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getAuthData(request: any): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        data: import("../entities/auth.entity").User[];
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    postAuthData(data: CreateUserDto): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        data: {
            token: string;
            user: import("../entities/auth.entity").User;
        };
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    login(data: LoginUserDto): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        data: {
            token: string;
            user: {
                id: number;
                name: string;
                email: string;
                role: string;
            };
        };
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    deleteUser(request: any, data: any): Promise<{
        success: boolean;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
    }>;
    updateUser(request: any, data: any): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
        token?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        data: import("../entities/auth.entity").User;
        token: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
        token?: undefined;
    }>;
}
