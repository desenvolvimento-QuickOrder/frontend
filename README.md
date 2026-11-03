# 🍽️ QuickOrder — Front-end

Front-end da aplicação web de gestão de restaurantes.

O sistema permite o gerenciamento de mesas, comandas, pedidos, pratos, pagamentos e funcionalidades administrativas.

## 🛠️ Tecnologias

* React.js
* TypeScript
* Tailwind CSS

## 🚀 Execução local

```bash
git clone <URL_DO_REPOSITORIO>
cd frontend
npm install
npm run dev
```

Crie o arquivo `.env` utilizando o `.env.example` como referência.

## 🌿 Branches

A `main` contém apenas versões estáveis.

Para iniciar uma nova tarefa:

```bash
git checkout main
git pull origin main
git checkout -b feature/nome-da-tarefa
```

Exemplos:

```text
feature/login
feature/table-management
feature/order-screen
feature/payment-screen
```

### Tipos de branch

* `feature/` — nova funcionalidade
* `fix/` — correção de bug
* `refactor/` — refatoração
* `docs/` — documentação

Ao finalizar:

```bash
git add .
git commit -m "feat: add table management"
git push origin feature/table-management
```

Depois, abra um **Pull Request para `main`**.

## 📝 Commits

Utilize:

```text
tipo: descrição
```

Tipos principais:

* `feat` — nova funcionalidade
* `fix` — correção
* `refactor` — refatoração
* `test` — testes
* `docs` — documentação
* `style` — formatação
* `build` — estrutura/arquitetura

Exemplo:

```text
feat: add table management
```

## 📂 Estrutura

```text
src/
├── components/
├── pages/
├── services/
├── hooks/
├── contexts/
└── types/
```

### ⚠️ Regras

* Não realizar `push` diretamente na `main`.
* Não versionar `.env`.
* Uma branch deve representar uma tarefa.
* Antes do PR, teste a funcionalidade localmente.
* O PR deve ser revisado antes do merge.
