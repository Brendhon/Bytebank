# Mapeamento de Análises Arquiteturais

Este documento mapeia todos os arquivos do projeto que necessitam de análise arquitetural conforme o padrão definido em `@docs/analysis/architectural-analysis-prompt.md`.

## Legenda

- **Analysis Criado**: ✅ Sim | ❌ Não
- **Implementado**: ✅ Sim (melhorias implementadas) | ⚠️ Parcial (análise criada mas melhorias pendentes) | ❌ Não
- **Observações**: Notas relevantes sobre o arquivo

---

## Componentes UI

| Nome | Analysis Criado | Implementado | Observações |
|------|----------------|--------------|-------------|
| `components/ui/Button/Button.tsx` | ✅ | ✅ | Melhorias implementadas - Status: Excelente (98%) |
| `components/ui/Button/Button.variants.ts` | ❌ | ❌ | Arquivo auxiliar de variantes - pode ser incluído na análise do Button |
| `components/ui/Toast/Toast.tsx` | ✅ | ✅ | Melhorias implementadas - Status: Excelente (98%) |
| `components/ui/Logo/Logo.tsx` | ✅ | ✅ | Melhorias implementadas |
| `components/ui/Illustration/Illustration.tsx` | ✅ | ✅ | Melhorias implementadas |

---

## Componentes Table

| Nome | Analysis Criado | Implementado | Observações |
|------|----------------|--------------|-------------|
| `components/table/Table/Table.tsx` | ✅ | ⚠️ | Análise criada - Status: Bom (75%) - Melhorias pendentes |
| `components/table/Paginator/Paginator.tsx` | ✅ | ⚠️ | Análise criada - Melhorias pendentes |
| `components/table/TransactionTable/TransactionTable.tsx` | ✅ | ⚠️ | Análise criada - Melhorias pendentes |

---

## Componentes Cards

| Nome | Analysis Criado | Implementado | Observações |
|------|----------------|--------------|-------------|
| `components/cards/Card/Card.tsx` | ✅ | ⚠️ | Análise criada - Status: Crítico (35%) - Melhorias pendentes |
| `components/cards/CreditCard/CreditCard.tsx` | ✅ | ⚠️ | Análise criada - Status: Crítico (30%) - **VIOLAÇÃO DE SEGURANÇA PCI DSS** - CVV exposto |
| `components/cards/CreditCardSession/CreditCardSession.tsx` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (55%) - Melhorias pendentes |
| `components/cards/WelcomeCard/WelcomeCard.tsx` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (52%) - Melhorias pendentes |

---

## Componentes Form

| Nome | Analysis Criado | Implementado | Observações |
|------|----------------|--------------|-------------|
| `components/form/AccountForm/AccountForm.tsx` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (70%) - Melhorias pendentes |
| `components/form/Checkbox/Checkbox.tsx` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (65%) - Melhorias pendentes |
| `components/form/Input/Input.tsx` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (70%) - Melhorias pendentes |
| `components/form/LoginForm/LoginForm.tsx` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (65%) - Melhorias pendentes |
| `components/form/RegisterForm/RegisterForm.tsx` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (65%) - Melhorias pendentes |
| `components/form/Select/Select.tsx` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (68%) - Melhorias pendentes |
| `components/form/TransactionForm/TransactionForm.tsx` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (60%) - Melhorias pendentes |

---

## Componentes Layout

| Nome | Analysis Criado | Implementado | Observações |
|------|----------------|--------------|-------------|
| `components/layout/BenefitsSection/BenefitsSection.tsx` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (55%) - Melhorias pendentes |
| `components/layout/Footer/Footer.tsx` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (50%) - Melhorias pendentes |
| `components/layout/Header/Header.tsx` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (60%) - Melhorias pendentes |
| `components/layout/Header/UserActions/UserActions.tsx` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (55%) - Melhorias pendentes |
| `components/layout/Header/GuestActions/GuestActions.tsx` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (55%) - Melhorias pendentes |
| `components/layout/Header/AvatarPopover/AvatarPopover.tsx` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (50%) - Melhorias pendentes |
| `components/layout/Header/MenuPopover/MenuPopover.tsx` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (55%) - Melhorias pendentes |
| `components/layout/Modal/Modal.tsx` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (60%) - Melhorias pendentes |
| `components/layout/MovementsSection/MovementsSection.tsx` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (55%) - Melhorias pendentes |
| `components/layout/NavMenu/NavMenu.tsx` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (65%) - Melhorias pendentes |
| `components/layout/Popover/Popover.tsx` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (60%) - Melhorias pendentes |

---

## Hooks

| Nome | Analysis Criado | Implementado | Observações |
|------|----------------|--------------|-------------|
| `hooks/useAutoClose.ts` | ✅ | ⚠️ | Análise criada - Status: Bom (85%) - Melhorias pendentes |
| `hooks/useToast.ts` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (65%) - Melhorias pendentes |

---

## Contexts

| Nome | Analysis Criado | Implementado | Observações |
|------|----------------|--------------|-------------|
| `context/ToastContext/ToastContext.tsx` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (50%) - Melhorias pendentes |
| `context/NextAuthContext/NextAuthContext.tsx` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (50%) - Melhorias pendentes |

---

## Services

| Nome | Analysis Criado | Implementado | Observações |
|------|----------------|--------------|-------------|
| `services/apiClient.ts` | ✅ | ✅ | Análise criada - Status: Excelente (98%) - Melhorias implementadas (documentação JSDoc completa, validação de entrada, timeout configurável, tratamento robusto de erros, mensagens em inglês, refatoração em funções auxiliares, constantes para mensagens, cancelamento de requisições) - Vulnerabilidade de segurança corrigida (migração para NextAuth) |
| `services/transaction.service.ts` | ✅ | ✅ | Análise criada - Status: Excelente (98%) - Melhorias implementadas (documentação em inglês, construção segura de query parameters com URLSearchParams, separação aprimorada de responsabilidades com funções auxiliares especializadas, JSDoc completo) |
| `services/user.service.ts` | ✅ | ✅ | Análise criada - Status: Excelente (98%) - Melhorias implementadas (validação de senha movida para servidor, tipos de erro customizados com status HTTP, validação de formato de email usando EMAIL_REGEX, mensagens em inglês, remoção de non-null assertions, interface IUserUpdateData sem uso de any, JSDoc completo) |

---

## Models

| Nome | Analysis Criado | Implementado | Observações |
|------|----------------|--------------|-------------|
| `models/Transaction.ts` | ✅ | ⚠️ | Análise criada - Status: Bom (80%) - Melhorias pendentes |
| `models/User.ts` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (65%) - **VIOLAÇÃO DE SEGURANÇA** - Falta validação de senha - Melhorias pendentes |

---

## Schemas

| Nome | Analysis Criado | Implementado | Observações |
|------|----------------|--------------|-------------|
| `schemas/account.schema.ts` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (68%) - **VIOLAÇÃO DE SEGURANÇA** - Validação de senha fraca - Melhorias pendentes |
| `schemas/login.schema.ts` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (70%) - Melhorias pendentes |
| `schemas/register.schema.ts` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (65%) - **VIOLAÇÃO DE SEGURANÇA** - Validação de senha fraca - Melhorias pendentes |
| `schemas/transaction.schema.ts` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (72%) - Melhorias pendentes |

---

## Types

| Nome | Analysis Criado | Implementado | Observações |
|------|----------------|--------------|-------------|
| `types/` (pasta completa) | ✅ | ✅ | Análise consolidada criada - Status: Excelente (95%) - Melhorias implementadas (JSDoc completo, comentários em inglês) |
| `types/form.ts` | ✅ | ✅ | Incluído na análise consolidada da pasta - JSDoc implementado |
| `types/layout.ts` | ✅ | ✅ | Incluído na análise consolidada da pasta - JSDoc implementado |
| `types/modal.ts` | ✅ | ✅ | Incluído na análise consolidada da pasta - JSDoc implementado |
| `types/nav.ts` | ✅ | ✅ | Incluído na análise consolidada da pasta - JSDoc implementado |
| `types/next-auth.d.ts` | ✅ | ✅ | Incluído na análise consolidada da pasta - JSDoc implementado |
| `types/transaction.ts` | ✅ | ✅ | Incluído na análise consolidada da pasta - JSDoc implementado, comentários traduzidos |
| `types/ui.ts` | ✅ | ✅ | Incluído na análise consolidada da pasta - JSDoc implementado |
| `types/user.ts` | ✅ | ✅ | Incluído na análise consolidada da pasta - JSDoc implementado |

---

## Lib (Utilitários)

| Nome | Analysis Criado | Implementado | Observações |
|------|----------------|--------------|-------------|
| `lib/api.ts` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (70%) - **VIOLAÇÃO CRÍTICA DE SEGURANÇA** - API key exposta no cliente - Melhorias pendentes |
| `lib/auth.ts` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (60%) - Melhorias pendentes |
| `lib/formatter.ts` | ✅ | ⚠️ | Análise criada - Status: Bom (82%) - Melhorias pendentes |
| `lib/mongoose.ts` | ✅ | ⚠️ | Análise criada - Status: Bom (88%) - Melhorias pendentes |
| `lib/utils.ts` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (68%) - Melhorias pendentes |
| `lib/constants/routes/routes.ts` | ✅ | ✅ | Análise criada - Status: Excelente (95%) - Melhorias implementadas (JSDoc completo, validação de parâmetros, tipos explícitos) |
| `lib/constants/regex/regex.ts` | ✅ | ✅ | Análise criada - Status: Excelente (98%) - Conformidade total (JSDoc completo, nomenclatura adequada, organização, reutilização) |
| `lib/constants/http/http.ts` | ✅ | ✅ | Análise criada - Status: Excelente (98%) - Melhorias implementadas (tipos específicos para funções de mensagem de erro, JSDoc completo, organização e reutilização) |

---

## Middleware

| Nome | Analysis Criado | Implementado | Observações |
|------|----------------|--------------|-------------|
| `middleware.ts` | ✅ | ✅ | Análise criada - Status: Excelente (95%) - Melhorias implementadas (tratamento de erros, validação de ambiente, rotas centralizadas, JSDoc) |
| `middlewares/auth/index.ts` | ✅ | ✅ | Incluído na análise do middleware - Lógica principal (`authMiddleware`) - Melhorias implementadas |
| `middlewares/auth/guards.ts` | ✅ | ✅ | Incluído na análise do middleware - Route guards e checks - Melhorias implementadas |
| `middlewares/auth/handlers.ts` | ✅ | ✅ | Incluído na análise do middleware - Request handlers - Melhorias implementadas |

---

## App Routes (Pages)

| Nome | Analysis Criado | Implementado | Observações |
|------|----------------|--------------|-------------|
| `app/` (pasta raiz - principais) | ✅ | ⚠️ | Análise consolidada criada - Status: Bom (82%) - Melhorias pendentes (JSDoc, tratamento de erros) |
| `app/layout.tsx` | ✅ | ⚠️ | Incluído na análise consolidada da pasta raiz |
| `app/page.tsx` | ✅ | ⚠️ | Incluído na análise consolidada da pasta raiz |
| `app/not-found.tsx` | ✅ | ⚠️ | Incluído na análise consolidada da pasta raiz |
| `app/(guest)/layout.tsx` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (62%) - Melhorias pendentes (any→unknown, JSDoc, useCallback, custom hooks, interface props) |
| `app/(guest)/home/page.tsx` | ✅ | ⚠️ | Análise criada - Status: Bom (75%) - Melhorias pendentes (JSDoc, nome de função) |
| `app/(guest)/404/page.tsx` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (58%) - Melhorias pendentes (Link, isolamento de estilos, JSDoc, acessibilidade) |
| `app/(user)/layout.tsx` | ✅ | ⚠️ | Análise criada - Status: Bom (78%) - Melhorias pendentes (JSDoc, interface props, useCallback, isolamento de estilos, nome de função, validação de type assertion) |
| `app/(user)/dashboard/page.tsx` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (55%) - **ANTI-PADRÃO CRÍTICO** - Uso de useEffect para data fetching (deveria ser Server Component) - Melhorias pendentes (refatorar para Server Component, JSDoc, isolamento de estilos, nome de função, estados de loading/error) |
| `app/(user)/transactions/page.tsx` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (52%) - **ANTI-PADRÃO CRÍTICO** - Uso de useEffect para data fetching (deveria ser Server Component + Server Actions) - Melhorias pendentes (refatorar para Server Component + Server Actions, JSDoc, useCallback, isolamento de estilos, remover non-null assertions, evitar mutação de props) |
| `app/(user)/settings/page.tsx` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (58%) - Melhorias pendentes (any→unknown, JSDoc, useCallback, isolamento de estilos, nome de função, toast após signOut, custom hooks) |
| `app/(user)/cards/page.tsx` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (65%) - **VIOLAÇÃO CRÍTICA DE SEGURANÇA PCI DSS** - CVV e números de cartão expostos - Página demonstrativa com dados mockados - Melhorias pendentes (remover dados sensíveis, JSDoc, authOptions, nome de função) |

---

## API Routes

| Nome | Analysis Criado | Implementado | Observações |
|------|----------------|--------------|-------------|
| `app/api/auth/[...nextauth]/route.ts` | ✅ | ⚠️ | Análise criada - Status: Bom (85%) - Melhorias pendentes (JSDoc) |
| `app/api/transactions/route.ts` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (52%) - **VIOLAÇÕES CRÍTICAS DE SEGURANÇA** - API key exposta, falta validação de propriedade, falta validação Zod, falta associação ao usuário no POST - Melhorias pendentes |
| `app/api/transactions/[id]/route.ts` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (58%) - **VIOLAÇÕES CRÍTICAS DE SEGURANÇA** - API key exposta, falta validação de propriedade, falta validação Zod - Melhorias pendentes |
| `app/api/transactions/summary/route.ts` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (55%) - **VIOLAÇÕES CRÍTICAS DE SEGURANÇA** - API key exposta, falta validação de propriedade, falta JSDoc - Melhorias pendentes |
| `app/api/users/route.ts` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (48%) - **VIOLAÇÕES CRÍTICAS DE SEGURANÇA** - API key exposta, GET expõe todos os usuários, falta validação Zod - Melhorias pendentes |
| `app/api/users/[email]/route.ts` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (50%) - **VIOLAÇÕES CRÍTICAS DE SEGURANÇA** - API key exposta, falta validação de propriedade, falta validação Zod, falta JSDoc - Melhorias pendentes |

---

## Observações Gerais

- Arquivos de exportação (`index.ts`) podem não necessitar análise individual, mas devem ser verificados caso contenham lógica relevante
- Arquivos auxiliares (como `Button.variants.ts`) podem ser incluídos na análise do componente principal
- Todos os arquivos `.stories.tsx` do Storybook devem ser considerados na análise do componente correspondente
- Arquivos de configuração e tipos podem ter critérios de análise adaptados conforme sua natureza

---

**Última atualização**: 2025-01-27
**Total de arquivos mapeados**: 77
**Arquivos analisados**: 76 (UI: 4, Table: 3, Cards: 4, Form: 7, Layout: 11, Contexts: 2, Hooks: 2, Lib: 8 ✅, Models: 2, Schemas: 4, Services: 3, Middleware: 1 ✅, Types: 8 ✅, App Routes: 11, API Routes: 6)

