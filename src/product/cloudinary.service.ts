import { Injectable } from "@nestjs/common";
import { v2 as cloudinary } from "cloudinary";

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: "dbxuynhy0",
      api_key: "214768323283339",
      api_secret: "5IGw31yNn_50ZkimD8fG2Autrww",
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    // Use file.buffer instead of file.path
    const result = await cloudinary.uploader.upload(
      `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
      { folder: "products" }
    );
    return result.secure_url;
  }

  async deleteImage(imageUrl: string): Promise<void> {
    try {
      // Extract public ID from URL (e.g., "uploads/abc123" from "https://res.cloudinary.com/.../uploads/abc123.jpg")
      const publicId = imageUrl.split("/").slice(-2).join("/").split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error("Error deleting image from Cloudinary:", error);
      throw new Error("Failed to delete image");
    }
  }
}
