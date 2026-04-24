import { Module } from '@nestjs/common';
//importando o Module do @nestjs/common
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
//import { UsersModule } from './modules/users/users.module';
//import { ProductsModule } from './modules/products/products.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

//criando a classe AppModule
// o @ faz parte do decorador @Module e indica que a classe é um module
@Module({
  //imports é um array que vai conter os módulos
  // PrismaModule é um módulo que vai conter o PrismaService
  // UsersModule é um módulo que vai conter o UsersService e o UsersController
  // ProductsModule é um módulo que vai conter o ProductsService e o ProductsController
  imports: [PrismaModule, UsersModule, ProductsModule, AuthModule],
  //controllers é um array que vai conter os controllers
  // AppController é um controller que vai receber as requisições HTTP
  controllers: [AppController],
  //providers é um array que vai conter os serviços
  // AppService é um serviço que vai receber as requisições HTTP
  providers: [AppService],
  //exportando a classe AppModule
})
export class AppModule {}
