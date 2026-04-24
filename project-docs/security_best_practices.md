# Guia de Melhores Práticas de Segurança - ConnectDB

Este documento descreve as medidas de segurança implementadas e recomendações para manter o sistema seguro.

## 1. Comunicação Segura (HTTPS)
**Situação Atual:** Em desenvolvimento, usamos HTTP.
**Recomendação:** Em produção, é **obrigatório** o uso de HTTPS (TLS/SSL).
- O HTTPS criptografa os dados entre o navegador e o servidor.
- Sem HTTPS, dados como senhas e tokens JWT podem ser lidos por qualquer pessoa na rede (ataques de "Man-in-the-Middle").

## 2. Proteção de Credenciais (Hashing)
### Como funciona o Hashing com Bcrypt
O hashing é um processo matemático que transforma uma senha (ex: `123456`) em uma string longa e irreconhecível (ex: `$2b$10$9v...`).
- **Salts:** O `bcrypt` adiciona um "salt" (um valor aleatório) à senha antes de gerar o hash. Isso impede que duas senhas iguais tenham o mesmo hash, protegendo contra ataques de "Rainbow Tables".
- **Cost Factor (Rounds):** Usamos um fator de custo (atualmente `10`). Isso define quantas vezes o algoritmo é executado. Quanto maior o número, mais tempo leva para gerar o hash, o que torna ataques de força bruta extremamente lentos e caros para o invasor.
- **Unidirecional:** O hash não pode ser "descriptografado". Para validar o login, o sistema gera o hash da senha digitada e compara com o hash salvo no banco.

### Outras formas de Hashing
- **Argon2:** Atualmente considerado o algoritmo mais forte e vencedor da Password Hashing Competition. É resistente a ataques baseados em GPU e memória.
- **Scrypt:** Similar ao bcrypt, mas exige mais memória, o que dificulta ataques com hardware especializado (ASICs).
- **PBKDF2:** Um padrão mais antigo, ainda seguro se usado com muitas iterações, mas geralmente mais lento que o bcrypt.

> [!NOTE]
> Para este projeto, o **Bcrypt** é uma excelente escolha equilibrando segurança e compatibilidade.

## 3. Autenticação e Manutenção de Tokens (JWT)
O JWT é usado para manter o usuário autenticado sem precisar consultar o banco de dados em cada requisição.

### Tempo de Expiração
Configuramos o tempo de expiração no arquivo `backend/src/auth/auth.module.ts`:
```typescript
JwtModule.register({
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: '2h' }, // Expira em 2 horas
})
```
- **Curto Prazo (ex: 1h, 2h):** Mais seguro. Se um token for roubado, ele perderá a validade rapidamente.
- **Longo Prazo (ex: 7d, 30d):** Mais conveniente para o usuário, mas aumenta o risco em caso de roubo do token.

### Como dar manutenção
1. **Alterar Expiração:** Basta modificar o valor de `expiresIn` no `auth.module.ts`.
2. **Alterar Chave Secreta:** Mude a variável `JWT_SECRET` no seu arquivo `.env`. Isso invalidará todos os tokens ativos imediatamente, forçando todos os usuários a logarem novamente (útil em caso de vazamento).

## 4. CORS (Cross-Origin Resource Sharing)
### O que é?
O CORS é um mecanismo de segurança dos navegadores que impede que um site (ex: `malicioso.com`) faça requisições para a sua API (ex: `api.seu-projeto.com`) sem permissão.

### Como configurar corretamente
No arquivo `backend/src/main.ts`, usamos `app.enableCors()`.

**Configuração para Produção (Segura):**
```typescript
app.enableCors({
  origin: 'https://seu-frontend-oficial.com', // Apenas este site pode acessar a API
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
});
```

**Configuração para Desenvolvimento (Atual):**
```typescript
app.enableCors(); // Permite qualquer origem (CUIDADO em produção)
```

## 5. Validação de Dados
No backend, usamos `class-validator` e `ValidationPipe`. Isso garante que:
- O email seja um email válido.
- A senha tenha um tamanho mínimo.
- Campos extras não permitidos sejam ignorados.

---
> [!TIP]
> Segurança é um processo contínuo. Mantenha suas dependências atualizadas com `npm audit` regularmente.
