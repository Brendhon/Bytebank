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
| `components/table/Table/Table.tsx` | ✅ | ✅ | Melhorias implementadas - Status: Excelente (98%) - Exportação nomeada, JSDoc completo, acessibilidade WCAG 2.1 AA completa, estilos isolados ao final do arquivo, interface TableProps exportada, prop emptyMessage para i18n, prop rowKey para keys estáveis, comentários redundantes removidos, props opcionais para customização (className, tableClassName, ariaLabel) |
| `components/table/Paginator/Paginator.tsx` | ✅ | ✅ | Melhorias implementadas - Status: Excelente (98%) - Exportação nomeada, JSDoc completo, acessibilidade WCAG 2.1 AA completa, estilos isolados ao final do arquivo, interface PaginatorProps exportada, comentários redundantes removidos, keys melhoradas |
| `components/table/TransactionTable/TransactionTable.tsx` | ✅ | ✅ | Melhorias implementadas - Status: Excelente (98%) - Exportação nomeada, JSDoc completo, acessibilidade WCAG 2.1 AA completa, estilos isolados ao final do arquivo, interface TransactionTableProps e TransactionTableColumnLabels exportadas, prop columnLabels para i18n, hook customizado useTransactionRenderers em src/hooks/useTransactionRenderers/, constantes TRANSACTION_TABLE_LABELS em src/lib/constants/table/, renderização condicional de botões e coluna de ações, comentários redundantes removidos, accessor da coluna de ações corrigido para '_id', uso de useMemo para otimização |

---

## Componentes Cards

| Nome | Analysis Criado | Implementado | Observações |
|------|----------------|--------------|-------------|
| `components/cards/Card/Card.tsx` | ✅ | ✅ | Melhorias implementadas - Status: Excelente (98%) |
| `components/cards/CreditCard/CreditCard.tsx` | ✅ | ✅ | Melhorias implementadas - Status: Excelente (98%) - **NOTA:** CVV ainda exposto quando showInfo=true (comportamento intencional para demonstração) |
| `components/cards/CreditCardSession/CreditCardSession.tsx` | ✅ | ✅ | Melhorias implementadas - Status: Excelente (98%) - Client Component consolidado, hook customizado em `src/hooks/useCreditCardState/`, componentes modulares organizados em pastas (`CardActions/`, `CardSection/`) com Storybook individual, constantes em `src/lib/constants/card/card.ts`, acessibilidade WCAG 2.1 AA completa, JSDoc completo |
| `components/cards/WelcomeCard/WelcomeCard.tsx` | ✅ | ✅ | Melhorias implementadas - Status: Excelente (98%) - Exportação nomeada, JSDoc completo, acessibilidade WCAG 2.1 AA completa, estilos isolados ao final do arquivo, interface exportada como `WelcomeCardProps`, Button customizado do projeto, constantes centralizadas em inglês em `card.ts`, Storybook completo com argTypes |

---

## Componentes Form

| Nome | Analysis Criado | Implementado | Observações |
|------|----------------|--------------|-------------|
| `components/form/AccountForm/AccountForm.tsx` | ✅ | ✅ | Melhorias implementadas - Status: Excelente (98%) - Exportação nomeada como arrow function (export const), JSDoc completo com descrições detalhadas de props, estilos isolados ao final do arquivo, interface AccountFormProps exportada e documentada, diretiva 'use client' mantida, atributos ARIA adicionados aos botões, atributo alt adicionado ao Illustration, elemento raiz substituído de section para form, tratamento de erros com useToast, estado loadingDelete adicionado, argTypes configurados no Storybook |
| `components/form/Checkbox/Checkbox.tsx` | ✅ | ✅ | Melhorias implementadas - Status: Excelente (98%) - Exportação nomeada como arrow function (export const), JSDoc completo, acessibilidade aprimorada com aria-invalid, estilos isolados ao final do arquivo, interface CheckboxProps exportada, diretiva 'use client', renderização condicional otimizada do ícone |
| `components/form/Input/Input.tsx` | ✅ | ✅ | Melhorias implementadas - Status: Excelente (98%) - Exportação nomeada como arrow function (export const), JSDoc completo com exemplos, acessibilidade aprimorada com aria-invalid e aria-describedby, estilos isolados ao final do arquivo, interface InputProps exportada, diretiva 'use client' mantida, uso de useId() para IDs únicos, botão de toggle com aria-label, todos os botões com type="button", suporte a InputMask com ARIA |
| `components/form/LoginForm/LoginForm.tsx` | ✅ | ✅ | Melhorias implementadas - Status: Excelente (98%) - Exportação nomeada como arrow function (export const), JSDoc completo com descrições detalhadas de props, estilos isolados ao final do arquivo, interface LoginFormProps exportada e documentada, diretiva 'use client' mantida, atributo alt adicionado ao Illustration para acessibilidade |
| `components/form/RegisterForm/RegisterForm.tsx` | ✅ | ✅ | Melhorias implementadas - Status: Excelente (98%) - Exportação nomeada como arrow function (export const), JSDoc completo com descrições detalhadas de props, estilos isolados ao final do arquivo, interface RegisterFormProps exportada e documentada, diretiva 'use client' mantida, atributo alt adicionado ao Illustration para acessibilidade |
| `components/form/Select/Select.tsx` | ✅ | ✅ | Melhorias implementadas - Status: Excelente (98%) - Exportação nomeada como arrow function (export const), JSDoc completo, acessibilidade aprimorada com aria-invalid e aria-describedby, estilos isolados ao final do arquivo, interface SelectProps e tipo SelectOption exportados, diretiva 'use client', uso de useId() para IDs únicos, ícone chevron ajustado, placeholder padrão em inglês |
| `components/form/TransactionForm/TransactionForm.tsx` | ✅ | ✅ | Melhorias implementadas - Status: Excelente (98%) - Exportação nomeada como arrow function (export const), JSDoc completo com descrições detalhadas de props, estilos isolados ao final do arquivo, interface TransactionFormProps exportada e documentada, diretiva 'use client' mantida, atributo alt adicionado ao Illustration, constantes movidas para src/lib/constants/form/transaction.ts, tipo do input de alias corrigido (email → text), useEffect otimizado, fragment desnecessário removido |

---

## Componentes Layout

| Nome | Analysis Criado | Implementado | Observações |
|------|----------------|--------------|-------------|
| `components/layout/BenefitsSection/BenefitsSection.tsx` | ✅ | ✅ | Melhorias implementadas - Status: Excelente (98%) - Exportação nomeada como arrow function (export const), JSDoc completo, acessibilidade WCAG 2.1 AA completa, estilos isolados ao final do arquivo, interfaces Benefit e BenefitsSectionProps exportadas, separação de dados e apresentação, IDs únicos para keys, comentários em inglês, tag autodocs no Storybook |
| `components/layout/Footer/Footer.tsx` | ✅ | ✅ | Melhorias implementadas - Status: Excelente (98%) - Exportação nomeada como arrow function (export const), JSDoc completo, acessibilidade WCAG 2.1 AA completa com links clicáveis (tel: e mailto:), estilos isolados ao final do arquivo, interfaces FooterProps e FooterContactInfo exportadas, estrutura semântica com elemento address e h3, layout responsivo, tag autodocs no Storybook |
| `components/layout/Header/Header.tsx` | ✅ | ✅ | Melhorias implementadas - Status: Excelente (98%) - Exportação nomeada como arrow function (export const), JSDoc completo, estilos isolados ao final do arquivo, comentários em inglês, exportação atualizada no index.ts, tag autodocs no Storybook |
| `components/layout/Header/UserActions/UserActions.tsx` | ✅ | ✅ | Melhorias implementadas - Status: Excelente (98%) - Exportação nomeada como arrow function (export const), JSDoc completo, estilos isolados ao final do arquivo, interface UserActionsProps exportada, tag autodocs no Storybook |
| `components/layout/Header/GuestActions/GuestActions.tsx` | ✅ | ✅ | Melhorias implementadas - Status: Excelente (98%) - Exportação nomeada como arrow function (export const), JSDoc completo, estilos isolados ao final do arquivo, interface GuestActionsProps exportada, textos externalizados para i18n, tag autodocs no Storybook |
| `components/layout/Header/AvatarPopover/AvatarPopover.tsx` | ✅ | ✅ | Melhorias implementadas - Status: Excelente (98%) - Exportação nomeada como arrow function (export const), JSDoc completo, estilos isolados ao final do arquivo, interface AvatarPopoverProps exportada, validação de variáveis de ambiente, textos externalizados para i18n, tag autodocs no Storybook |
| `components/layout/Header/MenuPopover/MenuPopover.tsx` | ✅ | ✅ | Melhorias implementadas - Status: Excelente (98%) - Exportação nomeada como arrow function (export const), JSDoc completo, estilos isolados ao final do arquivo, interface MenuPopoverProps exportada, validação de pathname com type assertion, tag autodocs no Storybook |
| `components/layout/Modal/Modal.tsx` | ✅ | ✅ | Melhorias implementadas - Status: Excelente (98%) - Exportação nomeada como arrow function (export const), JSDoc completo, estilos isolados ao final do arquivo, interface ModalProps exportada, substituição de template literals por cn, tratamento de erro com try/catch/finally, comentários redundantes removidos, tag autodocs no Storybook |
| `components/layout/MovementsSection/MovementsSection.tsx` | ✅ | ✅ | Melhorias implementadas - Status: Excelente (98%) - Exportação nomeada como arrow function (export const), JSDoc completo, estilos isolados ao final do arquivo, interface MovementsSectionProps exportada, type assertion removida (utilizando tipagem correta), grid simplificado, container desnecessário removido, tratamento de array vazio, validação de dados, props opcionais para extensibilidade (className, title) |
| `components/layout/NavMenu/NavMenu.tsx` | ✅ | ✅ | Melhorias implementadas - Status: Excelente (98%) - Exportação nomeada como arrow function (export const), JSDoc completo, estilos isolados ao final do arquivo, interfaces NavMenuProps e NavMenuItem exportadas, substituição de clsx por cn (import removido), função color renomeada para getColorClass, espaço extra removido, comentários em inglês, tag autodocs no Storybook |
| `components/layout/Popover/Popover.tsx` | ✅ | ✅ | Melhorias implementadas - Status: Excelente (98%) - Exportação nomeada como arrow function (export const PopoverComponent), JSDoc completo, estilos isolados ao final do arquivo, interface PopoverProps exportada, prop pButton renomeada para button, variável newClass renomeada para panelClassName, classes duplicadas removidas, comentários em inglês, tag autodocs no Storybook |

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
| `app/(guest)/layout.tsx` | ✅ | ✅ | Melhorias implementadas - Status: Excelente (98%) - Lógica extraída para hooks customizados (useAuth, useRegister), JSDoc completo, interface GuestLayoutProps exportada, useCallback para memoização, função nomeada, tratamento de erros com unknown |
| `app/(guest)/home/page.tsx` | ✅ | ✅ | Melhorias implementadas - Status: Excelente (98%) - JSDoc completo, função nomeada |
| `app/(guest)/404/page.tsx` | ✅ | ✅ | Melhorias implementadas - Status: Excelente (98%) - Isolamento de estilos, JSDoc completo, função nomeada, acessibilidade WCAG 2.1 AA completa, estrutura semântica HTML, substituição de `<br />` por múltiplos parágrafos |
| `app/(user)/layout.tsx` | ✅ | ✅ | Melhorias implementadas - Status: Excelente (98%) - Documentação JSDoc completa, interface `UserLayoutProps` exportada, estilos isolados em objeto `styles`, função nomeada `UserLayout` com tipo de retorno explícito, função `handleNavigation` memoizada com `useCallback`, validação de pathname com type guard `isValidNavItem` e `useMemo`, comentário corrigido |
| `app/(user)/dashboard/page.tsx` | ✅ | ✅ | Melhorias implementadas - Status: Excelente (98%) - **REFATORADO PARA SERVER COMPONENT** - Componente convertido para Server Component assíncrono, dados buscados no servidor usando `auth()` e `getTransactionSummary()`, JSDoc completo, estilos isolados em objeto `styles`, função nomeada `DashboardPage`, tratamento de erros com try-catch e fallback, validação de sessão com redirecionamento |
| `app/(user)/transactions/page.tsx` | ✅ | ⚠️ | Análise criada - Status: Requer Atenção (52%) - **ANTI-PADRÃO CRÍTICO** - Uso de useEffect para data fetching (deveria ser Server Component + Server Actions) - Melhorias pendentes (refatorar para Server Component + Server Actions, JSDoc, useCallback, isolamento de estilos, remover non-null assertions, evitar mutação de props) |
| `app/(user)/settings/page.tsx` | ✅ | ✅ | Melhorias implementadas - Status: Excelente (98%) - Tratamento de erros com `unknown` e type guards usando `HttpError`, estilos isolados em objeto `styles`, JSDoc completo, função nomeada `SettingsPage`, todas as funções memoizadas com `useCallback`, toast corrigido (exibido antes do redirect), valores derivados diretamente da sessão, validação de dados antes de chamar serviços |
| `app/(user)/cards/page.tsx` | ✅ | ✅ | Melhorias implementadas - Status: Excelente (98%) - Dados mockados centralizados em constantes com documentação, JSDoc completo, função nomeada, tipo de retorno explícito - **NOTA:** Dados são mockados para demonstração/teste e estão claramente documentados como tal |

---

## API Routes

| Nome | Analysis Criado | Implementado | Observações |
|------|----------------|--------------|-------------|
| `app/api/auth/[...nextauth]/route.ts` | ✅ | ✅ | Melhorias implementadas - Status: Excelente (98%) - Documentação JSDoc completa adicionada ao handler e aos exports GET e POST, explicando o propósito do arquivo e como ele integra o NextAuth com o Next.js App Router |
| `app/api/transactions/route.ts` | ✅ | ✅ | Melhorias implementadas - Status: Excelente (98%) - Vulnerabilidades críticas de segurança corrigidas (migração para NextAuth), validação Zod implementada no POST, mensagens de erro traduzidas para inglês, comentários desnecessários removidos, documentação JSDoc aprimorada, associação automática de transações ao usuário autenticado |
| `app/api/transactions/[id]/route.ts` | ✅ | ✅ | Melhorias implementadas - Status: Excelente (98%) - Vulnerabilidades críticas de segurança corrigidas (migração para NextAuth), validação Zod implementada no PUT, validação de ObjectId em todos os handlers, validação explícita de existência, mensagens de erro traduzidas para inglês, documentação JSDoc completa, validação de propriedade em todas as operações |
| `app/api/transactions/summary/route.ts` | ✅ | ✅ | Melhorias implementadas - Status: Excelente (98%) - Vulnerabilidades críticas de segurança corrigidas (migração para NextAuth), documentação JSDoc completa implementada, mensagens de erro traduzidas para inglês, comentários desnecessários removidos, tipagem explícita melhorada com TransactionSummary |
| `app/api/users/route.ts` | ✅ | ✅ | Melhorias implementadas - Status: Bom (92%) - Vulnerabilidades críticas de segurança corrigidas (migração para NextAuth), GET corrigido para retornar apenas usuário autenticado (proteção de privacidade), validação simplificada no POST (sem Zod) para assumir validação no frontend, validação de email usando EMAIL_REGEX, mensagens de erro traduzidas para inglês, comentários desnecessários removidos, documentação JSDoc completa, senha excluída da resposta |
| `app/api/users/[email]/route.ts` | ✅ | ✅ | Melhorias implementadas - Status: Bom (92%) - Vulnerabilidades críticas de segurança corrigidas (migração para NextAuth), validação simplificada no PUT (sem Zod) para permitir atualizações parciais, validação de email usando EMAIL_REGEX em todos os handlers, mensagens de erro traduzidas para inglês, documentação JSDoc completa, validação de propriedade em todas as operações |

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

