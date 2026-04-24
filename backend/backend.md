# Guia de Desenvolvimento Backend (NestJS + Prisma)

Este projeto utiliza o framework **NestJS** com **Prisma ORM**. Para criar uma nova funcionalidade (rota, lógica e banco de dados) do zero, siga estes passos:

## 1. Definir o Modelo no Banco de Dados
Edite o arquivo `prisma/schema.prisma` e adicione o seu modelo.
Exemplo:
```prisma
model Product {
  id        Int      @id @default(autoincrement())
  name      String
  price     Float
  createdAt DateTime @default(now())
}
```

## 2. Sincronizar o Banco de Dados
Sempre que alterar o `schema.prisma`, rode o comando para criar a migração e atualizar o banco:
```powershell
npx prisma migrate dev --name nome_da_sua_alteracao
```

## 3. Criar a Estrutura do Recurso
Crie uma pasta em `src/modules/` para o seu recurso (ex: `products/`). Dentro dela, você precisará de 3 arquivos:

### A. Service (`nome.service.ts`)
Onde fica a lógica de acesso ao banco.
```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.product.findMany();
  }
}
```

### B. Controller (`nome.controller.ts`)
Onde ficam as rotas (endpoints).
```typescript
import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products') // Isso cria a rota /products
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }
}
```

### C. Module (`nome.module.ts`)
Onde você conecta o Controller e o Service.
```typescript
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
```

## 4. Registrar no AppModule
Abra o arquivo `src/app.module.ts` e adicione o seu novo módulo no array `imports`:

```typescript
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [PrismaModule, UsersModule, ProductsModule], // Adicione aqui
  // ...
})
```

---

## Resumo da Arquitetura NestJS:
- **Module**: Organiza os componentes relacionados.
- **Controller**: Trata as requisições HTTP (Rotas).
- **Service**: Executa a lógica de negócio e banco de dados.
- **Prisma**: Faz a ponte entre o código e o banco PostgreSQL.

---

## 5. Usando DTOs (Data Transfer Objects)
Os DTOs são usados para definir o formato dos dados que chegam na API e aplicar validações automáticas.

### Como criar:
1. Crie uma pasta `dto` dentro do seu módulo.
2. Crie um arquivo para a ação (ex: `create-product.dto.ts`).
3. Use decoradores do `class-validator` para validar os campos.

Exemplo (`create-product.dto.ts`):
```typescript
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @IsNumber()
  price: number;
}
```

### Como usar no Controller:
```typescript
@Post()
async create(@Body() data: CreateProductDto) { // O NestJS valida o body automaticamente
  return this.productsService.create(data);
}
```

> [!TIP]
> Para que as validações funcionem, instalamos `class-validator` e `class-transformer` e ativamos o `ValidationPipe` global no arquivo `main.ts`.