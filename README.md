# 🤖 Interview AI — API

API REST para gerenciamento de usuários e entrevistas guiadas por inteligência artificial.

---

## 🚀 Tecnologias

- **NestJS** — framework principal
- **JWT próprio** — autenticação sem dependências externas
- **HMAC SHA256** — assinatura dos tokens

---

## 🔐 Autenticação

A API usa **JWT Bearer Token**. Todas as rotas exigem o header abaixo, exceto `/auth/login`.

O token é gerado no login e expira conforme a variável `JWT_EXPIRES_IN`.

---

## ⚙️ Variáveis de Ambiente

```env
JWT_SECRET=sua_chave_secreta
JWT_EXPIRES_IN=3600        # tempo em segundos
```

---

## 📌 Rotas

### Auth

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| POST | `/auth/login` | ❌ | Autentica e retorna o token |

### Usuários

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| POST | `/users` | ❌ | Cria um novo usuário |
| GET | `/users/:id` | ✅ | Retorna dados do usuário |
| PUT | `/users/:id` | ✅ | Atualiza dados do usuário |
| DELETE | `/users/:id` | ✅ | Remove um usuário |

### Entrevistas

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| POST | `/interviews` | ✅ | Inicia uma nova entrevista guiada |
| GET | `/interviews` | ✅ | Lista entrevistas do usuário |
| GET | `/interviews/:id` | ✅ | Retorna detalhes de uma entrevista |
| POST | `/interviews/:id/answer` | ✅ | Envia resposta para a IA |
| GET | `/interviews/:id/result` | ✅ | Retorna o resultado final |

---

## 📦 Exemplo de Request

**Login**
```json
POST /auth/login
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

**Resposta**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 🛡️ Guards

Todas as rotas protegidas passam pelo `JwtGuardService`. Para liberar uma rota sem token, use o decorator `@Public()`.

```typescript
@Public()
@Post('login')
login() { ... }
```


# 🤖 Interview AI — API

API REST para gerenciamento de usuários e entrevistas guiadas por inteligência artificial.

---

## 🚀 Tecnologias

- **NestJS** — framework principal
- **JWT próprio** — autenticação sem dependências externas
- **HMAC SHA256** — assinatura dos tokens

---

## 🔐 Autenticação

A API usa **JWT Bearer Token**. Todas as rotas exigem o header abaixo, exceto `/auth/login`.

```
Authorization: Bearer <token>
```

O token é gerado no login e expira conforme a variável `JWT_EXPIRES_IN`.

---

## ⚙️ Variáveis de Ambiente

```env
JWT_SECRET=sua_chave_secreta
JWT_EXPIRES_IN=3600        # tempo em segundos
```

---

## 📌 Rotas

### Auth

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| POST | `/auth/login` | ❌ | Autentica e retorna o token |

### Usuários

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| POST | `/users` | ❌ | Cria um novo usuário |
| GET | `/users/:id` | ✅ | Retorna dados do usuário |
| PUT | `/users/:id` | ✅ | Atualiza dados do usuário |
| DELETE | `/users/:id` | ✅ | Remove um usuário |

### Entrevistas

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| POST | `/interviews` | ✅ | Inicia uma nova entrevista guiada |
| GET | `/interviews` | ✅ | Lista entrevistas do usuário |
| GET | `/interviews/:id` | ✅ | Retorna detalhes de uma entrevista |
| POST | `/interviews/:id/answer` | ✅ | Envia resposta para a IA |
| GET | `/interviews/:id/result` | ✅ | Retorna o resultado final |

---

## 🔄 Fluxo da Entrevista

```
1. POST /auth/login           → recebe o token
2. POST /interviews           → IA inicia a entrevista com a primeira pergunta
3. POST /interviews/:id/answer → usuário responde, IA retorna próxima pergunta
4. (repete o passo 3)
5. GET  /interviews/:id/result → IA retorna feedback e pontuação final
```

---

## 📦 Exemplo de Request

**Login**
```json
POST /auth/login
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

**Resposta**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 🛡️ Guards

Todas as rotas protegidas passam pelo `JwtGuardService`. Para liberar uma rota sem token, use o decorator `@Public()`.

```typescript
@Public()
@Post('login')
login() { ... }
```