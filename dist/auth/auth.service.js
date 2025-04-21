"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_entity_1 = require("../entities/auth.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_jwt_secret";
let AuthService = class AuthService {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    async checkValidity(request) {
        try {
            const user = request.user;
            if (!user) {
                return {
                    success: false,
                    message: "User not found",
                };
            }
            else {
                return {
                    success: true,
                    message: "User found",
                    data: user,
                };
            }
        }
        catch (error) {
            return {
                success: false,
                message: "Failed to fetch auth data",
                error: error.message,
            };
        }
    }
    async getAuthData(req) {
        try {
            const userRole = req.user?.role;
            if (userRole !== "admin") {
                return {
                    success: false,
                    message: "Access denied! Only admins can view this data.",
                };
            }
            const allUsers = await this.authRepository.find();
            return {
                success: true,
                message: "All Users",
                data: allUsers,
            };
        }
        catch (error) {
            console.error("Error fetching auth data:", error);
            return {
                success: false,
                message: "Failed to fetch auth data",
                error: error.message,
            };
        }
    }
    async postAuthData(data) {
        try {
            const check = await this.authRepository.findOne({
                where: { email: data.email },
            });
            if (check) {
                return { success: false, message: "Email Already Exists" };
            }
            const phoneCheck = await this.authRepository.findOne({
                where: { phone: data.phone },
            });
            if (phoneCheck) {
                return { success: false, message: "Phone Already Exists" };
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(data.password, salt);
            const user = this.authRepository.create({
                name: data.name,
                email: data.email,
                password: hashedPassword,
                phone: data.phone,
                role: data.role,
            });
            const result = await this.authRepository.save(user);
            const jwtData = jwt.sign({
                id: result.id,
                email: result.email,
                name: result.name,
                password: result.password,
                phone: result.phone,
                role: result.role,
            }, JWT_SECRET, { expiresIn: "1h" });
            return {
                success: true,
                message: "User Registered Successfully",
                data: { token: jwtData, user: result },
            };
        }
        catch (error) {
            console.error("Error in postAuthData:", error);
            return {
                success: false,
                message: "Failed to register user",
                error: error.message,
            };
        }
    }
    async login(data) {
        try {
            const user = await this.authRepository.findOne({
                where: { email: data.email },
            });
            if (!user) {
                return { success: false, message: "Invalid credentials" };
            }
            const isPasswordValid = await bcrypt.compare(data.password, user.password);
            if (!isPasswordValid) {
                return { success: false, message: "Invalid credentials" };
            }
            const token = jwt.sign({
                id: user.id,
                email: user.email,
                name: user.name,
                password: user.password,
                phone: user.phone,
                role: user.role,
            }, JWT_SECRET, {
                expiresIn: "1h",
            });
            return {
                success: true,
                message: "Login successful",
                data: {
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    },
                },
            };
        }
        catch (error) {
            console.error("Error in login:", error);
            return { success: false, message: "Login failed", error: error.message };
        }
    }
    async deleteUser(req, data) {
        const id = req?.user?.id;
        try {
            const user = await this.authRepository.findOne({ where: { id } });
            if (!user) {
                return { success: false, message: "User not found" };
            }
            const isPasswordValid = await bcrypt.compare(data?.password, user?.password);
            if (isPasswordValid === false) {
                return { success: false, message: "Invalid Password" };
            }
            await this.authRepository.delete(id);
            return { success: true, message: "User deleted successfully" };
        }
        catch (error) {
            console.error("Error deleting user:", error);
            return {
                success: false,
                message: "Failed to delete user",
                error: error.message,
            };
        }
    }
    async updateUser(request, data) {
        console.log("Request:", request);
        console.log("Data:", data);
        const id = request?.user?.id;
        try {
            const user = await this.authRepository.findOne({ where: { id } });
            if (!user) {
                return { success: false, message: "User not found" };
            }
            if (data.email && data.email !== user.email) {
                const emailExists = await this.authRepository.findOne({
                    where: { email: data.email },
                });
                if (emailExists) {
                    return { success: false, message: "Email already in use" };
                }
            }
            if (data.phone && data.phone !== user.phone) {
                const phoneExists = await this.authRepository.findOne({
                    where: { phone: data.phone },
                });
                if (phoneExists) {
                    return { success: false, message: "Phone already in use" };
                }
            }
            let updatedPassword = user.password;
            if (data.password) {
                const salt = await bcrypt.genSalt(10);
                updatedPassword = await bcrypt.hash(data.password, salt);
            }
            const updatedUser = {
                name: data.name ?? user.name,
                email: data.email ?? user.email,
                password: updatedPassword,
                phone: data.phone ?? user.phone,
                role: data.role ?? user.role,
            };
            await this.authRepository.update(id, updatedUser);
            const newUser = await this.authRepository.findOne({ where: { id } });
            const token = jwt.sign({
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
                password: newUser.password,
                phone: newUser.phone,
                role: newUser.role,
            }, JWT_SECRET, {
                expiresIn: "1h",
            });
            return {
                success: true,
                message: "User updated successfully",
                data: newUser,
                token,
            };
        }
        catch (error) {
            console.error("Error updating user:", error);
            return {
                success: false,
                message: "Failed to update user",
                error: error.message,
            };
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(auth_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map