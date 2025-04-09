# 💸 Bytebank

Gerencie suas transações financeiras com praticidade! Aplicação desenvolvida como parte do Tech Challenge (Postech - Front-End) utilizando tecnologias modernas e foco em acessibilidade, componentização e boas práticas de desenvolvimento.

---

## 🚀 Stack utilizada

- [**Next.js (App Router)**](https://nextjs.org/docs/app) – Framework React fullstack
- [**TypeScript**](https://www.typescriptlang.org/) – Tipagem estática e segurança no código
- [**Tailwind CSS**](https://tailwindcss.com/) – Estilização utilitária e responsiva
- [**Headless UI**](https://headlessui.com/) – Componentes acessíveis e sem estilo
- [**Lucide Icons**](https://lucide.dev/) – Ícones leves e modernos
- [**MongoDB Atlas**](https://www.mongodb.com/atlas/database) + [**Mongoose**](https://mongoosejs.com/) – Banco de dados NoSQL e ORM
- [**React Hook Form**](https://react-hook-form.com/) + [**Zod**](https://zod.dev/) – Manipulação e validação de formulários
- [**Storybook**](https://storybook.js.org/) – Documentação visual e testes isolados de UI
- [**Vercel**](https://vercel.com/) – Deploy automatizado
- [**GitHub**](https://github.com/) – Versionamento de código e organização de branches

---

## 📁 Estrutura de Branches

| Branch         | Finalidade                                               |
|----------------|----------------------------------------------------------|
| `main`         | Produção (deploy da aplicação principal)                 |
| `dev`          | Desenvolvimento principal                                |
| `storybook`    | Deploy da documentação de componentes com Storybook      |
| `feature/*`    | Features específicas isoladas (ex: `feature/create-user`)|

---

## ✨ Funcionalidades

- Visualização do saldo atual
- Listagem de transações
- Criação de novas transações
- Edição e exclusão
- Interface responsiva
- Validação com Zod
- Acessibilidade com Headless UI
- Documentação visual via Storybook

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

Crie um arquivo `.env.local` com a URL do MongoDB Atlas

```bash
touch .env.local
```

Adicione a variável de ambiente no arquivo `.env.local`

```bash
# Substitua <user> e <password> pelos dados do seu banco de dados
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/bytebank
```

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

## 👥 Autor
<img style="border-radius: 20%;" src="https://avatars1.githubusercontent.com/u/52840078?s=400&u=67bc81db89b5abf12cf592e0c610426afd3a02f4&v=4" width="120px;" alt="autor"/><br>
**Brendhon Moreira**

[![Linkedin Badge](https://img.shields.io/badge/-Brendhon-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/brendhon-moreira)](https://www.linkedin.com/in/brendhon-moreira)
[![Gmail Badge](https://img.shields.io/badge/-brendhon.e.c.m@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:brendhon.e.c.m@gmail.com)](mailto:brendhon.e.c.m@gmail.com)
---