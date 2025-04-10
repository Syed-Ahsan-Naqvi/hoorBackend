import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { CategoryModule } from "./category/category.module";
import { Product } from "./entities/product.entity";
import { ProductModule } from "./product/product.module";
import { CartModule } from "./cart/cart.module";
import { SubCategory } from "./entities/subCategory.entity";
import { AuthModule } from "./auth/auth.module";
import { User } from "./entities/auth.entity";
import { Cart } from "./entities/cart.entity";
import { Wish } from "./entities/wish.entity";
import { WishModule } from "./wishlist/wish.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "123",
      database: "ecommerce",
      entities: [Category, Product, SubCategory, User, Cart, Wish],
      synchronize: true,
    }),
    // NotesModule,
    AuthModule,
    CategoryModule,
    ProductModule,
    CartModule,
    WishModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
