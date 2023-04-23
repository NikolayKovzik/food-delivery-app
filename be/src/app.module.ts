import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodModule } from './models/food/food.module';
import { UsersModule } from './models/users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './models/auth/auth.module';
import { join } from 'path';
import { FiltersModule } from './models/filters/filters.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot(
      {
        serveStaticOptions: {
          index: false,
        },
        rootPath: join(__dirname, '..', 'public/assets/food'),
        serveRoot: '/assets/food',
      },
      // {
      //   serveStaticOptions: {
      //     index: false,
      //   },
      //   rootPath: join(__dirname, '..', 'public/assets/courier'),
      //   serveRoot: '/assets/courier',
      // },
    ),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    FoodModule,
    UsersModule,
    AuthModule,
    FiltersModule,
  ],
})
export class AppModule {}
