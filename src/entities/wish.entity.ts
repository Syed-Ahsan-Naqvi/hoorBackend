import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
// import { Notes } from "./notes.entity"; // Ensure the correct path

@Entity("wish")
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productTitle: string;

  @Column()
  image: string;

  @Column({ type: "float", default: 0 })
  rating: number;

  @Column({ default: "0.00" })
  price: number;

  @Column()
  brand: string;

  @Column()
  userId: number;

  @Column()
  productId: number;
}
