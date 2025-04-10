import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Category } from "./category.entity";
import { Product } from "./product.entity";

@Entity("subCategory")
export class SubCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // ⭐ Linking SubCategory to Category (Many-to-One)
  @ManyToOne(() => Category, (category) => category.subCategories, {
    onDelete: "CASCADE",
  })
  category: Category;

  // ⭐ Linking SubCategory to Products (One-to-Many)
  @OneToMany(() => Product, (product) => product.subCategory)
  products: Product[];
}
