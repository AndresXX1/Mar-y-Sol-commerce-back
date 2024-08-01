import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookingsModule } from './bookings/bookings.module';
import { ProductModule } from './Product/product.module';
import { MailerModule } from './mailer/mailer.module';
import { ConfigModule } from '@nestjs/config';
import { ColectionModule } from './colection/colection.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://av5328881:b5JkQtmqN8RMMsT7@mariii.42kulhz.mongodb.net/?retryWrites=true&w=majority&appName=Mariii',
    ),
    AuthModule,
    UserModule,
    ColectionModule,
    BookingsModule,
    ProductModule,
    MailerModule,
  ],
})
export class AppModule {}
