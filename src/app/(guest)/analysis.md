# Análise Arquitetural: Layout Guest

## 📋 Resumo Executivo

**Status:** ⚠️ Requer Atenção (62%)

O layout guest (`(guest)/layout.tsx`) é um Client Component que gerencia a estrutura base para usuários não autenticados, incluindo Header, Footer, e modais de Login e Registro. O componente implementa lógica de autenticação e registro de usuários, gerenciando estado local para controle de modais. A estrutura é funcional e organiza bem os elementos da página, mas viola várias diretrizes importantes: uso de `any` para tratamento de erros, falta de documentação JSDoc, ausência de interface para props, falta de memoização com `useCallback` para funções passadas como props, e lógica de negócio que deveria estar em hooks ou services. Além disso, há comentários em português misturados com inglês, e falta tratamento adequado de estados de loading.

**Conformidade:** 62%

---

## 🚨 Requisitos Técnicos Infringidos

### 1. Uso de `any` para Tratamento de Erros (Prioridade: Alta)

- **Requisito:** Código deve ser estritamente tipado, sem uso de `any`. Usar `unknown` para type-safe flexibility quando necessário.
- **Documento:** `@docs/guidelines/global.md` - Seção "TypeScript"
- **Infração:** Linha 75 utiliza `catch (error: any)` em vez de `error: unknown`.
- **Impacto:** Perda de type-safety, dificulta tratamento seguro de erros, e pode mascarar problemas de tipagem.

### 2. Falta de Documentação JSDoc (Prioridade: Alta)

- **Requisito:** A interface de props e a assinatura do componente possuem documentação JSDoc clara e completa.
- **Documento:** `@docs/analysis/component-analysis-prompt.md` - Seção "6. Documentação"
- **Infração:** O componente não possui documentação JSDoc explicando seu propósito, props, e comportamento.
- **Impacto:** Dificulta a compreensão do componente, especialmente a lógica complexa de autenticação e registro.

### 3. Falta de Interface para Props (Prioridade: Alta)

- **Requisito:** As props e outros tipos são definidos em interfaces com nomes descritivos (e.g., `ComponentNameProps`) e exportados para reutilização.
- **Documento:** `@docs/analysis/component-analysis-prompt.md` - Seção "1. Nomenclatura e Estrutura de Arquivos"
- **Infração:** Linha 13 utiliza props inline `{ children: ReactNode }` em vez de interface `GuestLayoutProps`.
- **Impacto:** Dificulta reutilização do tipo, reduz type-safety, e torna difícil adicionar novas props no futuro.

### 4. Falta de Memoização com `useCallback` (Prioridade: Alta)

- **Requisito:** `useCallback` é utilizado para funções passadas como props a componentes memoizados.
- **Documento:** `@docs/guidelines/global.md` - Seção "Performance > React Hooks Optimization"
- **Infração:** Funções `onLoginSubmit` (linha 25) e `onRegisterSubmit` (linha 50) são passadas como props para componentes (`LoginForm`, `RegisterForm`) mas não são memoizadas com `useCallback`.
- **Impacto:** Cria novas instâncias de funções a cada render, causando re-renderizações desnecessárias de componentes filhos e impactando performance.

### 5. Falta de Nome de Função (Prioridade: Média)

- **Requisito:** Componentes devem ser exportados de forma explícita com nomes descritivos.
- **Documento:** `@docs/analysis/component-analysis-prompt.md` - Seção "1. Nomenclatura e Estrutura de Arquivos"
- **Infração:** Linha 13 utiliza arrow function anônima `export default ({ children }: { children: ReactNode }) => {` em vez de função nomeada.
- **Impacto:** Dificulta debugging (componente aparece como "Anonymous" no React DevTools) e reduz rastreabilidade.

### 6. Comentários em Português (Prioridade: Média)

- **Requisito:** Todos os comentários devem ser em inglês.
- **Documento:** `@docs/guidelines/global.md` - Seção "Best Practices > Comments"
- **Infração:** Comentários estão em inglês (linhas 14, 18, 21, 24, 27, 33, 36, 39, 42, 44, 49, 51, 59, 61, 64, 67, 70, 76, 79, 86, 93, 98, 101), mas mensagens de toast estão em português (linhas 34, 45, 65, 77). Mensagens de UI podem estar em português, mas comentários de código devem estar em inglês.
- **Impacto:** Inconsistência na documentação do código, violando diretrizes globais.

### 7. Lógica de Negócio no Componente (Prioridade: Média)

- **Requisito:** O componente tem uma responsabilidade única e bem definida, delegando lógicas de negócio para hooks ou serviços.
- **Documento:** `@docs/analysis/component-analysis-prompt.md` - Seção "7. Boas Práticas de React"
- **Infração:** Lógica de autenticação (`onLoginSubmit`) e registro (`onRegisterSubmit`) está diretamente no componente em vez de estar em hooks customizados.
- **Impacto:** Viola separação de responsabilidades, dificulta reutilização da lógica, e torna o componente difícil de testar.

### 8. Uso de `console.error` para Logging (Prioridade: Baixa)

- **Requisito:** Sistema de logging adequado em vez de `console.error` direto.
- **Documento:** Boas práticas de desenvolvimento
- **Infração:** Linhas 43 e 80 utilizam `console.error` diretamente.
- **Impacto:** Logging não estruturado, dificulta monitoramento em produção, e pode expor informações sensíveis.

### 9. Falta de Estados de Loading (Prioridade: Baixa)

- **Requisito:** Feedback visual durante operações assíncronas.
- **Documento:** Boas práticas de UX
- **Infração:** Não há estados de loading durante `onLoginSubmit` e `onRegisterSubmit`, deixando o usuário sem feedback durante as operações.
- **Impacto:** Pior experiência do usuário, usuário pode clicar múltiplas vezes pensando que nada está acontecendo.

---

## Pontos em Conformidade

1. **Client Component Apropriado:**
   - Uso correto de `'use client'` pois o componente precisa de hooks (`useState`, `useRouter`, `useToast`)

2. **TypeScript:**
   - Código é TypeScript, com tipagem adequada (exceto uso de `any`)

3. **Separação de Componentes:**
   - Uso adequado de componentes reutilizáveis (`Header`, `Footer`, `LoginForm`, `RegisterForm`)

4. **Estrutura Semântica:**
   - Uso de `<main>` para conteúdo principal (linha 94)

5. **Gerenciamento de Estado Local:**
   - Uso apropriado de `useState` para estado local de modais

6. **Tratamento de Erros:**
   - Try-catch implementado para `onRegisterSubmit` (linha 60)

7. **Feedback ao Usuário:**
   - Uso de toast para feedback de sucesso e erro

8. **Integração com NextAuth:**
   - Uso correto de `signIn` do NextAuth para autenticação

---

## Pontos de Melhoria

1. **Uso de `unknown` em vez de `any`:**
   - Substituir `error: any` por `error: unknown` e fazer type guard apropriado

2. **Documentação JSDoc:**
   - Adicionar documentação completa do componente e suas funções

3. **Interface para Props:**
   - Criar interface `GuestLayoutProps` para tipar props

4. **Memoização com `useCallback`:**
   - Memoizar funções passadas como props para evitar re-renderizações

5. **Nome de Função:**
   - Usar função nomeada em vez de arrow function anônima

6. **Custom Hooks:**
   - Extrair lógica de autenticação e registro para hooks customizados (`useAuth`, `useRegister`)

7. **Estados de Loading:**
   - Adicionar estados de loading durante operações assíncronas

8. **Sistema de Logging:**
   - Implementar sistema de logging estruturado em vez de `console.error`

9. **Tratamento de Erros Mais Robusto:**
   - Melhorar tratamento de erros com tipos específicos e mensagens mais descritivas

10. **Validação de Dados:**
    - Adicionar validação adicional antes de chamar serviços

---

## 🎨 Design Patterns Utilizados

1. **Layout Composition Pattern:**
   - **Localização:** Linhas 84-113
   - **Descrição:** Estrutura hierárquica de layout composta por Header, main content, Footer e modais.
   - **Benefício:** Permite composição flexível e reutilização de componentes de layout.

2. **Provider Pattern (implícito):**
   - **Localização:** Uso de `useToast` hook (linha 22)
   - **Descrição:** Utiliza Context API através do hook `useToast` para acessar funcionalidades globais de toast.
   - **Benefício:** Acesso a funcionalidades globais sem prop drilling.

3. **State Management Pattern:**
   - **Localização:** Linhas 15-16
   - **Descrição:** Uso de `useState` para gerenciar estado local de modais.
   - **Benefício:** Estado encapsulado e gerenciado localmente, seguindo princípios do React.

---

## 🏗️ Princípios SOLID Implementados

### Implementados

1. **Single Responsibility Principle (SRP):**
   - **Evidência:** O componente tem responsabilidade única: gerenciar layout e modais para usuários guest.
   - **Benefício:** Código mais fácil de entender e manter.

2. **Dependency Inversion Principle (DIP):**
   - **Evidência:** O componente depende de abstrações (componentes `Header`, `Footer`, `LoginForm`, `RegisterForm`, hooks `useToast`, `useRouter`, e serviços `registerUser`, `signIn`) em vez de implementações concretas.
   - **Benefício:** Baixo acoplamento e alta testabilidade.

### A Implementar

1. **Open/Closed Principle (OCP):**
   - **Justificativa:** O componente não é facilmente extensível. Adicionar novas funcionalidades requer modificar o código existente.
   - **Plano:** Considerar usar composição ou props opcionais para permitir extensão sem modificação.

2. **Interface Segregation Principle (ISP):**
   - **Justificativa:** As funções `onLoginSubmit` e `onRegisterSubmit` poderiam ser separadas em interfaces mais específicas.
   - **Plano:** Criar hooks customizados que implementem interfaces específicas para autenticação e registro.

---

## Plano de Ação

### 1. Substituir `any` por `unknown` (Prioridade: Alta)

- Usar `unknown` e fazer type guard apropriado para tratamento seguro de erros

**Código exemplo:**
```typescript
} catch (error: unknown) {
  // Type guard for Error
  const errorMessage = error instanceof Error 
    ? error.message 
    : 'Erro ao criar conta';
  
  showErrorToast({ message: errorMessage });
  console.error(error);
}
```

### 2. Adicionar Documentação JSDoc (Prioridade: Alta)

- Adicionar documentação completa do componente e funções

**Código exemplo:**
```typescript
/**
 * Guest layout component that wraps guest pages.
 * 
 * Provides:
 * - Header with guest actions (login, register)
 * - Footer
 * - Login and Register modals
 * - Authentication and registration logic
 * 
 * @component
 * @returns {JSX.Element} Guest layout structure
 */
export default function GuestLayout({ children }: GuestLayoutProps) {
  // ...
}

/**
 * Handles user login submission.
 * 
 * @param {LoginFormData} data - Login form data (email and password)
 * @param {boolean} [hideToast=false] - Whether to hide success toast message
 * @returns {Promise<void>}
 */
const onLoginSubmit = async (data: LoginFormData, hideToast = false) => {
  // ...
}
```

### 3. Criar Interface para Props (Prioridade: Alta)

- Criar interface `GuestLayoutProps` para tipar props

**Código exemplo:**
```typescript
/**
 * Props for the GuestLayout component.
 */
export interface GuestLayoutProps {
  /**
   * Child components to render inside the layout.
   */
  children: ReactNode;
}

export default function GuestLayout({ children }: GuestLayoutProps) {
  // ...
}
```

### 4. Memoizar Funções com `useCallback` (Prioridade: Alta)

- Memoizar funções passadas como props para evitar re-renderizações

**Código exemplo:**
```typescript
import { useCallback } from 'react';

const onLoginSubmit = useCallback(async (data: LoginFormData, hideToast = false) => {
  const response = await signIn('credentials', {
    redirect: false,
    email: data.email,
    password: data.password,
  });

  if (response?.ok) {
    if (!hideToast) showSuccessToast({ message: 'Login realizado com sucesso!' });
    setIsLoginOpen(false);
    router.push('/dashboard');
  } else {
    console.error('Login failed:', response?.error);
    showErrorToast({ message: 'Email ou senha inválidos' });
  }
}, [showSuccessToast, showErrorToast, router]);

const onRegisterSubmit = useCallback(async (formData: RegisterFormData) => {
  const data: IUser = {
    name: formData.name,
    email: formData.email,
    password: formData.password,
    acceptPrivacy: formData.acceptPrivacy
  };

  try {
    await registerUser(data);
    showSuccessToast({ message: 'Conta criada com sucesso!' });
    setIsRegisterOpen(false);
    await onLoginSubmit({
      email: formData.email,
      password: formData.password,
    }, true);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Erro ao criar conta';
    showErrorToast({ message: errorMessage });
    console.error(error);
  }
}, [registerUser, showSuccessToast, showErrorToast, setIsRegisterOpen, onLoginSubmit]);
```

### 5. Usar Função Nomeada (Prioridade: Média)

- Substituir arrow function anônima por função nomeada

**Código exemplo:**
```typescript
export default function GuestLayout({ children }: GuestLayoutProps) {
  // ...
}
```

### 6. Extrair Lógica para Custom Hooks (Prioridade: Média)

- Criar hooks customizados para autenticação e registro

**Código exemplo:**
```typescript
// hooks/useAuth.ts
export function useAuth() {
  const router = useRouter();
  const { showSuccessToast, showErrorToast } = useToast();

  const login = useCallback(async (data: LoginFormData, hideToast = false) => {
    const response = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (response?.ok) {
      if (!hideToast) showSuccessToast({ message: 'Login realizado com sucesso!' });
      router.push('/dashboard');
      return true;
    } else {
      console.error('Login failed:', response?.error);
      showErrorToast({ message: 'Email ou senha inválidos' });
      return false;
    }
  }, [showSuccessToast, showErrorToast, router]);

  return { login };
}

// hooks/useRegister.ts
export function useRegister() {
  const { showSuccessToast, showErrorToast } = useToast();
  const { login } = useAuth();

  const register = useCallback(async (formData: RegisterFormData) => {
    const data: IUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      acceptPrivacy: formData.acceptPrivacy
    };

    try {
      await registerUser(data);
      showSuccessToast({ message: 'Conta criada com sucesso!' });
      await login({
        email: formData.email,
        password: formData.password,
      }, true);
      return true;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Erro ao criar conta';
      showErrorToast({ message: errorMessage });
      console.error(error);
      return false;
    }
  }, [registerUser, showSuccessToast, showErrorToast, login]);

  return { register };
}

// layout.tsx
export default function GuestLayout({ children }: GuestLayoutProps) {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const { login } = useAuth();
  const { register } = useRegister();

  const onLoginSubmit = useCallback(async (data: LoginFormData) => {
    const success = await login(data);
    if (success) {
      setIsLoginOpen(false);
    }
  }, [login]);

  const onRegisterSubmit = useCallback(async (formData: RegisterFormData) => {
    const success = await register(formData);
    if (success) {
      setIsRegisterOpen(false);
    }
  }, [register]);

  // ...
}
```

### 7. Adicionar Estados de Loading (Prioridade: Baixa)

- Adicionar estados de loading durante operações assíncronas

**Código exemplo:**
```typescript
const [isLoading, setIsLoading] = useState(false);

const onLoginSubmit = useCallback(async (data: LoginFormData, hideToast = false) => {
  setIsLoading(true);
  try {
    const response = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (response?.ok) {
      if (!hideToast) showSuccessToast({ message: 'Login realizado com sucesso!' });
      setIsLoginOpen(false);
      router.push('/dashboard');
    } else {
      console.error('Login failed:', response?.error);
      showErrorToast({ message: 'Email ou senha inválidos' });
    }
  } finally {
    setIsLoading(false);
  }
}, [showSuccessToast, showErrorToast, router]);
```

### 8. Código Completo Refatorado (Exemplo)

```typescript
'use client';

import { LoginForm, RegisterForm } from "@/components/form";
import { Footer, Header } from "@/components/layout";
import { useAuth, useRegister } from "@/hooks";
import { LoginFormData, RegisterFormData } from "@/schemas";
import { ReactNode, useCallback, useState } from "react";

/**
 * Props for the GuestLayout component.
 */
export interface GuestLayoutProps {
  /**
   * Child components to render inside the layout.
   */
  children: ReactNode;
}

/**
 * Guest layout component that wraps guest pages.
 * 
 * Provides:
 * - Header with guest actions (login, register)
 * - Footer
 * - Login and Register modals
 * - Authentication and registration logic
 * 
 * @component
 * @param {GuestLayoutProps} props - Component props
 * @returns {JSX.Element} Guest layout structure
 */
export default function GuestLayout({ children }: GuestLayoutProps) {
  // State to manage modals
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Custom hooks for authentication and registration
  const { login } = useAuth();
  const { register } = useRegister();

  // Handle login submission
  const onLoginSubmit = useCallback(async (data: LoginFormData) => {
    const success = await login(data);
    if (success) {
      setIsLoginOpen(false);
    }
  }, [login]);

  // Handle account registration
  const onRegisterSubmit = useCallback(async (formData: RegisterFormData) => {
    const success = await register(formData);
    if (success) {
      setIsRegisterOpen(false);
    }
  }, [register]);

  return (
    <>
      {/* Header */}
      <Header
        variant="guest"
        onOpenAccount={() => setIsRegisterOpen(true)}
        onLogin={() => setIsLoginOpen(true)}
      />

      {/* Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <RegisterForm
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSubmit={onRegisterSubmit}
      />
      <LoginForm
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSubmit={onLoginSubmit}
      />
    </>
  );
}
```

---

## 📊 Mapeamento

**Arquivo:** `src/app/(guest)/layout.tsx`  
**Status:** ✅ Criado  
**Link:** `@docs/analysis/analysis-mapping.md`

