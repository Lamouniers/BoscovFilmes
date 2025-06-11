# BoscovFilmes
Projeto referente a matéria de Desenvolvimento de aplicações web II. O projeto foi desenvolvido utilizando Node.js no back-end, Next.js no front-end e PostgreSQL como banco de dados relacional.

## Funcionalidades

- Cadastro de usuários.
- Autenticação de usuários (login/logout).
- Listagem de filmes.
- Criação, edição e exclusão de filmes (restrito a administradores).
- Upload de imagens (poster dos filmes).
- Integração com Swagger para documentação da API.

---

## Tecnologias Utilizadas

### Back-end:
- **Node.js**
- **Express**
- **PostgreSQL** (via Prisma ORM)
- **Swagger** (para documentação da API)

### Front-end:
- **Next.js**
- **SASS** (para estilização)
- **Axios** (para requisições HTTP)
- **Lucide-react** (biblioteca de ícones)

---

## Instalação

### Pré-requisitos:
- **Node.js** (versão 16 ou superior)
- **PostgreSQL** (instalado e configurado)

### Passos:
1. Clone o repositório:
   git clone https://github.com/seu-usuario/BoscovFilmes.git

2. Instale as dependências do back-end:
    cd backend
    npm install

3. Instale as dependências do front-end:
    cd ../frontend
    npm install

4. Configure o banco de dados:
    Crie um banco de dados PostgreSQL.
    Atualize o arquivo .env no diretório backend com as credenciais do banco de dados:

    DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
    JWT_SECRET=sua_chave_secreta

5. Execute as migrações do Prisma:
    cd backend
    npx prisma migrate dev

## Como executar
1. Inicie o servidor:
    cd backend
    npm run dev

    cd frontend
    npm run dev

2. Acesse a documentação da API no Swagger:
    URL: http://localhost:3001/api-docs

---

## Estrutura do Projeto
- Back-end:
    controllers: Contém os controladores das rotas.
    services: Contém a lógica de negócio.
    middlewares: Contém os middlewares (ex.: autenticação, validação).
    prisma: Configuração do ORM Prisma.

- Front-end:
    pages: Contém as páginas do Next.js.
    components: Contém os componentes reutilizáveis.
    styles: Contém os arquivos de estilização (SASS).