export declare class Order {
    id: number;
    amount_total: number;
    card_holder_name: string;
    card_holder_email: string;
    card_holder_phone: string;
    card_holder_city: string;
    card_holder_country: string;
    card_holder_line1: string;
    card_holder_line2: string;
    card_holder_postal_code: string;
    payment_id: string;
    payment_status: string;
    userId: string[];
    dateCreated: Date;
    order_data: string[];
}
