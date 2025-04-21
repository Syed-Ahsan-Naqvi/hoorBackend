import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from "@nestjs/common";
import { request } from "express";
import { AuthService } from "src/auth/auth.service";
import { CreateUserDto, LoginUserDto } from "src/dtos/auth.dto";

@Controller("/api/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("/check-validity")
  async checkValidity(@Req() request: any) {
    return this.authService.checkValidity(request);
  }

  @Get("/getAllUsers")
  async getAuthData(@Req() request: any) {
    return this.authService.getAuthData(request);
  }

  @Post("/createUser")
  async postAuthData(@Body() data: CreateUserDto) {
    return this.authService.postAuthData(data);
  }

  @Post("/login")
  async login(@Body() data: LoginUserDto) {
    return this.authService.login(data);
  }

  @Delete("/deleteUser")
  async deleteUser(@Req() request: any, @Body() data: any) {
    return this.authService.deleteUser(request, data);
  }

  @Put("/updateUser")
  async updateUser(@Req() request: any, @Body() data: any) {
    return this.authService.updateUser(request, data);
  }

  // @Post("/forgotPassword")
  // async forgotPassword(@Body() data: any) {
  //   return this.authService.forgotPassword(data);
  // }

  // @Post("/getUserDataByToken")
  // async getUserDataByToken(@Req() req: any) {
  //   const user = req.user;
  //   return this.authService.getUserDataByToken(user);
  // }
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhaHNhbkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDIyODMwNTMsImV4cCI6MTc0MjI4NjY1M30.rCo0_b9bFfyye2bwlC_FKoQRTNEPYYhM06z0ufd3BK0
