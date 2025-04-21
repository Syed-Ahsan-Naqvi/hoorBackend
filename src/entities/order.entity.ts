import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("order")
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount_total: number;

  // @Column()
  // expires_at: number;

  // @Column()
  // invoice_id: string;

  @Column()
  card_holder_name: string;

  @Column()
  card_holder_email: string;

  @Column()
  card_holder_phone: string;

  @Column()
  card_holder_city: string;

  @Column()
  card_holder_country: string;

  @Column()
  card_holder_line1: string;

  @Column()
  card_holder_line2: string;

  @Column()
  card_holder_postal_code: string;

  // @Column()
  // customer_state: string;

  @Column()
  payment_id: string;

  @Column()
  payment_status: string;

  // @Column()
  // currency: string;

  @Column("simple-json")
  userId: string[];

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  dateCreated: Date;

  @Column("simple-json")
  order_data: string[];
}
