import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SubCategory } from "src/entities/subCategory.entity";

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategory)
    private subcategoryRepository: Repository<SubCategory>
  ) {}

  // Getting All Data From Auth
  async getSubCategoryData() {
    const data = await this.subcategoryRepository.find({
      relations: ["category"], // Fetch related category data
    });
    return { message: "All Data From Category", data: data };
  }

  // Getting All Data From Id
  async getSubCategoryByIdData(id: any) {
    const data = await this.subcategoryRepository.findOne({ where: { id } });
    return { message: "All Data From Category", data: data };
  }

  // Delete Data From Id
  async deleteSubCategoryByIdData(id: any) {
    const item = await this.subcategoryRepository.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException("Item not found");
    }

    const result = await this.subcategoryRepository.delete(id);
    return { message: "Data Deleted", data: result };
  }

  async postSubCategoryData(data: any) {
    const finalData = {
      name: data.name,
      category: data.category,
    };

    const result = await this.subcategoryRepository.save(finalData);
    return { message: "Category Data Added", result };
  }

  async updateSubCategoryById(id: number, data: any) {
    const category = await this.subcategoryRepository.findOne({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException("Item not found");
    }

    // Updating fields
    const result = await this.subcategoryRepository.update(id, {
      name: data.name,
      category: data.category,
    });

    return { message: "Category Updated Successfully", result };
  }
}
