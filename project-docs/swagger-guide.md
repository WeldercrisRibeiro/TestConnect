# Guia de Implementação do Swagger

O Swagger (OpenAPI) é essencial para documentar APIs, permitindo que desenvolvedores frontend e outros serviços entendam como interagir com o backend sem precisar ler todo o código-fonte.

## Como aplicar o Swagger em um projeto NestJS

### 1. Instalação
Primeiro, instale as dependências necessárias:
```bash
npm install --save @nestjs/swagger swagger-ui-express
```

### 2. Configuração Inicial (`main.ts`)
No arquivo principal do seu backend (`src/main.ts`), configure o Swagger:

```typescript
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Nome da Sua API')
    .setDescription('Descrição detalhada da API')
    .setVersion('1.0')
    .addBearerAuth() // Habilita autenticação via Token
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Define a rota '/api' para a documentação

  await app.listen(3000);
}
```

### 3. Documentando Controllers
Use decoradores para descrever suas rotas:

```typescript
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('users') // Agrupa as rotas no painel do Swagger
@Controller('users')
export class UsersController {

  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({ status: 200, description: 'Sucesso' })
  findAll() { ... }
}
```

### 4. Documentando DTOs (Data Transfer Objects)
Para que o Swagger mostre o formato dos dados que a API recebe, use o decorador `@ApiProperty`:

```typescript
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'joao@email.com', description: 'O email do usuário' })
  email: string;

  @ApiProperty({ example: 'Senha123', minLength: 6 })
  password: string;
}
```

## Benefícios do Swagger
- **Teste em tempo real**: Você pode testar os endpoints diretamente pelo navegador.
- **Sincronização**: A documentação é gerada automaticamente a partir do código.
- **Padronização**: Segue o padrão OpenAPI, aceito mundialmente.

No **ConnectDB**, você pode acessar a documentação em: `http://localhost:3000/api`

---

[Voltar para o Início](index.md)
