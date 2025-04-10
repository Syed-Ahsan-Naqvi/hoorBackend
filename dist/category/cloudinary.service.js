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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
let CloudinaryService = class CloudinaryService {
    constructor() {
        cloudinary_1.v2.config({
            cloud_name: "dbxuynhy0",
            api_key: "214768323283339",
            api_secret: "5IGw31yNn_50ZkimD8fG2Autrww",
        });
    }
    async uploadImage(file) {
        const result = await cloudinary_1.v2.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString("base64")}`, { folder: "categories" });
        return result.secure_url;
    }
    async deleteImage(imageUrl) {
        try {
            const publicId = imageUrl.split("/").slice(-2).join("/").split(".")[0];
            await cloudinary_1.v2.uploader.destroy(publicId);
        }
        catch (error) {
            console.error("Error deleting image from Cloudinary:", error);
            throw new Error("Failed to delete image");
        }
    }
};
exports.CloudinaryService = CloudinaryService;
exports.CloudinaryService = CloudinaryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CloudinaryService);
//# sourceMappingURL=cloudinary.service.js.map