import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodModule } from './models/food/food.module';
import { UsersModule } from './models/users/users.module';
import { AuthModule } from './models/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    FoodModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
