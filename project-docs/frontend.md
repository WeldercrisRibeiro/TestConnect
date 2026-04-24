# Arquitetura Frontend

O frontend do **ConnectDB** é uma Single Page Application (SPA) moderna construída com **React** e **Vite**.

## Conceitos Fundamentais

### 1. React & Vite
- **Vite**: Um build tool extremamente rápido que melhora a experiência de desenvolvimento.
- **React**: Biblioteca para construção de interfaces baseadas em componentes.
- **Hooks**: Utilizamos `useState` para estado local e `useEffect` para chamadas de API.

### 2. Integração com API (Axios)
A comunicação com o backend é feita através da biblioteca **Axios**, centralizada na pasta `src/services/api.js`.
- Isso facilita a manutenção da URL base e dos headers de autenticação.

### 3. Design & Estilização
O projeto utiliza um design "Glassmorphism" premium, com:
- **Transparências**: Efeito de vidro desfocado.
- **Gradientes**: Cores vibrantes e harmoniosas.
- **Responsividade**: Layout que se adapta a diferentes tamanhos de tela.

## Estrutura de Pastas

```text
frontend/
├── src/
│   ├── components/     # Componentes reutilizáveis (botões, cards)
│   ├── pages/          # Telas principais (Login, Users, etc)
│   ├── services/       # Configuração do Axios e chamadas de API
│   ├── App.jsx         # Componente raiz e rotas
│   └── main.jsx        # Ponto de entrada do React
```

## Consumindo a API

Exemplo de como buscamos dados no frontend:

```javascript
const fetchUsers = async () => {
  try {
    const response = await userService.getAll();
    setUsers(response.data);
  } catch (err) {
    console.error("Erro ao buscar usuários", err);
  }
};
```

## Como Rodar

1. No diretório `frontend`, instale as dependências: `npm install`.
2. Inicie o servidor de desenvolvimento: `npm run dev`.
3. Acesse `http://localhost:5173`.

---

[Voltar para o Início](index.md)
