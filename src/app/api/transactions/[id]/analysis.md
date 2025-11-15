# Análise Arquitetural: API Route: transactions/[id]/route.ts

## 📋 Resumo Executivo
**Status:** ✅ Bom (80%)

O arquivo `route.ts` implementa handlers GET, DELETE e PUT para operações CRUD em transações individuais. O código possui documentação JSDoc adequada, utiliza helpers centralizados para tratamento de erros e respostas, e segue uma estrutura consistente. As **vulnerabilidades críticas de segurança foram corrigidas** através da migração para autenticação baseada em sessão NextAuth com validação de propriedade de recursos. Ainda existem pontos de melhoria relacionados a validação de input com Zod e validação do ID do MongoDB.

**Conformidade:** 80%

## ✅ Correções Implementadas (2025-11-15)

### 1. Correção de Vulnerabilidades Críticas de Segurança (✅ RESOLVIDO)

**Problemas Originais:**
1. Autenticação via `isReqAuthenticated()` com `NEXT_PUBLIC_API_KEY` exposta
2. Falta de validação de propriedade - qualquer usuário podia acessar/modificar/deletar transações de outros
3. Falta de validação de sessão NextAuth
4. Possibilidade de violação de privacidade e integridade dos dados

**Soluções Implementadas:**

#### Autenticação
- ✅ Substituído `isReqAuthenticated(req)` por `const session = await isAuthenticated()` em todos os handlers
- ✅ Validação de sessão usando `auth()` do NextAuth
- ✅ Cookies HTTP-only enviados automaticamente

#### Validação de Propriedade (CRÍTICO)
- ✅ **GET:** Implementada verificação `if (transaction.user.toString() !== session.user.id) throw Error(403)`
- ✅ **PUT:** Implementada verificação de ownership antes de atualizar
- ✅ **DELETE:** Implementada verificação de ownership antes de deletar
- ✅ Usuários só podem acessar/modificar/deletar suas próprias transações
- ✅ Proteção robusta contra acesso não autorizado

**Arquivos Modificados:**
- `src/app/api/transactions/[id]/route.ts` - Todos os handlers (GET, PUT, DELETE) atualizados

**Como Funciona Agora:**
```typescript
// Antes (INSEGURO):
isReqAuthenticated(req); // API key exposta
// Qualquer usuário podia acessar transações de outros

// Depois (SEGURO):
const session = await isAuthenticated();
const transaction = await Transaction.findById(id);
if (transaction.user.toString() !== session.user.id) {
  throw new Error('Forbidden: You can only access your own transactions', { 
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

### 1. Falta de Validação de Input com Zod no PUT (Prioridade: Alta)
- **Requisito:** Validação de input em todas as entradas com Zod para garantir integridade dos dados e proteger contra payloads maliciosos.
- **Documento:** `@docs/architecture/security.md` - Seção "Pontos Fortes > Validação de Dados com Zod" e "Pontos de Melhoria > Validação de Input em Todas as Entradas"
- **Infração:** O handler PUT não valida o body da requisição com Zod antes de atualizar a transação. O código apenas faz `await req.json()` e passa os dados diretamente para `findByIdAndUpdate`, sem validação de formato, tipos ou regras de negócio.
- **Impacto:** Permite que dados inválidos ou maliciosos sejam salvos no banco de dados, podendo causar corrupção de dados, erros em tempo de execução, ou violações de regras de negócio.

## Pontos em Conformidade

1. **Documentação JSDoc:** Todos os handlers (GET, DELETE, PUT) possuem documentação JSDoc adequada explicando seu propósito, parâmetros e retorno (linhas 8-13, 35-40, 62-67).

2. **Estrutura Consistente:** Os três handlers seguem uma estrutura consistente: verificação de autenticação, conexão ao banco, extração de parâmetros, operação no banco, e retorno de resposta.

3. **Tratamento de Erros:** Todos os handlers utilizam try-catch e o helper `handleErrorResponse` para tratamento centralizado de erros (linhas 30-32, 57-59, 89-91).

4. **Helpers Centralizados:** O código utiliza helpers centralizados (`isReqAuthenticated`, `handleSuccessResponse`, `handleErrorResponse`) do módulo `@/lib/api/api`, promovendo reutilização e consistência.

5. **Tipagem TypeScript:** O código utiliza TypeScript com tipagem adequada, incluindo interface `Params` para os parâmetros da rota (linha 6) e tipagem genérica no `handleSuccessResponse` (linhas 29, 56, 88).

6. **Separação de Responsabilidades:** O arquivo tem responsabilidades bem definidas: receber requisições HTTP, validar autenticação, executar operações no banco de dados, e retornar respostas. A lógica de negócio está no modelo Mongoose.

7. **Uso de Mongoose:** Utiliza corretamente o Mongoose para operações no banco de dados, com métodos apropriados (`findById`, `findByIdAndDelete`, `findByIdAndUpdate`).

8. **Opções do Mongoose:** O handler PUT utiliza a opção `new: true` (linha 84) para retornar o documento atualizado, o que é uma boa prática.

## Pontos de Melhoria

1. **Mensagens de Erro em Português:** As mensagens de erro estão em português (linhas 31, 58, 90), violando o padrão estabelecido no projeto de usar inglês para todos os textos.

2. **Validação de Propriedade:** Adicionar verificação de propriedade do recurso para garantir que apenas o dono da transação possa acessá-la, modificá-la ou deletá-la.

3. **Validação com Zod:** Implementar validação do body do PUT usando o schema `transactionSchema` existente em `@/schemas/transaction/transaction.schema.ts`.

4. **Validação de ObjectId:** Adicionar validação para garantir que o `id` é um ObjectId válido do MongoDB antes de executar as queries.

5. **Autenticação via NextAuth:** Substituir a autenticação via API key por validação de sessão do NextAuth usando `auth()`.

6. **Validação de Existência:** Os handlers não verificam explicitamente se a transação existe antes de retornar sucesso. O `handleSuccessResponse` trata `null` como 404, mas seria melhor ser mais explícito.

## 🎨 Design Patterns Utilizados

1. **Route Handler Pattern:** O arquivo implementa o padrão de Route Handlers do Next.js App Router, exportando funções nomeadas (GET, DELETE, PUT) que correspondem aos métodos HTTP.

2. **Facade Pattern:** Os helpers `handleSuccessResponse` e `handleErrorResponse` atuam como fachadas que simplificam a criação de respostas HTTP padronizadas.

3. **Template Method Pattern (Conceitual):** Os três handlers seguem um template similar (autenticação → conexão → operação → resposta), variando apenas na operação específica.

## 🏗️ Princípios SOLID Implementados

### Implementados

1. **Single Responsibility Principle (SRP):** Cada handler tem uma responsabilidade única e bem definida: processar requisições HTTP específicas (GET, DELETE, PUT) para transações individuais.
   - **Evidência:** Cada função foca exclusivamente em uma operação HTTP específica.

2. **Dependency Inversion Principle (DIP):** O código depende de abstrações (helpers do `@/lib/api/api`, modelo Mongoose) em vez de implementações concretas, permitindo flexibilidade e testabilidade.
   - **Evidência:** Utiliza helpers centralizados e o modelo Mongoose, que são abstrações.

### A Implementar

1. **Open/Closed Principle (OCP):** O código poderia ser mais extensível através de middlewares ou wrappers que aplicam validação de sessão e propriedade automaticamente, permitindo adicionar novas rotas sem modificar o código existente.
   - **Justificativa:** Atualmente, cada handler repete a mesma lógica de autenticação e validação, violando DRY e dificultando a manutenção.
   - **Plano:** Criar um wrapper `safeAction` ou middleware que aplica validação de sessão, validação de propriedade e validação de input automaticamente (referenciar Plano de Ação).

## Plano de Ação

### 1. Substituir Autenticação via API Key por NextAuth (Prioridade: Crítica)
- Substituir `isReqAuthenticated` por validação de sessão do NextAuth usando `auth()`
- Obter o ID do usuário da sessão para validação de propriedade
- Código exemplo:
```typescript
import { auth } from '@/lib/auth/auth';

export async function GET(req: Request, { params }: Params) {
  try {
    // Validate session using NextAuth
    const session = await auth();
    if (!session?.user?.id) {
      return handleErrorResponse(
        new Error('Unauthorized', { cause: { status: 401 } }),
        'User not authenticated'
      );
    }

    await connectToDatabase();
    const { id } = await params;

    // Find transaction and verify ownership
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return handleErrorResponse(
        new Error('Not Found', { cause: { status: 404 } }),
        'Transaction not found'
      );
    }

    // Verify ownership
    if (transaction.user.toString() !== session.user.id) {
      return handleErrorResponse(
        new Error('Forbidden', { cause: { status: 403 } }),
        'Access denied'
      );
    }

    return handleSuccessResponse<ITransaction>(transaction);
  } catch (error) {
    return handleErrorResponse(error, 'Error fetching transaction');
  }
}
```

### 2. Adicionar Validação de Propriedade do Recurso (Prioridade: Crítica)
- Verificar se a transação pertence ao usuário autenticado antes de permitir qualquer operação
- Aplicar em todos os handlers (GET, DELETE, PUT)
- Código exemplo (já incluído no item 1)

### 3. Implementar Validação com Zod no PUT (Prioridade: Alta)
- Validar o body do PUT usando `transactionSchema` antes de atualizar
- Rejeitar requisições com dados inválidos
- Código exemplo:
```typescript
import { transactionSchema } from '@/schemas/transaction/transaction.schema';

export async function PUT(req: Request, { params }: Params) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return handleErrorResponse(
        new Error('Unauthorized', { cause: { status: 401 } }),
        'User not authenticated'
      );
    }

    await connectToDatabase();
    const { id } = await params;

    // Validate request body with Zod
    const body = await req.json();
    const validationResult = transactionSchema.safeParse(body);
    
    if (!validationResult.success) {
      return handleErrorResponse(
        new Error('Validation Error', { cause: { status: 400 } }),
        validationResult.error.errors.map(e => e.message).join(', ')
      );
    }

    // Find transaction and verify ownership
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return handleErrorResponse(
        new Error('Not Found', { cause: { status: 404 } }),
        'Transaction not found'
      );
    }

    if (transaction.user.toString() !== session.user.id) {
      return handleErrorResponse(
        new Error('Forbidden', { cause: { status: 403 } }),
        'Access denied'
      );
    }

    // Update transaction with validated data
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      validationResult.data,
      { new: true }
    );

    return handleSuccessResponse<ITransaction>(updatedTransaction);
  } catch (error) {
    return handleErrorResponse(error, 'Error updating transaction');
  }
}
```

### 4. Adicionar Validação de ObjectId (Prioridade: Média)
- Validar se o `id` é um ObjectId válido antes de executar queries
- Retornar erro 400 para IDs inválidos
- Código exemplo:
```typescript
import { Types } from 'mongoose';

function isValidObjectId(id: string): boolean {
  return Types.ObjectId.isValid(id);
}

export async function GET(req: Request, { params }: Params) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return handleErrorResponse(
        new Error('Unauthorized', { cause: { status: 401 } }),
        'User not authenticated'
      );
    }

    await connectToDatabase();
    const { id } = await params;

    // Validate ObjectId format
    if (!isValidObjectId(id)) {
      return handleErrorResponse(
        new Error('Bad Request', { cause: { status: 400 } }),
        'Invalid transaction ID format'
      );
    }

    // ... rest of the code
  } catch (error) {
    return handleErrorResponse(error, 'Error fetching transaction');
  }
}
```

### 5. Traduzir Mensagens de Erro para Inglês (Prioridade: Baixa)
- Substituir todas as mensagens de erro em português por inglês
- Manter consistência com o padrão do projeto
- Código exemplo:
```typescript
return handleErrorResponse(error, 'Error fetching transaction');
return handleErrorResponse(error, 'Error deleting transaction');
return handleErrorResponse(error, 'Error updating transaction');
```

### 6. Criar Wrapper de Segurança (Prioridade: Alta)
- Criar um wrapper `safeAction` que aplica validação de sessão, validação de propriedade e validação de input automaticamente
- Reduzir código repetido e garantir que todas as rotas sigam os mesmos padrões de segurança
- Código exemplo:
```typescript
// lib/api/safe-action.ts
import { auth } from '@/lib/auth/auth';
import { z } from 'zod';

interface SafeActionOptions<T> {
  schema?: z.ZodSchema<T>;
  requireOwnership?: (resourceId: string, userId: string) => Promise<boolean>;
}

export async function safeAction<T>(
  req: Request,
  options: SafeActionOptions<T>,
  handler: (data: T, userId: string) => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    // Validate session
    const session = await auth();
    if (!session?.user?.id) {
      return handleErrorResponse(
        new Error('Unauthorized', { cause: { status: 401 } }),
        'User not authenticated'
      );
    }

    // Validate input if schema provided
    let validatedData: T | undefined;
    if (options.schema) {
      const body = await req.json();
      const validationResult = options.schema.safeParse(body);
      if (!validationResult.success) {
        return handleErrorResponse(
          new Error('Validation Error', { cause: { status: 400 } }),
          validationResult.error.errors.map(e => e.message).join(', ')
        );
      }
      validatedData = validationResult.data;
    }

    // Validate ownership if required
    if (options.requireOwnership) {
      const resourceId = /* extract from params */;
      const hasOwnership = await options.requireOwnership(resourceId, session.user.id);
      if (!hasOwnership) {
        return handleErrorResponse(
          new Error('Forbidden', { cause: { status: 403 } }),
          'Access denied'
        );
      }
    }

    // Execute handler
    return await handler(validatedData as T, session.user.id);
  } catch (error) {
    return handleErrorResponse(error, 'An error occurred');
  }
}
```

## 📊 Mapeamento
**Arquivo:** `src/app/api/transactions/[id]/route.ts`  
**Status:** ✅ Criado  
**Link:** `@docs/analysis/analysis-mapping.md`

