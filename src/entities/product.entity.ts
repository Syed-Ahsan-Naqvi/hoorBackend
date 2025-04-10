import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Category } from "./category.entity";
import { SubCategory } from "./subCategory.entity";

@Entity("product")
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column("simple-json")
  images: string[];

  @Column()
  brand: string;

  @Column()
  discount: string;

  @Column({ default: "0.00" })
  price: number;

  @Column({ default: "0.00" })
  oldPrice: number;

  @Column()
  countInStock: number;

  @Column({ type: "float", default: 0 })
  rating: number;

  @Column({ default: 0 })
  numReviews: number;

  @Column({ default: false })
  isFeatured: boolean;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  dateCreated: Date;

  // ⭐ Linking to Category
  @ManyToOne(() => Category, (category) => category.product, {
    onDelete: "CASCADE",
  })
  category: Category;

  // ⭐ Linking to SubCategory
  @ManyToOne(() => SubCategory, (subCategory) => subCategory.products, {
    onDelete: "CASCADE",
  })
  subCategory: SubCategory;
}
