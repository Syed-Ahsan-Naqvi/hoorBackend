import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
// import { Notes } from "./notes.entity"; // Ensure the correct path

@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column({ nullable: true, default: "user" })
  role: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  // @OneToMany(() => Notes, (notes) => notes.user)
  // notes: Notes[];
}
