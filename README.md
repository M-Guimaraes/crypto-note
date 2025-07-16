# 🪙 Crypto Note

**Crypto Note** é um projeto pessoal de controle de transações em criptomoedas. Ele permite registrar, visualizar, editar e deletar compras de cripto realizadas por um usuário autenticado. O backend é desenvolvido em **Node.js + TypeScript**, seguindo princípios de **Clean Architecture** e **SOLID**, com autenticação baseada em **JWT + Refresh Token** e persistência com **Prisma ORM**.

---

## 📁 Estrutura do Projeto

```
src/
├── application/        # Casos de uso (Use Cases)
├── container/          # InversifyJS - Injeção de dependências
├── domain/             # Entidades e interfaces da camada de domínio
├── infra/              # Implementações (ex: Prisma)
├── interfaces/         # Camada HTTP (controllers, rotas, middlewares)
└── main.ts             # Arquivo principal de bootstrap da aplicação
```

---

## 🚀 Como Rodar o Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/crypto-note.git
cd crypto-note
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz:

```env
DATABASE_URL="file:./dev.db"
ACCESS_TOKEN_SECRET=sua_chave_secreta_access
REFRESH_TOKEN_SECRET=sua_chave_secreta_refresh
```

### 4. Gerar cliente Prisma e banco de dados

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Rodar o servidor

```bash
npm run dev
```

---

## 🧪 Testes

```bash
npm run test
```

---

## 🔐 Segurança

- Autenticação via JWT (Access Token e Refresh Token)
- Tokens de refresh são armazenados em **cookies HttpOnly**
- Hash de senha com `bcrypt`
- Apenas o dono da transação pode manipulá-la
- Middleware de autenticação protegendo as rotas privadas

---

## 📬 Endpoints Principais

### Autenticação

| Método | Rota          | Descrição                      |
| ------ | ------------- | ------------------------------ |
| POST   | /api/register | Criação de usuário             |
| POST   | /api/login    | Login com JWT + refresh cookie |
| POST   | /api/refresh  | Gera novo access token         |
| POST   | /api/logout   | Revoga refresh token           |

### Transações

| Método | Rota                  | Descrição                        |
| ------ | --------------------- | -------------------------------- |
| GET    | /api/transactions     | Lista transações do usuário      |
| POST   | /api/transactions     | Cria uma nova transação          |
| PUT    | /api/transactions/:id | Atualiza uma transação existente |
| DELETE | /api/transactions/:id | Deleta uma transação existente   |

---

## 🧱 Tecnologias Utilizadas

- **Node.js**
- **TypeScript**
- **Prisma**
- **Express**
- **JWT + Cookies**
- **bcrypt**
- **InversifyJS**
- **SQLite (modo local)**

---

## 🧠 Conceitos Utilizados

- **Clean Architecture**
- **SOLID Principles**
- **Inversão de Dependência (IoC)**
- **Domain-Driven Design (DDD)**

---

## 📱 Próximos Passos

- [ ] Criar aplicativo iOS com React Native
- [ ] Implementar autenticação 2FA
- [ ] Exportar relatórios mensais/anuais em PDF
- [ ] Dashboards gráficos com estatísticas

---

## ✍️ Autor

**Marcelo Guimarães**  
📧 [marceloguimaraes@outlook.com.br](mailto:marceloguimaraes@outlook.com.br)

---

## 📄 Licença

MIT License. Use it freely for educational or personal use.
