import { User } from "src/entities/auth.entity";
import { Repository } from "typeorm";
import { CreateUserDto, LoginUserDto } from "src/dtos/auth.dto";
export declare class AuthService {
    private authRepository;
    constructor(authRepository: Repository<User>);
    getAuthData(req: any): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        data: User[];
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
            user: User;
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
    deleteUser(req: any, data: any): Promise<{
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
        data: User;
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
