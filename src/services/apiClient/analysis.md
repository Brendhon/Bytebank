# Análise Arquitetural: Serviço: apiClient.ts

## 📋 Resumo Executivo
**Status:** ⚠️ Requer Atenção (68%)

O arquivo `apiClient.ts` apresenta uma função genérica para realizar requisições HTTP, servindo como camada de abstração para comunicação com a API. O código utiliza TypeScript com genéricos para flexibilidade de tipos, implementa tratamento de erros básico, e centraliza a configuração de headers e autenticação. No entanto, existem violações críticas relacionadas à segurança (exposição de chave de API no cliente), mensagens de erro em português, falta de documentação JSDoc adequada, ausência de validação de entrada, e falta de tratamento de erros mais robusto.

**Conformidade:** 68%

## 🚨 Requisitos Técnicos Infringidos

### 1. Exposição de Chave de API no Cliente (Prioridade: Crítica)
- **Requisito:** Variáveis de ambiente sensíveis não devem ser expostas ao cliente. Chaves de API devem estar apenas no servidor.
- **Documento:** `@docs/architecture/security.md` - Seção "Pontos Fortes > Gerenciamento de Variáveis de Ambiente"
- **Infração:** A função `request` utiliza `process.env.NEXT_PUBLIC_API_KEY` (linha 13), que é exposta ao cliente através do prefixo `NEXT_PUBLIC_`. Chaves de API nunca devem ser acessíveis no cliente.
- **Impacto:** **CRÍTICO** - A chave de API fica exposta no código JavaScript do cliente, permitindo que qualquer pessoa possa visualizá-la e utilizá-la para fazer requisições não autorizadas. Isso viola princípios fundamentais de segurança.

### 2. Mensagens de Erro em Português (Prioridade: Alta)
- **Requisito:** Todos os comentários e documentação devem estar em inglês.
- **Documento:** `@docs/guidelines/global.md` - Seção "Best Practices > Comments" e "Documentation Rules"
- **Infração:** A mensagem de erro padrão está em português: `'Erro ao realizar tarefa, tente novamente'` (linha 29). Os comentários também estão em português (linhas 10, 16, 19, 26, 32).
- **Impacto:** Viola o padrão estabelecido no projeto e pode causar inconsistência na documentação e experiência do usuário.

### 3. Falta de Documentação JSDoc (Prioridade: Alta)
- **Requisito:** Funções, hooks e tipos exportados possuem documentação JSDoc clara e completa.
- **Documento:** `@docs/Tech Challenge/core-analysis-prompt.md` - Seção "4. Documentação"
- **Infração:** A função `request` possui apenas um comentário genérico em português (linha 2-3), mas não possui documentação JSDoc completa explicando parâmetros, retorno, e comportamento.
- **Impacto:** Reduz a clareza do código e dificulta a manutenção e uso por outros desenvolvedores.

### 4. Falta de Validação de Entrada (Prioridade: Média)
- **Requisito:** Validação de input em todas as entradas.
- **Documento:** `@docs/architecture/security.md` - Seção "Pontos de Melhoria > Validação de Input em Todas as Entradas"
- **Infração:** A função não valida os tipos e formatos dos parâmetros de entrada (método HTTP, URL, body) antes de processá-los.
- **Impacto:** Pode permitir que dados inválidos sejam processados, causando erros em tempo de execução ou comportamentos inesperados.

### 5. Tratamento de Erros Inadequado (Prioridade: Média)
- **Requisito:** Tratamento robusto de erros com códigos de status HTTP apropriados.
- **Documento:** `@docs/architecture/security.md` - Seção "Pontos de Melhoria"
- **Infração:** O tratamento de erro apenas verifica `response.ok` e lança um erro genérico, sem diferenciar tipos de erro (400, 401, 403, 404, 500, etc.) ou fornecer informações mais detalhadas.
- **Impacto:** Dificulta o debugging e não fornece feedback adequado sobre o tipo de erro ocorrido.

### 6. Falta de Timeout em Requisições (Prioridade: Baixa)
- **Requisito:** Requisições HTTP devem ter timeout configurado para evitar requisições pendentes indefinidamente.
- **Documento:** `@docs/architecture/performance-optimization.md`
- **Infração:** A função `fetch` não possui configuração de timeout.
- **Impacto:** Requisições podem ficar pendentes indefinidamente, causando problemas de performance e experiência do usuário.

## Pontos em Conformidade

1. **Nomenclatura e Estrutura:** A função segue a convenção `camelCase` e está em arquivo com nomenclatura adequada (`apiClient.ts`).
2. **TypeScript e Tipagem:** O código utiliza TypeScript com tipagem forte através de genéricos (`<T>`), permitindo flexibilidade de tipos.
3. **Uso de Genéricos:** A função utiliza genéricos corretamente para criar uma função flexível e reutilizável.
4. **Tipos de Retorno:** A função tem tipo de retorno explícito (`Promise<T>`).
5. **Responsabilidade Única (SRP):** A função tem uma responsabilidade única: realizar requisições HTTP genéricas.
6. **Clean Code:** O código é legível e conciso.
7. **Centralização de Configuração:** Headers e configuração de autenticação estão centralizados.
8. **Tratamento Básico de Erros:** Implementa tratamento básico de erros verificando `response.ok`.

## Pontos de Melhoria

1. **Validação de URL:** A função poderia validar se a URL é válida antes de fazer a requisição.
2. **Retry Logic:** Para requisições que falham, poderia implementar lógica de retry com backoff exponencial.
3. **Interceptors:** Poderia implementar interceptors para adicionar lógica comum (logging, transformação de dados) antes/depois das requisições.
4. **Cancelamento de Requisições:** Poderia suportar AbortController para cancelar requisições pendentes.
5. **Constantes para Mensagens:** Mensagens de erro deveriam ser extraídas para constantes ou arquivo de configuração.

## 🎨 Design Patterns Utilizados

1. **API Client Pattern:** Utiliza o padrão de cliente de API para centralizar a comunicação HTTP.
   - **Localização:** Todo o arquivo `apiClient.ts`
   - **Benefício:** Fornece uma camada de abstração para requisições HTTP, facilitando manutenção, testes e mudanças futuras na implementação.

2. **Generic Function Pattern:** Utiliza genéricos TypeScript para criar funções flexíveis e type-safe.
   - **Localização:** Linha 4 (`export async function request<T>`)
   - **Benefício:** Permite que a função trabalhe com diferentes tipos de dados mantendo type-safety, sem necessidade de criar múltiplas versões da função.

3. **Template Method Pattern (Parcial):** Define o esqueleto de uma requisição HTTP (headers, método, body, tratamento de erro) que pode ser reutilizado.
   - **Localização:** Todo o arquivo `apiClient.ts`
   - **Benefício:** Centraliza a lógica comum de requisições HTTP, evitando duplicação de código.

## 🏗️ Princípios SOLID Implementados

### Implementados

1. **Single Responsibility Principle (SRP):** A função tem uma responsabilidade única: realizar requisições HTTP genéricas.
   - **Evidência:** Todo o código do arquivo foca exclusivamente em realizar requisições HTTP com configuração centralizada.

2. **Open/Closed Principle (OCP):** A função é extensível através de parâmetros (método, URL, body, isAuth) sem necessidade de modificar o código interno.
   - **Evidência:** A função aceita diferentes métodos HTTP, URLs, e corpos de requisição através de parâmetros, permitindo uso em diferentes contextos.

### A Implementar

1. **Dependency Inversion Principle (DIP):** A função depende diretamente de `fetch` (implementação concreta). Poderia se beneficiar de abstração para melhor testabilidade.
   - **Justificativa:** Dependência direta de `fetch` dificulta testes unitários e pode criar acoplamento forte.
   - **Plano:** Criar uma interface para o cliente HTTP, permitindo injeção de dependências em testes e facilitando mudanças futuras na implementação.

## Plano de Ação

### 1. Corrigir Exposição de Chave de API (Prioridade: Crítica)
- Remover o prefixo `NEXT_PUBLIC_` da variável de ambiente `API_KEY` e utilizá-la apenas no servidor.
- Mover a lógica de autenticação para o lado do servidor (API routes do Next.js).
- Código exemplo:
```typescript
export async function request<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  body?: unknown | T,
): Promise<T> {
  // Form header
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    // API key should be handled server-side, not exposed to client
  };

  // Create the request
  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  // Analyze the response
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Error performing task, please try again');
  }

  // Parse the response
  return response.json() as T;
}
```

### 2. Traduzir Mensagens e Comentários para Inglês (Prioridade: Alta)
- Traduzir todas as mensagens de erro e comentários para inglês.
- Código exemplo:
```typescript
/**
 * Generic function to perform HTTP requests
 * @template T - The expected response type
 * @param {('GET' | 'POST' | 'PUT' | 'DELETE')} method - HTTP method
 * @param {string} url - Request URL
 * @param {unknown | T} [body] - Request body (optional)
 * @returns {Promise<T>} - Parsed response data
 * @throws {Error} - Throws error if request fails
 */
export async function request<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  body?: unknown | T,
): Promise<T> {
  // Form headers
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Create the request
  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  // Analyze the response
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Error performing task, please try again');
  }

  // Parse the response
  return response.json() as T;
}
```

### 3. Adicionar Documentação JSDoc Completa (Prioridade: Alta)
- Adicionar documentação JSDoc completa para a função, explicando propósito, parâmetros, retorno e exemplos de uso.
- Código exemplo (já incluído no item 2).

### 4. Adicionar Validação de Entrada (Prioridade: Média)
- Adicionar validação de tipos e formatos dos parâmetros de entrada.
- Código exemplo:
```typescript
export async function request<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  body?: unknown | T,
): Promise<T> {
  // Validate HTTP method
  const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];
  if (!validMethods.includes(method)) {
    throw new Error(`Invalid HTTP method: ${method}`);
  }

  // Validate URL
  try {
    new URL(url);
  } catch {
    throw new Error(`Invalid URL: ${url}`);
  }

  // ... rest of implementation
}
```

### 5. Melhorar Tratamento de Erros (Prioridade: Média)
- Diferenciar tipos de erro baseado no código de status HTTP.
- Código exemplo:
```typescript
// Analyze the response
if (!response.ok) {
  const message = await response.text();
  const status = response.status;
  
  let errorMessage = message || 'Error performing task, please try again';
  
  switch (status) {
    case 400:
      errorMessage = message || 'Bad request';
      break;
    case 401:
      errorMessage = message || 'Unauthorized';
      break;
    case 403:
      errorMessage = message || 'Forbidden';
      break;
    case 404:
      errorMessage = message || 'Resource not found';
      break;
    case 500:
      errorMessage = message || 'Internal server error';
      break;
  }
  
  const error = new Error(errorMessage);
  (error as any).status = status;
  throw error;
}
```

### 6. Adicionar Timeout em Requisições (Prioridade: Baixa)
- Adicionar configuração de timeout para requisições.
- Código exemplo:
```typescript
export async function request<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  body?: unknown | T,
  timeout: number = 30000, // 30 seconds default
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    // ... rest of implementation
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
}
```

## 📊 Mapeamento
**Arquivo:** `src/services/apiClient.ts`  
**Status:** ✅ Criado  
**Link:** `@docs/Tech Challenge/analysis-mapping.md`

