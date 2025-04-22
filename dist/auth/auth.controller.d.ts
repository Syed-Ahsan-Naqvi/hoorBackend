import { AuthService } from "src/auth/auth.service";
import { CreateUserDto, LoginUserDto } from "src/dtos/auth.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    checkValidity(request: any): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        data: any;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
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
    adminLogin(data: LoginUserDto, request: any): Promise<{
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
    adminDelete(request: any, data: any, id: any): Promise<{
        success: boolean;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
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
    adminUpdate(request: any, data: any, id: any): Promise<{
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
