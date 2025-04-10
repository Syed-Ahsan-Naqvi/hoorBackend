import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Product } from "./product.entity";
import { SubCategory } from "./subCategory.entity";

@Entity("category")
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column("simple-json")
  images: string[];

  @Column()
  color: string;

  // ⭐ Linking to Products
  @OneToMany(() => Product, (product) => product.category)
  product: Product[];

  // ⭐ Linking to SubCategories
  @OneToMany(() => SubCategory, (subCategory) => subCategory.category)
  subCategories: SubCategory[];
}
