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
| `components/ui/index.ts` | ❌ | ❌ | Arquivo de exportação - pode não necessitar análise individual |

---

## Componentes Table

| Nome | Analysis Criado | Implementado | Observações |
|------|----------------|--------------|-------------|
| `components/table/Table/Table.tsx` | ✅ | ⚠️ | Análise criada - Status: Bom (75%) - Melhorias pendentes |
| `components/table/Paginator/Paginator.tsx` | ✅ | ⚠️ | Análise criada - Melhorias pendentes |
| `components/table/TransactionTable/TransactionTable.tsx` | ✅ | ⚠️ | Análise criada - Melhorias pendentes |
| `components/table/index.ts` | ❌ | ❌ | Arquivo de exportação - pode não necessitar análise individual |

---

## Componentes Cards

| Nome | Analysis Criado | Implementado | Observações |
|------|----------------|--------------|-------------|
| `components/cards/Card/Card.tsx` | ✅ | ⚠️ | Análise criada - Status: Crítico (35%) - Melhorias pendentes |
| `components/cards/CreditCard/CreditCard.tsx` | ✅ | ⚠️ | Análise criada - Status: Crítico (30%) - **VIOLAÇÃO DE SEGURANÇA PCI DSS** - CVV exposto |
| `components/cards/CreditCardSession/CreditCardSession.tsx` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (55%) - Melhorias pendentes |
| `components/cards/WelcomeCard/WelcomeCard.tsx` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (52%) - Melhorias pendentes |
| `components/cards/index.ts` | ❌ | ❌ | Arquivo de exportação - pode não necessitar análise individual |

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
| `components/form/index.ts` | ❌ | ❌ | Arquivo de exportação - pode não necessitar análise individual |

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
| `components/layout/index.ts` | ❌ | ❌ | Arquivo de exportação - pode não necessitar análise individual |

---

## Hooks

| Nome | Analysis Criado | Implementado | Observações |
|------|----------------|--------------|-------------|
| `hooks/useAutoClose.ts` | ✅ | ⚠️ | Análise criada - Status: Bom (85%) - Melhorias pendentes |
| `hooks/useToast.ts` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (65%) - Melhorias pendentes |
| `hooks/index.ts` | ❌ | ❌ | Arquivo de exportação - pode não necessitar análise individual |

---

## Contexts

| Nome | Analysis Criado | Implementado | Observações |
|------|----------------|--------------|-------------|
| `context/ToastContext/ToastContext.tsx` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (50%) - Melhorias pendentes |
| `context/NextAuthContext/NextAuthContext.tsx` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (50%) - Melhorias pendentes |
| `context/index.ts` | ❌ | ❌ | Arquivo de exportação - pode não necessitar análise individual |

---

## Services

| Nome | Analysis Criado | Implementado | Observações |
|------|----------------|--------------|-------------|
| `services/apiClient.ts` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (68%) - **VIOLAÇÃO CRÍTICA DE SEGURANÇA** - API key exposta no cliente - Melhorias pendentes |
| `services/transaction.service.ts` | ✅ | ⚠️ | Análise criada - Status: Bom (85%) - Melhorias pendentes |
| `services/user.service.ts` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (72%) - **VIOLAÇÃO DE SEGURANÇA** - Validação de senha no cliente - Melhorias pendentes |

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
| `schemas/index.ts` | ❌ | ❌ | Arquivo de exportação - pode não necessitar análise individual |

---

## Types

| Nome | Analysis Criado | Implementado | Observações |
|------|----------------|--------------|-------------|
| `types/` (pasta completa) | ✅ | ⚠️ | Análise consolidada criada - Status: Bom (78%) - Melhorias pendentes (JSDoc, tradução de comentários) |
| `types/form.ts` | ✅ | ⚠️ | Incluído na análise consolidada da pasta |
| `types/layout.ts` | ✅ | ⚠️ | Incluído na análise consolidada da pasta |
| `types/modal.ts` | ✅ | ⚠️ | Incluído na análise consolidada da pasta |
| `types/nav.ts` | ✅ | ⚠️ | Incluído na análise consolidada da pasta |
| `types/next-auth.d.ts` | ✅ | ⚠️ | Incluído na análise consolidada da pasta |
| `types/transaction.ts` | ✅ | ⚠️ | Incluído na análise consolidada da pasta |
| `types/ui.ts` | ✅ | ⚠️ | Incluído na análise consolidada da pasta |
| `types/user.ts` | ✅ | ⚠️ | Incluído na análise consolidada da pasta |

---

## Lib (Utilitários)

| Nome | Analysis Criado | Implementado | Observações |
|------|----------------|--------------|-------------|
| `lib/api.ts` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (70%) - **VIOLAÇÃO CRÍTICA DE SEGURANÇA** - API key exposta no cliente - Melhorias pendentes |
| `lib/auth.ts` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (60%) - Melhorias pendentes |
| `lib/formatter.ts` | ✅ | ⚠️ | Análise criada - Status: Bom (82%) - Melhorias pendentes |
| `lib/mongoose.ts` | ✅ | ⚠️ | Análise criada - Status: Bom (88%) - Melhorias pendentes |
| `lib/utils.ts` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (68%) - Melhorias pendentes |

---

## Middleware

| Nome | Analysis Criado | Implementado | Observações |
|------|----------------|--------------|-------------|
| `middleware.ts` | ✅ | ⚠️ | Análise criada - Status: Bom (82%) - Contém lógica principal, orquestração e configuração - Melhorias pendentes |
| `middlewares/auth/guards.ts` | ✅ | ⚠️ | Incluído na análise do middleware - Route guards e checks |
| `middlewares/auth/handlers.ts` | ✅ | ⚠️ | Incluído na análise do middleware - Request handlers |

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
| `app/(user)/layout.tsx` | ❌ | ❌ | User layout - necessita análise |
| `app/(user)/dashboard/page.tsx` | ❌ | ❌ | Dashboard page - necessita análise |
| `app/(user)/transactions/page.tsx` | ❌ | ❌ | Transactions page - necessita análise |
| `app/(user)/settings/page.tsx` | ❌ | ❌ | Settings page - necessita análise |
| `app/(user)/cards/page.tsx` | ❌ | ❌ | Cards page - necessita análise |

---

## API Routes

| Nome | Analysis Criado | Implementado | Observações |
|------|----------------|--------------|-------------|
| `app/api/auth/[...nextauth]/route.ts` | ❌ | ❌ | NextAuth API route - necessita análise |
| `app/api/transactions/route.ts` | ❌ | ❌ | API route - necessita análise |
| `app/api/transactions/[id]/route.ts` | ❌ | ❌ | API route dinâmica - necessita análise |
| `app/api/transactions/summary/route.ts` | ❌ | ❌ | API route - necessita análise |
| `app/api/users/route.ts` | ❌ | ❌ | API route - necessita análise |
| `app/api/users/[email]/route.ts` | ❌ | ❌ | API route dinâmica - necessita análise |

---

## Observações Gerais

- Arquivos de exportação (`index.ts`) podem não necessitar análise individual, mas devem ser verificados caso contenham lógica relevante
- Arquivos auxiliares (como `Button.variants.ts`) podem ser incluídos na análise do componente principal
- Todos os arquivos `.stories.tsx` do Storybook devem ser considerados na análise do componente correspondente
- Arquivos de configuração e tipos podem ter critérios de análise adaptados conforme sua natureza

---

**Última atualização**: 2025-01-27
**Total de arquivos mapeados**: 74
**Arquivos analisados**: 62 (UI: 4, Table: 3, Cards: 4, Form: 7, Layout: 11, Contexts: 2, Hooks: 2, Lib: 5, Models: 2, Schemas: 4, Services: 3, Middleware: 1, Types: 8, App Routes: 6)

