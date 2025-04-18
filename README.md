# 💸 Bytebank

<h1 align="center">
    <img src="./public/logo.svg" width="300px;" alt="logo"/>
</h1>

Aplicação desenvolvida como parte do Tech Challenge (Postech - Front-End), que simula um site bancário simples. Permite cadastro de transações financeiras, visualização de extrato detalhado e acesso a serviços financeiros, com foco em acessibilidade, componentização e boas práticas de desenvolvimento.

**Figma:** [Bytebank](https://www.figma.com/design/E9UFSc9LUXlL88hIvIcuLd/Modelo-Fase-1---P%C3%93S-FIAP?node-id=503-4264)

---

## 🚀 Stack utilizada

- [**Next.js (App Router)**](https://nextjs.org/docs/app) – Framework React fullstack
- [**NextAuth**](https://next-auth.js.org/) – Autenticação e autorização
- [**TypeScript**](https://www.typescriptlang.org/) – Tipagem estática e segurança no código
- [**Tailwind CSS**](https://tailwindcss.com/) – Estilização utilitária e responsiva
- [**Headless UI**](https://headlessui.com/) – Componentes acessíveis e sem estilo
- [**Lucide Icons**](https://lucide.dev/) – Ícones leves e modernos
- [**MongoDB Atlas**](https://www.mongodb.com/atlas/database) + [**Mongoose**](https://mongoosejs.com/) – Banco de dados NoSQL e ORM
- [**React Hook Form**](https://react-hook-form.com/) + [**Zod**](https://zod.dev/) – Manipulação e validação de formulários
- [**Storybook**](https://storybook.js.org/) – Documentação visual
- [**Vercel**](https://vercel.com/) – Deploy automatizado

> Veja o arquivo  **[package.json](https://github.com/Brendhon/Bytebank/blob/main/package.json)**

---

## 📁 Estrutura de Branches

| Branch      | Finalidade                                          |
| ----------- | --------------------------------------------------- |
| `main`      | Produção (deploy da aplicação principal)            |
| `dev`       | Desenvolvimento principal                           |

---

### 💡 **Funcionalidades (pelas telas)**

1. **Home (Login/Cadastro)**
   - Acesso seguro à plataforma.
   - Cadastro de novos usuários com dados básicos (nome, e-mail, senha).

2. **Dashboard**
   - Visão geral do saldo disponível, entradas e saídas.
   - Cards com informações financeiras.

3. **Transações**
   - Histórico de transações.
   - Cadastro de novas transações (entrada/saída).
   - Edição e exclusão de transações.

4. **Meus Cartões**
   - Listagem de cartões cadastrados.
   - Ação para visualizar detalhes do cartão.
   - Ação para bloquear/desbloquear cartão.

5. **Configurações**
   - Configuração de dados pessoais e preferências.
   - Alteração de senha.

---

## 📦 Como rodar o projeto

### 💡 Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
**[Git](https://git-scm.com)** e **[Node.js](https://nodejs.org/en/)**.<br> 

Clone o repositório do projeto

```bash
git clone https://github.com/Brendhon/Bytebank.git
```

Acesse a pasta do projeto

```bash
cd Bytebank
```

Instale as dependências

```bash
npm install
```

### 📄 Configurando variáveis de ambiente

Crie um arquivo `.env.local` com a URL do MongoDB Atlas

```bash
touch .env.local
```

Adicione a variável de ambiente no arquivo `.env.local`

```bash
# Substitua pela sua URL do MongoDB Atlas mas mantenha o nome do banco de dados - bytebank
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/bytebank

# Secret para autenticação
NEXTAUTH_SECRET=your_secret

# URL do site
NEXTAUTH_URL=http://localhost:3000
```

No menu de perfil do usuário, também é possível acessar diretamente o Storybook e o Figma da aplicação. Para que esses links funcionem corretamente, é necessário adicionar as seguintes variáveis de ambiente no arquivo `.env.local`:

```bash
# URL do Storybook
NEXT_PUBLIC_STORYBOOK_URL=http://localhost:6006

# URL do Figma
NEXT_PUBLIC_FIGMA_URL=https://www.figma.com/file/E9UFSc9LUXlL88hIvIcuLd/Modelo-Fase-1---P%C3%93S-FIAP?node-id=503-4264
```

Certifique-se de substituir as URLs acima caso esteja utilizando endereços personalizados ou ambientes de produção.

### 🏃‍♂️ Executando o projeto

Para rodar o projeto em modo de desenvolvimento, execute o seguinte comando:

```bash
npm run dev
```

Acesse o projeto em seu navegador: [http://localhost:3000](http://localhost:3000)

### 📦 Executando o Storybook

Para rodar o Storybook, execute o seguinte comando:

```bash
npm run storybook
```

Acesse o Storybook em seu navegador: [http://localhost:6006](http://localhost:6006)

---

## 👀 Observações

- **Deploys separados na Vercel**: 
  - O projeto do **Storybook** está disponível em [https://bytebank-storybook.vercel.app/](https://bytebank-storybook.vercel.app/).
  - A aplicação web está disponível em [https://bytebank-web.vercel.app/home](https://bytebank-web.vercel.app/home).

- **Headless UI**: Utilizado para criar componentes acessíveis e sem estilo, permitindo total personalização da interface e garantindo conformidade com padrões de acessibilidade.

- **React Hook Form**: Implementado para manipulação e validação de formulários, proporcionando uma experiência de usuário fluida e intuitiva.

---

## 👥 Autor
<img style="border-radius: 20%;" src="https://avatars1.githubusercontent.com/u/52840078?s=400&u=67bc81db89b5abf12cf592e0c610426afd3a02f4&v=4" width="120px;" alt="autor"/><br>
**Brendhon Moreira**

[![Linkedin Badge](https://img.shields.io/badge/-Brendhon-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/brendhon-moreira)](https://www.linkedin.com/in/brendhon-moreira)
[![Gmail Badge](https://img.shields.io/badge/-brendhon.e.c.m@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:brendhon.e.c.m@gmail.com)](mailto:brendhon.e.c.m@gmail.com)
---