# Análise Arquitetural: Schema: account.schema.ts

## 📋 Resumo Executivo
**Status:** ⚠️ Requer Atenção (68%)

O arquivo `account.schema.ts` apresenta a definição do schema Zod para validação de dados de conta/usuário. O código utiliza Zod corretamente, implementa validações adequadas (email, senha mínima, confirmação de senha), e exporta tipos TypeScript inferidos. O schema implementa validação customizada para garantir que as senhas coincidam. No entanto, existem violações relacionadas a mensagens de erro em português, falta de documentação JSDoc, validação de senha fraca (apenas 6 caracteres mínimos), falta de validação de força de senha, e ausência de validação de formato de data quando aplicável.

**Conformidade:** 68%

## 🚨 Requisitos Técnicos Infringidos

### 1. Mensagens de Erro em Português (Prioridade: Alta)
- **Requisito:** Todos os comentários e documentação devem estar em inglês.
- **Documento:** `@docs/guidelines/global.md` - Seção "Best Practices > Comments" e "Documentation Rules"
- **Infração:** Todas as mensagens de erro estão em português (linhas 5, 6, 8, 9, 11, 12, 17, 23, 27).
- **Impacto:** Viola o padrão estabelecido no projeto e pode causar inconsistência na documentação e experiência do usuário.

### 2. Falta de Documentação JSDoc (Prioridade: Alta)
- **Requisito:** Funções, hooks e tipos exportados possuem documentação JSDoc clara e completa.
- **Documento:** `@docs/Tech Challenge/core-analysis-prompt.md` - Seção "4. Documentação"
- **Infração:** O schema `accountSchema` e o tipo `AccountFormData` não possuem documentação JSDoc explicando seu propósito e uso.
- **Impacto:** Reduz a clareza do código e dificulta a manutenção e uso por outros desenvolvedores.

### 3. Validação de Senha Fraca (Prioridade: Alta)
- **Requisito:** Validação de input em todas as entradas, especialmente dados sensíveis com validação de força adequada.
- **Documento:** `@docs/architecture/security.md` - Seção "Pontos de Melhoria > Validação de Input em Todas as Entradas"
- **Infração:** A validação de senha requer apenas 6 caracteres mínimos (linhas 12, 17, 23), o que é considerado fraco para segurança. Não há validação de complexidade (maiúsculas, minúsculas, números, caracteres especiais).
- **Impacto:** **CRÍTICO** - Permite senhas fracas, comprometendo a segurança da aplicação e dos usuários. Senhas de 6 caracteres são facilmente quebráveis.

### 4. Falta de Validação de Força de Senha (Prioridade: Alta)
- **Requisito:** Validação de força de senha com requisitos de complexidade.
- **Documento:** `@docs/architecture/security.md` - Seção "Pontos de Melhoria > Validação de Input em Todas as Entradas"
- **Infração:** Não há validação de complexidade de senha (maiúsculas, minúsculas, números, caracteres especiais).
- **Impacto:** **CRÍTICO** - Permite senhas facilmente quebráveis, comprometendo a segurança.

### 5. Falta de Validação de Comprimento Máximo (Prioridade: Média)
- **Requisito:** Validação de input em todas as entradas.
- **Documento:** `@docs/architecture/security.md` - Seção "Pontos de Melhoria > Validação de Input em Todas as Entradas"
- **Infração:** Campos como `name` e `email` não possuem validação de comprimento máximo.
- **Impacto:** Pode permitir valores excessivamente longos, causando problemas de armazenamento ou performance.

## Pontos em Conformidade

1. **Nomenclatura e Estrutura:** O arquivo segue a convenção de nomenclatura adequada (`account.schema.ts`).
2. **TypeScript e Tipagem:** O código utiliza TypeScript com tipagem forte, exportando tipos inferidos do Zod.
3. **Uso de Zod:** Utiliza Zod corretamente para validação de schemas.
4. **Validação de Email:** Implementa validação de formato de email adequada.
5. **Validação de Confirmação de Senha:** Implementa validação customizada para garantir que as senhas coincidam.
6. **Responsabilidade Única (SRP):** O arquivo tem uma responsabilidade única: definir o schema de validação de conta.
7. **Clean Code:** O código é legível e bem estruturado.
8. **Reutilização de Tipos:** Exporta tipos TypeScript inferidos do schema para reutilização.

## Pontos de Melhoria

1. **Validação de Nome:** O campo `name` poderia ter validação de comprimento máximo e formato (ex: não permitir apenas espaços).
2. **Validação de Email:** Poderia adicionar validação de comprimento máximo para email.
3. **Validação de Senha Antiga:** Quando `newPassword` é fornecido, deveria validar se a senha antiga foi fornecida e está correta (mas isso pode ser feito no backend).

## 🎨 Design Patterns Utilizados

1. **Schema Validation Pattern:** Utiliza o padrão de validação de schema do Zod para garantir integridade de dados.
   - **Localização:** Todo o arquivo `account.schema.ts`
   - **Benefício:** Fornece validação type-safe e reutilizável, garantindo que os dados atendam aos requisitos antes de serem processados.

2. **Type Inference Pattern:** Utiliza inferência de tipos do TypeScript a partir do schema Zod.
   - **Localização:** Linha 31
   - **Benefício:** Garante sincronização entre o schema de validação e os tipos TypeScript, evitando inconsistências.

3. **Custom Validation Pattern:** Implementa validação customizada usando `refine` para regras de negócio complexas.
   - **Localização:** Linhas 16-18, 22-24, 26-29
   - **Benefício:** Permite validações que dependem de múltiplos campos ou lógica customizada.

## 🏗️ Princípios SOLID Implementados

### Implementados

1. **Single Responsibility Principle (SRP):** O arquivo tem uma responsabilidade única: definir o schema de validação de conta.
   - **Evidência:** Todo o código do arquivo foca exclusivamente na definição do schema Zod.

2. **Open/Closed Principle (OCP):** O schema é extensível através de métodos do Zod (refine, superRefine), permitindo adicionar validações sem modificar a estrutura base.
   - **Evidência:** Validações customizadas são adicionadas através de `refine` sem alterar a estrutura do objeto base.

### A Implementar

Nenhum princípio adicional precisa ser implementado. O arquivo é focado e bem estruturado, não requerendo abstrações adicionais que justifiquem a implementação dos outros princípios SOLID.

## Plano de Ação

### 1. Traduzir Mensagens de Erro para Inglês (Prioridade: Alta)
- Traduzir todas as mensagens de erro para inglês.
- Código exemplo:
```typescript
export const accountSchema = z.object({
  name: z
    .string({ required_error: 'Field is required' })
    .min(1, 'Field is required')
    .max(100, 'Name cannot exceed 100 characters')
    .trim(),
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email address')
    .max(255, 'Email cannot exceed 255 characters')
    .toLowerCase(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, 'Password must be at least 8 characters long'),
  // ... other fields
});
```

### 2. Adicionar Documentação JSDoc (Prioridade: Alta)
- Adicionar documentação JSDoc completa para o schema e tipo exportado.
- Código exemplo:
```typescript
/**
 * Account schema for validating account update form data
 * Validates name, email, password, and optional new password fields
 * 
 * @example
 * const result = accountSchema.parse({
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   password: 'currentPassword123',
 *   newPassword: 'newPassword123',
 *   confirmPassword: 'newPassword123'
 * });
 */
export const accountSchema = z.object({
  // ... fields
});

/**
 * Type inferred from accountSchema
 * Represents the shape of account form data
 */
export type AccountFormData = z.infer<typeof accountSchema>;
```

### 3. Fortalecer Validação de Senha (Prioridade: Alta)
- Aumentar comprimento mínimo para 8 caracteres e adicionar validação de complexidade.
- Código exemplo:
```typescript
const passwordValidation = z
  .string({ required_error: 'Password is required' })
  .min(8, 'Password must be at least 8 characters long')
  .max(128, 'Password cannot exceed 128 characters')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[@$!%*?&]/, 'Password must contain at least one special character (@$!%*?&)');

export const accountSchema = z.object({
  // ... other fields
  password: passwordValidation,
  newPassword: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 8, {
      message: 'Password must be at least 8 characters long',
    })
    .refine((val) => !val || /[a-z]/.test(val), {
      message: 'Password must contain at least one lowercase letter',
    })
    .refine((val) => !val || /[A-Z]/.test(val), {
      message: 'Password must contain at least one uppercase letter',
    })
    .refine((val) => !val || /[0-9]/.test(val), {
      message: 'Password must contain at least one number',
    })
    .refine((val) => !val || /[@$!%*?&]/.test(val), {
      message: 'Password must contain at least one special character',
    }),
  // ... other fields
});
```

### 4. Adicionar Validação de Comprimento Máximo (Prioridade: Média)
- Adicionar validação de comprimento máximo para todos os campos de texto.
- Código exemplo (já incluído no item 1).

### 5. Melhorar Validação de Nome (Prioridade: Baixa)
- Adicionar validação para garantir que o nome não seja apenas espaços.
- Código exemplo:
```typescript
name: z
  .string({ required_error: 'Field is required' })
  .min(1, 'Field is required')
  .max(100, 'Name cannot exceed 100 characters')
  .trim()
  .refine((val) => val.length > 0, {
    message: 'Name cannot be empty',
  }),
```

## 📊 Mapeamento
**Arquivo:** `src/schemas/account.schema.ts`  
**Status:** ✅ Criado  
**Link:** `@docs/Tech Challenge/analysis-mapping.md`

