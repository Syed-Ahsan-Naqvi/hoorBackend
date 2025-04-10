import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/auth.entity";
import { Repository } from "typeorm";
import { CreateUserDto, LoginUserDto } from "src/dtos/auth.dto";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
const JWT_SECRET = "your_jwt_secret";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private authRepository: Repository<User>
  ) {}

  // Getting All Data From Auth
  async getAuthData(req: any) {
    try {
      // Extract role from decoded token (middleware se aayega)
      const userRole = req.user?.role;

      // Check if user is admin
      if (userRole !== "admin") {
        return {
          success: false,
          message: "Access denied! Only admins can view this data.",
        };
      }

      // Fetch all users (excluding admin)
      const allUsers = await this.authRepository.find();
      // const filteredUsers = allUsers.filter((user) => user.role !== "admin");

      return {
        success: true,
        message: "All Users",
        data: allUsers,
      };
    } catch (error) {
      console.error("Error fetching auth data:", error);
      return {
        success: false,
        message: "Failed to fetch auth data",
        error: error.message,
      };
    }
  }

  // Posting Data To Auth
  async postAuthData(data: CreateUserDto) {
    try {
      // Checking if email already exists
      const check = await this.authRepository.findOne({
        where: { email: data.email },
      });
      if (check) {
        return { success: false, message: "Email Already Exists" };
      }

      // Checking if phone number already exists
      const phoneCheck = await this.authRepository.findOne({
        where: { phone: data.phone },
      });
      if (phoneCheck) {
        return { success: false, message: "Phone Already Exists" };
      }

      // Hashing Password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);

      // Creating User Object
      const user = this.authRepository.create({
        name: data.name,
        email: data.email,
        password: hashedPassword,
        phone: data.phone,
        role: data.role,
      });

      // Saving Data in Database
      const result = await this.authRepository.save(user);

      // Creating JWT Token
      const jwtData = jwt.sign(
        {
          id: result.id,
          email: result.email,
          name: result.name,
          password: result.password,
          phone: result.phone,
          role: result.role,
        },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Returning Response
      return {
        success: true,
        message: "User Registered Successfully",
        data: { token: jwtData, user: result },
      };
    } catch (error) {
      console.error("Error in postAuthData:", error);
      return {
        success: false,
        message: "Failed to register user",
        error: error.message,
      };
    }
  }

  async login(data: LoginUserDto) {
    try {
      // Check if user exists
      const user = await this.authRepository.findOne({
        where: { email: data.email },
      });

      if (!user) {
        return { success: false, message: "Invalid credentials" };
      }

      // Compare hashed password
      const isPasswordValid = await bcrypt.compare(
        data.password,
        user.password
      );
      if (!isPasswordValid) {
        return { success: false, message: "Invalid credentials" };
      }

      // Generate JWT Token
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          name: user.name,
          password: user.password,
          phone: user.phone,
          role: user.role,
        },
        JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

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
    } catch (error) {
      console.error("Error in login:", error);
      return { success: false, message: "Login failed", error: error.message };
    }
  }

  async deleteUser(req: any, data: any) {
    const id = req?.user?.id;

    try {
      // Check if requester is admin
      // if (req.user?.role !== "admin") {
      //   return {
      //     success: false,
      //     message: "Access denied! Only admins can delete users.",
      //   };
      // }

      // Check if user exists
      const user = await this.authRepository.findOne({ where: { id } });

      if (!user) {
        return { success: false, message: "User not found" };
      }

      const isPasswordValid = await bcrypt.compare(
        data?.password,
        user?.password
      );

      if (isPasswordValid === false) {
        return { success: false, message: "Invalid Password" };
      }

      // Delete user
      await this.authRepository.delete(id);

      return { success: true, message: "User deleted successfully" };
    } catch (error) {
      console.error("Error deleting user:", error);
      return {
        success: false,
        message: "Failed to delete user",
        error: error.message,
      };
    }
  }

  async updateUser(request: any, data: any) {
    console.log("Request:", request);
    console.log("Data:", data);
    const id = request?.user?.id;
    try {
      // Check if user exists
      const user = await this.authRepository.findOne({ where: { id } });
      if (!user) {
        return { success: false, message: "User not found" };
      }

      // Ensure email and phone are unique if updating
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

      // Keep existing password if not provided
      let updatedPassword = user.password;
      if (data.password) {
        const salt = await bcrypt.genSalt(10);
        updatedPassword = await bcrypt.hash(data.password, salt);
      }

      // Update user with existing values for missing fields
      const updatedUser = {
        name: data.name ?? user.name,
        email: data.email ?? user.email,
        password: updatedPassword,
        phone: data.phone ?? user.phone,
        role: data.role ?? user.role,
      };

      await this.authRepository.update(id, updatedUser);

      // Fetch updated user from DB
      const newUser = await this.authRepository.findOne({ where: { id } });

      const token = jwt.sign(
        {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          password: newUser.password,
          phone: newUser.phone,
          role: newUser.role,
        },
        JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      return {
        success: true,
        message: "User updated successfully",
        data: newUser,
        token,
      };
    } catch (error) {
      console.error("Error updating user:", error);
      return {
        success: false,
        message: "Failed to update user",
        error: error.message,
      };
    }
  }
}
