# Arquitetura Backend

O backend do **ConnectDB** foi construído utilizando o framework **NestJS**, que fornece uma arquitetura escalável e modular para aplicações Node.js.

## Conceitos Fundamentais

### 1. NestJS
O NestJS utiliza TypeScript por padrão e se baseia em conceitos como:
- **Módulos**: Organizam o código em blocos funcionais (ex: `UsersModule`, `AuthModule`).
- **Controladores**: Lidam com as requisições HTTP e definem as rotas.
- **Serviços**: Contêm a lógica de negócio e interagem com o banco de dados.

### 2. Prisma ORM
O Prisma é utilizado para interagir com o banco de dados PostgreSQL. Ele fornece:
- **Type-safety**: Consultas seguras com tipos gerados automaticamente.
- **Migrações**: Controle de versão do esquema do banco de dados.
- **Prisma Client**: Uma interface intuitiva para realizar operações de CRUD.

### 3. Autenticação JWT
A segurança é garantida através de JSON Web Tokens (JWT).
- O usuário faz login e recebe um token.
- Esse token deve ser enviado no header `Authorization: Bearer <token>` em rotas protegidas.

## Estrutura de Pastas

```text
backend/
├── prisma/             # Esquema do banco de dados e migrações
├── src/
│   ├── auth/           # Lógica de autenticação e JWT
│   ├── users/          # Gerenciamento de usuários
│   ├── products/       # Gerenciamento de produtos
│   ├── main.ts         # Ponto de entrada (Configuração do Swagger aqui!)
│   └── app.module.ts   # Módulo raiz da aplicação
```

## Como Rodar

1. Certifique-se de que o Docker está rodando.
2. No diretório `backend`, instale as dependências: `npm install`.
3. Configure o arquivo `.env` com a URL do banco de dados.
4. Execute as migrações: `npx prisma migrate dev`.
5. Inicie o servidor: `npm run start:dev`.

---

[Voltar para o Início](index.md)
