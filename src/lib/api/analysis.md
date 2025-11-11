# Análise Arquitetural: Utilitário: api.ts

## 📋 Resumo Executivo
**Status:** ⚠️ Requer Atenção (70%)

O arquivo `api.ts` apresenta funções utilitárias para manipulação de requisições e respostas em rotas de API do Next.js. O código possui documentação JSDoc adequada, utiliza TypeScript com tipagem forte (exceto em um ponto específico), e implementa funções com responsabilidades bem definidas. No entanto, existem violações críticas relacionadas à segurança (exposição de chave de API no cliente), uso de `any` em uma função, mensagens de erro em português, e falta de validação adequada de entrada.

**Conformidade:** 70%

## 🚨 Requisitos Técnicos Infringidos

### 1. Exposição de Chave de API no Cliente (Prioridade: Crítica)
- **Requisito:** Variáveis de ambiente sensíveis não devem ser expostas ao cliente. Chaves de API devem estar apenas no servidor.
- **Documento:** `@docs/architecture/security.md` - Seção "Pontos Fortes > Gerenciamento de Variáveis de Ambiente"
- **Infração:** A função `isReqAuthenticated` utiliza `process.env.NEXT_PUBLIC_API_KEY` (linha 10), que é exposta ao cliente através do prefixo `NEXT_PUBLIC_`. Chaves de API nunca devem ser acessíveis no cliente.
- **Impacto:** **CRÍTICO** - A chave de API fica exposta no código JavaScript do cliente, permitindo que qualquer pessoa possa visualizá-la e utilizá-la para fazer requisições não autorizadas. Isso viola princípios fundamentais de segurança.

### 2. Uso de `any` em Função (Prioridade: Alta)
- **Requisito:** O código é estritamente tipado, sem o uso de `any`.
- **Documento:** `@docs/guidelines/global.md` - Seção "TypeScript" e `@docs/analysis/core-analysis-prompt.md` - Seção "2. TypeScript e Tipagem"
- **Infração:** A função `handleErrorResponse` utiliza `any` como tipo do parâmetro `error` (linha 33).
- **Impacto:** Reduz a segurança de tipos, dificulta a manutenção e pode mascarar erros em tempo de compilação.

### 3. Mensagens de Erro em Português (Prioridade: Média)
- **Requisito:** Todos os comentários e documentação devem estar em inglês.
- **Documento:** `@docs/guidelines/global.md` - Seção "Best Practices > Comments"
- **Infração:** A função `handleSuccessResponse` possui mensagem padrão em português: `'Recurso não encontrado'` (linha 20).
- **Impacto:** Viola o padrão estabelecido no projeto e pode causar inconsistência na documentação e mensagens de erro.

### 4. Falta de Validação de Entrada (Prioridade: Média)
- **Requisito:** Validação de input em todas as entradas com Zod.
- **Documento:** `@docs/architecture/security.md` - Seção "Pontos de Melhoria > Validação de Input em Todas as Entradas"
- **Infração:** As funções não validam os tipos e formatos dos parâmetros de entrada antes de processá-los.
- **Impacto:** Pode permitir que dados inválidos sejam processados, causando erros em tempo de execução ou comportamentos inesperados.

## Pontos em Conformidade

1. **Nomenclatura e Estrutura:** As funções seguem a convenção `camelCase` e estão em arquivo com nomenclatura adequada (`api.ts`).
2. **Documentação JSDoc:** Todas as funções possuem documentação JSDoc completa, explicando propósito, parâmetros e retorno.
3. **Responsabilidade Única (SRP):** Cada função tem uma responsabilidade única e bem definida.
4. **Clean Code:** O código é legível e conciso.
5. **Tratamento de Erros:** As funções implementam tratamento adequado de erros com códigos de status HTTP apropriados.
6. **Uso de Genéricos:** A função `handleSuccessResponse` utiliza genéricos para flexibilidade de tipos.

## Pontos de Melhoria

1. **Tipagem de Erro:** O tipo `any` em `handleErrorResponse` deveria ser substituído por um tipo mais específico, como `Error` ou uma interface customizada.
2. **Validação de Request:** A função `isReqAuthenticated` poderia validar se o header existe antes de compará-lo.
3. **Constantes para Mensagens:** Mensagens de erro e sucesso deveriam ser extraídas para constantes ou arquivo de configuração.
4. **Tipagem de Status HTTP:** Os códigos de status HTTP poderiam ser tipados usando um tipo union ou enum.

## 🎨 Design Patterns Utilizados

1. **Utility Functions Pattern:** O arquivo agrupa funções utilitárias relacionadas a manipulação de requisições e respostas HTTP.
   - **Localização:** Todo o arquivo `api.ts`
   - **Benefício:** Centraliza lógica comum de manipulação de API, evitando duplicação de código e facilitando manutenção.

2. **Error Handling Pattern:** Implementa um padrão consistente de tratamento de erros com códigos de status HTTP apropriados.
   - **Localização:** Função `handleErrorResponse` (linhas 33-45)
   - **Benefício:** Fornece uma interface consistente para tratamento de erros em todas as rotas de API.

## 🏗️ Princípios SOLID Implementados

### Implementados

1. **Single Responsibility Principle (SRP):** Cada função tem uma responsabilidade única e bem definida.
   - **Evidência:** 
     - `isReqAuthenticated`: apenas valida autenticação
     - `handleSuccessResponse`: apenas formata resposta de sucesso
     - `handleErrorResponse`: apenas formata resposta de erro
     - `getUserIdFromQuery`: apenas extrai userId da query

2. **Open/Closed Principle (OCP):** As funções são extensíveis através de parâmetros, permitindo diferentes comportamentos sem modificar o código interno.
   - **Evidência:** Funções como `handleSuccessResponse` e `handleErrorResponse` aceitam parâmetros que permitem customização sem alterar a implementação.

### A Implementar

1. **Dependency Inversion Principle (DIP):** As funções dependem diretamente de implementações concretas (NextResponse, Request). Poderia se beneficiar de abstrações para melhor testabilidade.
   - **Justificativa:** Dependências diretas dificultam testes unitários e podem criar acoplamento forte.
   - **Plano:** Criar interfaces para Request e Response, permitindo injeção de dependências em testes.

## Plano de Ação

### 1. Corrigir Exposição de Chave de API (Prioridade: Crítica)
- Remover o prefixo `NEXT_PUBLIC_` da variável de ambiente `API_KEY` e utilizá-la apenas no servidor.
- Atualizar todas as referências à variável no código.
- Código exemplo:
```typescript
export function isReqAuthenticated(req: Request): void {
  const apiKey = process.env.API_KEY; // Sem NEXT_PUBLIC_
  if (req.headers.get('x-api-key') !== apiKey) {
    throw new Error('Forbidden', { cause: { status: 401 } });
  }
}
```

### 2. Substituir `any` por Tipo Específico (Prioridade: Alta)
- Criar uma interface ou tipo para erros e substituir `any` na função `handleErrorResponse`.
- Código exemplo:
```typescript
interface ApiError extends Error {
  status?: number;
  cause?: {
    status?: number;
  };
}

export function handleErrorResponse(
  error: ApiError | Error,
  defaultMessage: string
): NextResponse {
  // ... existing implementation
}
```

### 3. Traduzir Mensagens para Inglês (Prioridade: Média)
- Traduzir todas as mensagens de erro e sucesso para inglês.
- Código exemplo:
```typescript
export function handleSuccessResponse<T>(
  data: T | null,
  notFoundMessage: string = 'Resource not found'
): NextResponse {
  // ... existing implementation
}
```

### 4. Adicionar Validação de Entrada (Prioridade: Média)
- Adicionar validação de tipos e formatos dos parâmetros de entrada nas funções.
- Código exemplo:
```typescript
export function getUserIdFromQuery(req: Request): string {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  
  if (!userId || typeof userId !== 'string' || userId.trim() === '') {
    throw new Error("userId is required and must be a non-empty string", { 
      cause: { status: 400 } 
    });
  }
  
  return userId;
}
```

### 5. Extrair Constantes de Mensagens (Prioridade: Baixa)
- Criar um arquivo de constantes para mensagens de erro e sucesso.
- Código exemplo:
```typescript
// constants/api-messages.ts
export const API_MESSAGES = {
  FORBIDDEN: 'Forbidden',
  RESOURCE_NOT_FOUND: 'Resource not found',
  USER_ID_REQUIRED: 'userId is required',
} as const;
```

## 📊 Mapeamento
**Arquivo:** `src/lib/api.ts`  
**Status:** ✅ Criado  
**Link:** `@docs/analysis/analysis-mapping.md`

