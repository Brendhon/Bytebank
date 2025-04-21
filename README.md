# 💸 Bytebank

<h1 align="center">
    <img src="./public/logo.svg" width="300px;" alt="logo"/>
</h1>

Aplicação desenvolvida como parte do Tech Challenge (Postech - Front-End), que simula um site bancário simples. Permite cadastro de transações financeiras, visualização de extrato detalhado e acesso a serviços financeiros, com foco em acessibilidade, componentização e boas práticas de desenvolvimento.

**Figma:** [Bytebank Figma](https://www.figma.com/design/E9UFSc9LUXlL88hIvIcuLd/Modelo-Fase-1---P%C3%93S-FIAP?node-id=503-4264)
**Storybook:** [Bytebank Storybook](https://bytebank-storybook.vercel.app/)
**Deploy:** [Bytebank Web](https://bytebank-web.vercel.app/)
**Vídeo de Demonstração:** [Bytebank Demo](https://bytebank-web.vercel.app/demo.pm4)

---

## 📄 Desafio Original
O documento contendo os requisitos e objetivos do desafio original da pós-tech está disponível para consulta:

📌 [**POSTECH - Front-end - Tech Challenge - Fase 1**](https://bytebank-web.vercel.app/challenge.pdf)

Esse arquivo resume o escopo funcional e visual proposto para o projeto, com base no modelo de design fornecido e funcionalidades essenciais que deveriam ser implementadas.

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

| Branch | Finalidade                               |
| ------ | ---------------------------------------- |
| `main` | Produção (deploy da aplicação principal) |
| `dev`  | Desenvolvimento principal                |

---

### 💡 **Funcionalidades (pelas telas)**

1. **Home (Login/Cadastro)**
   - Acesso seguro à plataforma.
   - Cadastro de novos usuários com dados básicos (nome, e-mail, senha).

2. **Dashboard**
   - Visão geral do saldo disponível.
   - Cards com informações financeiras.

3. **Transações**
   - Histórico de transações.
   - Cadastro de novas transações (entrada/saída).
   - Edição e exclusão de transações.

4. **Meus Cartões**  
   - Exibição de uma lista de cartões previamente cadastrados.  
   - Opção para visualizar informações detalhadas de cada cartão.  
   - Funcionalidade para bloquear ou desbloquear cartões diretamente na interface.  
   - Página projetada como exemplo de renderização no lado do servidor utilizando dados estáticos.  

5. **Configurações**
   - Configuração de dados pessoais.
   - Alteração de senha.
   - Exclusão de conta.

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

### 📄 Configuração das Variáveis de Ambiente

1. Crie um arquivo `.env.local` na raiz do projeto.

2. Adicione as seguintes variáveis de ambiente no arquivo `.env.local`:

```bash
# Substitua <user> e <password> pelas credenciais do seu MongoDB Atlas, mantendo o nome do banco de dados como "bytebank".
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/bytebank

# Chave secreta para autenticação
NEXTAUTH_SECRET=sua_chave_secreta

# URL base do site
NEXTAUTH_URL=http://localhost:3000
```

3. Para habilitar links diretos para o Storybook, Figma e Github no menu de perfil do usuário, adicione também as seguintes variáveis de ambiente:

```bash
# URL do Storybook
NEXT_PUBLIC_STORYBOOK_URL=http://localhost:6006

# URL do Figma
NEXT_PUBLIC_FIGMA_URL=https://www.figma.com/file/E9UFSc9LUXlL88hIvIcuLd/Modelo-Fase-1---P%C3%93S-FIAP?node-id=503-4264

# URL do GitHub
NEXT_PUBLIC_GITHUB_URL=https://github.com/Brendhon/Bytebank
```

4. Segurança das APIs:

Uma chave de autenticação é utilizada para proteger os endpoints da API contra acessos não autorizados. Essa chave é automaticamente incluída nas requisições realizadas pelo front-end, garantindo que apenas chamadas legítimas da aplicação possam acessar os endpoints protegidos. Isso impede que ferramentas externas, como Postman ou bots, realizem requisições diretamente à API.

Para configurar a chave de autenticação, adicione a seguinte variável de ambiente no arquivo `.env.local`:

```bash
NEXT_PUBLIC_API_KEY=sua_chave_api
```

> **🔐 Dica de segurança:**  
> Gere uma chave segura usando o comando abaixo no terminal:  
> ```bash
> openssl rand -hex 32
> ```  
> Copie o valor gerado e use como `NEXT_PUBLIC_API_KEY`.

> **⚠️ Aviso Importante:**
> Esta abordagem de segurança (utilizar uma API_KEY pública no front-end para autenticar chamadas internas) não é recomendada para aplicações em produção, pois o valor da variável pode ser exposto e facilmente acessado.
> 
> Em um ambiente de produção, recomenda-se implementar uma autenticação mais robusta, como OAuth ou JWT (JSON Web Tokens), para proteger os endpoints da API e garantir a segurança dos dados do usuário.
> 
> No entanto, por se tratar de um projeto de estudo, optou-se por esta solução simplificada para fins didáticos.

> **Nota:** Substitua as URLs acima caso esteja utilizando endereços personalizados ou ambientes de produção.

Certifique-se de salvar o arquivo após realizar as alterações.

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
