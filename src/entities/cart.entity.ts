import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
// import { Notes } from "./notes.entity"; // Ensure the correct path

@Entity("cart")
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productTitle: string;

  @Column()
  image: string;

  @Column()
  rating: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  subTotal: number;

  @Column()
  productId: string;

  @Column()
  brand: string;

  @Column()
  userId: string;
}
