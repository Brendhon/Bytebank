# Mapeamento de Análises Arquiteturais

Este documento mapeia todos os arquivos do projeto que necessitam de análise arquitetural conforme o padrão definido em `@docs/analysis/architectural-analysis-prompt.md`.

## ⚠️ Atualização do Next.js 16

**Data da atualização**: 2025-01-XX

O projeto foi atualizado para **Next.js 16.0.3** com as seguintes mudanças:

- ✅ **Dependências atualizadas**: Next.js (15.2.5 → 16.0.3), React (19.0.0 → 19.2.0), React DOM (19.0.0 → 19.2.0), TypeScript types atualizados
- ✅ **Middleware migrado para Proxy**: O arquivo `src/middleware.ts` foi removido e substituído por `src/proxy.ts` (conforme padrão Next.js 16)
- ✅ **Turbopack como padrão**: Configuração migrada de `webpack()` para `turbopack.rules` no `next.config.ts`
- ✅ **ESLint CLI**: Script de lint migrado de `next lint` para `eslint .` (ESLint Flat Config)
- ✅ **Build validado**: Build de produção executado com sucesso após upgrade

**Nota**: Todas as análises arquiteturais existentes permanecem válidas, mas podem precisar de revisão para garantir compatibilidade com as novas APIs assíncronas do Next.js 16 (params, searchParams, cookies, headers).

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
| `components/cards/Card/Card.tsx` | ✅ | ✅ | Melhorias implementadas - Status: Excelente (98%) |
| `components/cards/CreditCard/CreditCard.tsx` | ✅ | ✅ | Melhorias implementadas - Status: Excelente (98%) - **NOTA:** CVV ainda exposto quando showInfo=true (comportamento intencional para demonstração) |
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
| `hooks/useAutoClose/useAutoClose.ts` | ✅ | ✅ | Análise criada - Status: Excelente (98%) - Melhorias implementadas (JSDoc completo com exemplo de uso e nota sobre memoização, interface UseAutoCloseParams exportada, validação de parâmetros duration não-negativo, tipo de retorno explícito void, exportação como arrow function export const, assinatura refatorada para aceitar objeto, componente Toast atualizado) |
| `hooks/useToast/useToast.ts` | ✅ | ✅ | Análise criada - Status: Excelente (98%) - Melhorias implementadas (JSDoc completo com exemplo de uso, tipo de retorno explícito ToastContextType, exportação como arrow function export const, comentários em inglês, atualização do index.ts para named export, reutilização de tipos do contexto) |
| `hooks/useAutoRemoveToasts/useAutoRemoveToasts.ts` | ✅ | ✅ | Análise criada - Status: Excelente (95%) - Melhorias implementadas (tipo de retorno explícito, documentação JSDoc aprimorada com aviso de memoização) - `removeToast` já memoizado no ToastContext |

---

## Contexts

| Nome | Analysis Criado | Implementado | Observações |
|------|----------------|--------------|-------------|
| `context/ToastContext/ToastContext.tsx` | ✅ | ✅ | Análise criada - Status: Excelente (98%) - Melhorias implementadas (JSDoc completo, tipos exportados, memoização com useCallback e useMemo, remoção automática de toasts, isolamento de estilos Tailwind, validação de dados, fallback para crypto.randomUUID(), interface ToastProviderProps, comentários em inglês) |
| `context/NextAuthContext/NextAuthContext.tsx` | ✅ | ✅ | Análise criada - Status: Excelente (98%) - Melhorias implementadas (JSDoc completo com exemplo de uso, interface NextAuthProviderProps exportada e documentada, tipo de retorno explícito JSX.Element, named export e default export, comentários em inglês, conformidade total com padrões do projeto) |

---

## Services

| Nome | Analysis Criado | Implementado | Observações |
|------|----------------|--------------|-------------|
| `services/apiClient/apiClient.ts` | ✅ | ✅ | Análise criada - Status: Excelente (100%) - **TRATAMENTO DE ERRO PADRONIZADO COM HttpError** - Todas as validações lançam HttpError.badRequest(), createHttpError() cria instância real (sem type assertion), handleTimeoutError() usa HttpError (408), documentação exemplar com exemplos de uso, conformidade 100% com SOLID - Vulnerabilidade de segurança corrigida (migração para NextAuth) |
| `services/transaction.service.ts` | ✅ | ✅ | Análise criada - Status: Excelente (98%) - Melhorias implementadas (documentação em inglês, construção segura de query parameters com URLSearchParams, separação aprimorada de responsabilidades com funções auxiliares especializadas, JSDoc completo) |
| `services/user.service.ts` | ✅ | ✅ | Análise criada - Status: Excelente (98%) - Melhorias implementadas (validação de senha movida para servidor, tipos de erro customizados com status HTTP, validação de formato de email usando EMAIL_REGEX, mensagens em inglês, remoção de non-null assertions, interface IUserUpdateData sem uso de any, JSDoc completo) |

---

## Models

| Nome | Analysis Criado | Implementado | Observações |
|------|----------------|--------------|-------------|
| `models/Transaction/Transaction.ts` | ✅ | ✅ | Análise criada - Status: Excelente (98%) - Melhorias implementadas (documentação JSDoc completa em inglês, comentários traduzidos, validação de valor monetário com limites e precisão decimal, validação de formato de data usando DATE_REGEX compartilhado, validação de comprimento máximo para alias, validação customizada para enums, reutilização de constantes) |
| `models/User/User.ts` | ✅ | ✅ | Análise criada - Status: Excelente (98%) - Melhorias implementadas (documentação JSDoc completa em inglês, comentários traduzidos, campo name obrigatório, validação de formato de email usando EMAIL_REGEX compartilhado, validação de comprimento de senha para retrocompatibilidade, validação de aceite obrigatório da política de privacidade, validações de comprimento máximo, normalização de dados) - Vulnerabilidade de segurança corrigida |

---

## Schemas

| Nome | Analysis Criado | Implementado | Observações |
|------|----------------|--------------|-------------|
| `schemas/account/account.schema.ts` | ✅ | ✅ | Análise criada - Status: Excelente (98%) - Melhorias implementadas (mensagens traduzidas para inglês, documentação JSDoc completa, validação de senha forte para nova senha via schema compartilhado, validação de senha simples para senha atual para retrocompatibilidade, reutilização de schemas de validação de usuário do `user.schema.ts`, validação de comprimento máximo, normalização de email, validação de nome) - Vulnerabilidade de segurança corrigida |
| `schemas/login/login.schema.ts` | ✅ | ✅ | Análise criada - Status: Excelente (98%) - Melhorias implementadas (mensagens traduzidas para inglês, documentação JSDoc completa, reutilização de schemas de validação de usuário do `user.schema.ts`, validação de comprimento máximo, normalização de email, validação de senha mantida com mínimo de 6 caracteres para retrocompatibilidade) |
| `schemas/register/register.schema.ts` | ✅ | ✅ | Análise criada - Status: Excelente (98%) - Melhorias implementadas (mensagens traduzidas para inglês, documentação JSDoc completa, reutilização de schemas de validação de usuário do `user.schema.ts`, validação de senha fortalecida com 8 caracteres + complexidade, validação de comprimento máximo, validação de formato de nome) - Vulnerabilidade de segurança corrigida |
| `schemas/user/user.schema.ts` | ✅ | ✅ | Análise criada - Status: Excelente (100%) - **SCHEMA COMPARTILHADO FUNDAMENTAL** - Centraliza todas as validações de usuário (email, nome, senha forte, senha simples) para reutilização em account, register e login - Documentação JSDoc completa, mensagens em inglês, validações robustas, conformidade 100% |
| `schemas/transaction/transaction.schema.ts` | ✅ | ✅ | Análise criada - Status: Excelente (98%) - Melhorias implementadas (mensagens traduzidas para inglês, documentação JSDoc completa, validação de formato de data com regex e refine, validação de comprimento máximo para alias, validação de valor máximo, validação de precisão decimal) |
| `schemas/api/api.schema.ts` | ✅ | ✅ | Análise criada - Status: Excelente (95%) - Melhorias implementadas (schema reutilizável para mensagens, exemplos na documentação JSDoc, eliminação de duplicação) |

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
| `lib/api/api.ts` | ✅ | ✅ | Análise criada - Status: Excelente (100%) - **ARQUITETURA COMPLETA DE ERRO PADRONIZADA** - Classe HttpError com factory methods, utilitários dedicados (toHttpError, type guards), eliminação total de type assertions inseguros, documentação exemplar, conformidade 100% com SOLID - Vulnerabilidade crítica de segurança corrigida (migração para NextAuth) |
| `lib/errors/error-utils.ts` | ✅ | ✅ | Análise criada - Status: Excelente (100%) - **MÓDULO FUNDAMENTAL DE UTILITÁRIOS DE ERRO** - Type guards robustos com type predicates (isHttpError, isError), normalização completa de erros (toHttpError lida com todos os tipos), funções auxiliares (getErrorMessage, getErrorStatus), zero uso de `any`, type safety máxima, documentação JSDoc exemplar com exemplos, conformidade 100% com SOLID, 5 Design Patterns identificados |
| `lib/auth/auth.ts` | ✅ | ✅ | Análise criada - Status: Excelente (98%) - Melhorias implementadas (documentação JSDoc completa, eliminação de `any` com extensão de tipos JWT em `types/next-auth.d.ts`, comentários traduzidos, proteção contra timing attacks, tratamento de erros robusto, validação de credenciais) |
| `lib/formatter/formatter.ts` | ✅ | ✅ | Análise criada - Status: Excelente (98%) - Melhorias implementadas (documentação JSDoc traduzida para inglês, validação de entrada para todas as funções, tratamento de casos extremos com mensagens de erro descritivas) |
| `lib/mongoose/mongoose.ts` | ✅ | ✅ | Análise criada - Status: Excelente (98%) - Melhorias implementadas (tipagem do cache global com interface `MongooseCache` e `declare global`, eliminação de `any`, validação de formato de URI MongoDB, tratamento de erros melhorado com suporte a retry, configuração de timeout) |
| `lib/utils/utils.ts` | ✅ | ✅ | Análise criada - Status: Excelente (98%) - Melhorias implementadas (documentação JSDoc completa em inglês, eliminação de `any` (substituído por `unknown`), comentários traduzidos, validação de entrada robusta, tratamento de erros, reutilização de constantes `DATE_REGEX` e `EMAIL_REGEX` do módulo de constantes) |
| `lib/constants/routes/routes.ts` | ✅ | ✅ | Análise criada - Status: Excelente (95%) - Melhorias implementadas (JSDoc completo, validação de parâmetros, tipos explícitos) |
| `lib/constants/regex/regex.ts` | ✅ | ✅ | Análise criada - Status: Excelente (98%) - Conformidade total (JSDoc completo, nomenclatura adequada, organização, reutilização) |
| `lib/constants/http/http.ts` | ✅ | ✅ | Análise criada - Status: Excelente (98%) - Melhorias implementadas (tipos específicos para funções de mensagem de erro, JSDoc completo, organização e reutilização) |
| `lib/constants/api/api.ts` | ✅ | ✅ | Análise criada - Status: Excelente (98%) - Conformidade total (JSDoc completo, nomenclatura adequada, organização, reutilização, mensagens centralizadas) |

---

## Middleware / Proxy

| Nome | Analysis Criado | Implementado | Observações |
|------|----------------|--------------|-------------|
| `src/proxy.ts` | ✅ | ✅ | **MIGRADO DO MIDDLEWARE** (Next.js 16) - Análise criada - Status: Excelente (95%) - Melhorias implementadas (tratamento de erros, validação de ambiente, rotas centralizadas, JSDoc) - Arquivo `src/middleware.ts` foi removido e substituído por `src/proxy.ts` conforme padrão Next.js 16 |
| `middlewares/auth/index.ts` | ✅ | ✅ | Incluído na análise do proxy - Lógica principal (`authMiddleware`) - Melhorias implementadas |
| `middlewares/auth/guards.ts` | ✅ | ✅ | Incluído na análise do proxy - Route guards e checks - Melhorias implementadas |
| `middlewares/auth/handlers.ts` | ✅ | ✅ | Incluído na análise do proxy - Request handlers - Melhorias implementadas |

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

**Última atualização**: 2025-01-XX
**Total de arquivos mapeados**: 83
**Arquivos analisados**: 82 (UI: 4, Table: 3, Cards: 4, Form: 7, Layout: 11, Contexts: 2 ✅, Hooks: 3 ✅, Lib: 11 ✅, Models: 2, Schemas: 6 ✅, Services: 3 ✅, Proxy: 1 ✅, Types: 8 ✅, App Routes: 11, API Routes: 6)

**Nota sobre Proxy**: O arquivo `src/middleware.ts` foi migrado para `src/proxy.ts` no upgrade do Next.js 16. A análise arquitetural permanece válida, apenas o nome do arquivo mudou.

