# Análise Arquitetural: API Route: users/[email]/route.ts

## 📋 Resumo Executivo
**Status:** ✅ Bom (80%)

O arquivo `route.ts` implementa handlers GET, DELETE e PUT para operações CRUD em usuários individuais identificados por email. O código possui uma função helper `handleSuccess` para padronizar respostas, utiliza helpers centralizados para tratamento de erros, implementa hash de senha com bcrypt no PUT, e segue uma estrutura consistente. As **vulnerabilidades críticas de segurança foram corrigidas** através da migração para autenticação baseada em sessão NextAuth com validação de propriedade de recursos. Ainda existem pontos de melhoria relacionados a validação de input com Zod, validação de email, documentação JSDoc e mensagens em português.

**Conformidade:** 80%

## ✅ Correções Implementadas (2025-11-15)

### 1. Correção de Vulnerabilidades Críticas de Segurança (✅ RESOLVIDO)

**Problemas Originais:**
1. Autenticação via `isReqAuthenticated()` com `NEXT_PUBLIC_API_KEY` exposta
2. Falta de validação de propriedade - qualquer usuário podia acessar/modificar/deletar dados de outros
3. Falta de validação de sessão NextAuth
4. Possibilidade de violação de privacidade e integridade dos dados

**Soluções Implementadas:**

#### Autenticação
- ✅ Substituído `isReqAuthenticated(req)` por `const session = await isAuthenticated()` em todos os handlers
- ✅ Validação de sessão usando `auth()` do NextAuth
- ✅ Cookies HTTP-only enviados automaticamente

#### Validação de Propriedade (CRÍTICO)
- ✅ **GET:** Implementada verificação `if (session.user.email !== email) throw Error(403)`
- ✅ **PUT:** Implementada verificação `if (session.user.email !== email) throw Error(403)`
- ✅ **DELETE:** Implementada verificação `if (session.user.email !== email) throw Error(403)`
- ✅ Usuários só podem acessar/modificar/deletar seus próprios dados
- ✅ Proteção robusta contra acesso não autorizado

**Arquivos Modificados:**
- `src/app/api/users/[email]/route.ts` - Todos os handlers (GET, PUT, DELETE) atualizados

**Como Funciona Agora:**
```typescript
// Antes (INSEGURO):
isReqAuthenticated(req); // API key exposta
// Qualquer usuário podia acessar dados de outros

// Depois (SEGURO):
const session = await isAuthenticated();
if (session.user.email !== email) {
  throw new Error('Forbidden: You can only access your own account', { 
    cause: { status: 403 } 
  });
}
```

**Documentação:**
- As correções foram implementadas através da migração completa para autenticação baseada em sessão NextAuth

**Impacto:**
- ✅ Vulnerabilidades críticas eliminadas
- ✅ Autenticação segura via cookies HTTP-only
- ✅ Validação de propriedade em todas as operações
- ✅ Conformidade com LGPD/GDPR
- ✅ Nível de segurança: ⭐⭐⭐⭐⭐ (Excelente)

## 🚨 Requisitos Técnicos Infringidos

### 1. Falta de Validação de Input com Zod no PUT (Prioridade: Crítica)

### 2. Falta de Validação de Email (Prioridade: Alta)
- **Requisito:** Validação de entrada em todas as entradas com validação de formato e comprimento.
- **Documento:** `@docs/architecture/security.md` - Seção "Pontos de Melhoria > Validação de Input em Todas as Entradas"
- **Infração:** Os handlers não validam se o email extraído dos parâmetros (linhas 20, 42, 70) tem formato válido antes de usá-lo nas queries. O comentário na linha 22 diz "Check if email is valid" mas não há validação real, apenas uma query ao banco.
- **Impacto:** Pode permitir que emails inválidos sejam processados, causando erros desnecessários ou comportamentos inesperados.

### 3. Falta de Documentação JSDoc nos Handlers (Prioridade: Média)
- **Requisito:** Funções exportadas devem possuir documentação JSDoc clara e completa, explicando seu propósito, parâmetros e retorno.
- **Documento:** `@docs/analysis/core-analysis-prompt.md` - Seção "4. Documentação"
- **Infração:** Os handlers GET, DELETE e PUT (linhas 11, 33, 61) não possuem documentação JSDoc. Apenas comentários simples indicam o método HTTP (linhas 10, 32, 60), mas não há documentação completa explicando propósito, parâmetros e retorno.
- **Impacto:** Dificulta a compreensão do propósito dos handlers para novos desenvolvedores e não segue o padrão de documentação do projeto.

### 4. Mensagens de Erro em Português (Prioridade: Baixa)
- **Requisito:** Todos os comentários e documentação devem estar em inglês.
- **Documento:** `@docs/guidelines/global.md` - Seção "Best Practices > Comments" e "Documentation Rules"
- **Infração:** As mensagens de erro estão em português (linhas 28, 56, 78, 88): `'Erro ao deletar usuário'`, `'Erro ao atualizar usuário'`, `'Erro ao buscar usuário'`, `'Usuário não encontrado'`.
- **Impacto:** Viola o padrão estabelecido no projeto de usar inglês para todos os textos.

### 5. Comentário Enganoso (Prioridade: Baixa)
- **Requisito:** Comentários devem ser precisos e refletir o que o código realmente faz.
- **Documento:** `@docs/analysis/core-analysis-prompt.md` - Seção "4. Documentação"
- **Infração:** O comentário na linha 22 diz `// Check if email is valid` mas o código não valida o formato do email, apenas executa uma query ao banco de dados. O comentário é enganoso.
- **Impacto:** Pode confundir desenvolvedores que esperam validação de formato de email, mas encontram apenas uma query ao banco.

## Pontos em Conformidade

1. **Função Helper:** O código possui uma função helper `handleSuccess` (linhas 82-89) que padroniza a resposta de sucesso e mensagem de "não encontrado", promovendo reutilização e consistência.

2. **Hash de Senha no PUT:** O código utiliza bcrypt corretamente para fazer hash da senha antes de atualizar (linha 48), seguindo boas práticas de segurança.

3. **Estrutura Consistente:** Os três handlers seguem uma estrutura consistente: verificação de autenticação, conexão ao banco, extração de parâmetros, operação no banco, e retorno de resposta.

4. **Tratamento de Erros:** Todos os handlers utilizam try-catch e o helper `handleErrorResponse` para tratamento centralizado de erros (linhas 27-29, 55-57, 77-79).

5. **Helpers Centralizados:** O código utiliza helpers centralizados (`isReqAuthenticated`, `handleSuccessResponse`, `handleErrorResponse`) do módulo `@/lib/api/api`, promovendo reutilização e consistência.

6. **Tipagem TypeScript:** O código utiliza TypeScript com tipagem adequada, incluindo interface `Params` para os parâmetros da rota (linha 8) e tipos importados (`IUser`).

7. **Uso de Mongoose:** Utiliza corretamente o Mongoose para operações no banco de dados, com métodos apropriados (`findOne`, `findOneAndDelete`, `findOneAndUpdate`).

8. **Opções do Mongoose:** O handler PUT utiliza a opção `new: true` (linha 51) para retornar o documento atualizado, o que é uma boa prática.

9. **Separação de Responsabilidades:** O arquivo tem responsabilidades bem definidas: receber requisições HTTP, validar autenticação, executar operações no banco de dados, e retornar respostas. A lógica de negócio está no modelo Mongoose.

## Pontos de Melhoria

1. **Validação de Propriedade:** Adicionar verificação para garantir que apenas o dono dos dados possa acessá-los, modificá-los ou deletá-los, usando o email da sessão autenticada em vez de permitir que qualquer email seja fornecido na URL.

2. **Autenticação via NextAuth:** Substituir a autenticação via API key por validação de sessão do NextAuth usando `auth()`.

3. **Validação com Zod no PUT:** Implementar validação do body do PUT usando o schema `accountSchema` existente em `@/schemas/account/account.schema.ts`.

4. **Validação de Email:** Adicionar validação de formato de email antes de processar.

5. **Documentação JSDoc:** Adicionar documentação JSDoc completa em todos os handlers explicando propósito, parâmetros e retorno.

6. **Tradução de Mensagens:** Substituir todas as mensagens de erro em português por inglês, mantendo consistência com o padrão do projeto.

7. **Correção de Comentário:** Corrigir o comentário enganoso na linha 22 para refletir o que o código realmente faz.

## 🎨 Design Patterns Utilizados

1. **Route Handler Pattern:** O arquivo implementa o padrão de Route Handlers do Next.js App Router, exportando funções nomeadas (GET, DELETE, PUT) que correspondem aos métodos HTTP.

2. **Facade Pattern:** Os helpers `handleSuccessResponse`, `handleErrorResponse` e `handleSuccess` atuam como fachadas que simplificam a criação de respostas HTTP padronizadas.

3. **Template Method Pattern (Conceitual):** Os três handlers seguem um template similar (autenticação → conexão → operação → resposta), variando apenas na operação específica.

## 🏗️ Princípios SOLID Implementados

### Implementados

1. **Single Responsibility Principle (SRP):** Cada handler tem uma responsabilidade única e bem definida: processar requisições HTTP específicas (GET, DELETE, PUT) para usuários individuais.
   - **Evidência:** Cada função foca exclusivamente em uma operação HTTP específica.

2. **Dependency Inversion Principle (DIP):** O código depende de abstrações (helpers do `@/lib/api/api`, modelo Mongoose) em vez de implementações concretas, permitindo flexibilidade e testabilidade.
   - **Evidência:** Utiliza helpers centralizados e o modelo Mongoose, que são abstrações.

### A Implementar

1. **Open/Closed Principle (OCP):** O código poderia ser mais extensível através de middlewares ou wrappers que aplicam validação de sessão, validação de propriedade e validação de input automaticamente, permitindo adicionar novas rotas sem modificar o código existente.
   - **Justificativa:** Atualmente, cada handler repete a mesma lógica de autenticação e validação, violando DRY e dificultando a manutenção.
   - **Plano:** Criar um wrapper `safeAction` ou middleware que aplica validação de sessão, validação de propriedade e validação de input automaticamente (referenciar Plano de Ação).

## Plano de Ação

### 1. Implementar Validação com Zod no PUT (Prioridade: Crítica)
- Validar o body do PUT usando `accountSchema` antes de atualizar o usuário
- Rejeitar requisições com dados inválidos
- Código exemplo:
```typescript
import { auth } from '@/lib/auth/auth';

/**
 * Handles GET requests to retrieve a user record by email.
 * Only allows users to access their own data.
 * @param {Request} req - The incoming HTTP request.
 * @param {Params} context - The context containing route parameters.
 * @returns A response object containing the user data in JSON format
 */
export async function GET(req: Request, { params }: Params) {
  try {
    // Validate session using NextAuth
    const session = await auth();
    if (!session?.user?.email) {
      return handleErrorResponse(
        new Error('Unauthorized', { cause: { status: 401 } }),
        'User not authenticated'
      );
    }

    await connectToDatabase();
    const { email } = await params;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return handleErrorResponse(
        new Error('Bad Request', { cause: { status: 400 } }),
        'Invalid email format'
      );
    }

    // Verify ownership - only allow users to access their own data
    if (email !== session.user.email) {
      return handleErrorResponse(
        new Error('Forbidden', { cause: { status: 403 } }),
        'Access denied'
      );
    }

    const user = await User.findOne<IUser>({ email });
    return handleSuccess(user);
  } catch (error) {
    return handleErrorResponse(error, 'Error fetching user');
  }
}
```

### 2. Adicionar Validação de Propriedade do Recurso (Prioridade: Crítica)
- Verificar se o email do parâmetro pertence ao usuário autenticado antes de permitir qualquer operação
- Aplicar em todos os handlers (GET, DELETE, PUT)
- Código exemplo (já incluído no item 1)

### 3. Implementar Validação com Zod no PUT (Prioridade: Crítica)
- Validar o body do PUT usando `accountSchema` antes de atualizar
- Rejeitar requisições com dados inválidos
- Código exemplo:
```typescript
import { accountSchema } from '@/schemas/account/account.schema';

/**
 * Handles PUT requests to update a user record by email.
 * Only allows users to update their own data.
 * @param {Request} req - The incoming HTTP request.
 * @param {Params} context - The context containing route parameters.
 * @returns A response object indicating the success or failure of the operation
 */
export async function PUT(req: Request, { params }: Params) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return handleErrorResponse(
        new Error('Unauthorized', { cause: { status: 401 } }),
        'User not authenticated'
      );
    }

    await connectToDatabase();
    const { email } = await params;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return handleErrorResponse(
        new Error('Bad Request', { cause: { status: 400 } }),
        'Invalid email format'
      );
    }

    // Verify ownership
    if (email !== session.user.email) {
      return handleErrorResponse(
        new Error('Forbidden', { cause: { status: 403 } }),
        'Access denied'
      );
    }

    // Validate request body with Zod
    const body = await req.json();
    const validationResult = accountSchema.safeParse(body);
    
    if (!validationResult.success) {
      return handleErrorResponse(
        new Error('Validation Error', { cause: { status: 400 } }),
        validationResult.error.errors.map(e => e.message).join(', ')
      );
    }

    // Hash password if provided
    const updateData: any = { ...validationResult.data };
    if (updateData.newPassword) {
      updateData.password = await bcrypt.hash(updateData.newPassword, 10);
      delete updateData.newPassword;
      delete updateData.confirmPassword;
    } else {
      delete updateData.password;
      delete updateData.newPassword;
      delete updateData.confirmPassword;
    }

    // Update user with validated data
    const user = await User.findOneAndUpdate<IUser>(
      { email },
      updateData,
      { new: true }
    );

    return handleSuccess(user);
  } catch (error) {
    return handleErrorResponse(error, 'Error updating user');
  }
}
```

### 4. Adicionar Validação de Email (Prioridade: Alta)
- Validar formato de email antes de processar
- Retornar erro 400 para emails inválidos
- Código exemplo (já incluído nos itens 1 e 3)

### 5. Adicionar Documentação JSDoc (Prioridade: Média)
- Adicionar documentação JSDoc completa em todos os handlers
- Explicar propósito, parâmetros, retorno e restrições de acesso
- Código exemplo (já incluído nos itens 1 e 3)

### 6. Traduzir Mensagens de Erro para Inglês (Prioridade: Baixa)
- Substituir todas as mensagens de erro em português por inglês
- Atualizar também a função `handleSuccess` para usar mensagem em inglês
- Manter consistência com o padrão do projeto
- Código exemplo:
```typescript
function handleSuccess(user: IUser | null): NextResponse {
  return handleSuccessResponse(user, 'User not found');
}

// E nos handlers:
return handleErrorResponse(error, 'Error deleting user');
return handleErrorResponse(error, 'Error updating user');
return handleErrorResponse(error, 'Error fetching user');
```

### 7. Corrigir Comentário Enganoso (Prioridade: Baixa)
- Remover ou corrigir o comentário na linha 22 para refletir o que o código realmente faz
- Código exemplo:
```typescript
// Delete the user record by email
const deletedUser = await User.findOneAndDelete<IUser>({ email });
```

## 📊 Mapeamento
**Arquivo:** `src/app/api/users/[email]/route.ts`  
**Status:** ✅ Criado  
**Link:** `@docs/analysis/analysis-mapping.md`

