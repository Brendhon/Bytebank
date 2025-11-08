# Análise Arquitetural: Componente WelcomeCard

## 📋 Resumo Executivo
**Status:** ⚠️ Requer Atenção (50-69%)  
O componente WelcomeCard apresenta problemas significativos de arquitetura. As principais infrações incluem: uso desnecessário de `"use client"` para funcionalidade simples, exportação anônima, ausência de JSDoc, falta de acessibilidade crítica (especialmente no botão de visualização), estilos inline no TSX, interface não exportada, uso inadequado do Button do Headless UI, e valores hardcoded em português. Pontos positivos incluem boa tipagem TypeScript, uso de funções de formatação, responsividade, e estrutura visual clara.

**Conformidade:** 52%

## 🚨 Requisitos Técnicos Infringidos

### 1. Uso Desnecessário de "use client" (Prioridade: Crítica)
- **Requisito:** Usar `"use client"` apenas quando absolutamente necessário
- **Documento:** `@docs/guidelines/global.md` - Seção "Performance" - "Server vs Client Components" e `@docs/architecture/performance-optimization.md`
- **Infração:** Linha 1: `"use client"` - Todo o componente é Client Component por causa de um único estado simples (visibilidade do saldo)
- **Impacto:** Aumenta bundle JavaScript no cliente, reduz performance, impede otimizações do React Server Components, aumenta tempo de carregamento inicial

### 2. Exportação Anônima (Prioridade: Crítica)
- **Requisito:** Componentes devem ser exportados com nome explícito usando `export default function ComponentName()`
- **Documento:** `@docs/guidelines/global.md` - Seção "Code Style" e `@docs/Tech Challenge/architectural-analysis-prompt.md` - Seção "Nomenclatura e Estrutura"
- **Infração:** Linha 16: `export default ({ name, balance, accountType, date }: Props) => {` - Exportação anônima
- **Impacto:** Dificulta debugging (aparece como "Anonymous" no React DevTools), prejudica stack traces, viola convenções

### 3. Ausência de JSDoc (Prioridade: Crítica)
- **Requisito:** Interfaces e componentes devem ter documentação JSDoc completa
- **Documento:** `@docs/guidelines/global.md` - Seção "Documentation" e `@docs/Tech Challenge/architectural-analysis-prompt.md` - Seção "Documentação"
- **Infração:** 
  - Ausência de JSDoc na interface `Props` (linha 8)
  - Ausência de JSDoc no componente (linha 16)
- **Impacto:** Dificulta entendimento do código, reduz efetividade do Storybook autodocs, não documenta propósito e uso

### 4. Falta de Acessibilidade Crítica (Prioridade: Crítica)
- **Requisito:** Componentes devem ter atributos ARIA apropriados e HTML semântico conforme WCAG
- **Documento:** `@docs/Tech Challenge/architectural-analysis-prompt.md` - Seção "Acessibilidade (WCAG)"
- **Infração:** 
  - Linha 26: `<div>` genérico como container principal sem semântica
  - Linha 35: `<Button>` do Headless UI sem `aria-label` adequado - usuário de leitor de tela não sabe o que o botão faz
  - Linha 36: Ícone de olho não possui texto alternativo ou contexto
  - Linha 44: Saldo mascarado não informa ao leitor de tela que está oculto
  - Não há `aria-live` para anunciar mudança de estado do saldo
  - Não há semântica HTML adequada para a seção de saldo
- **Impacto:** Componente severamente inacessível para usuários com deficiência visual, viola WCAG 2.1 AA, botão sem propósito identificável, impossibilita navegação adequada

### 5. Estilos Inline no TSX (Prioridade: Alta)
- **Requisito:** Não usar classes Tailwind diretamente no TSX; definir estilos em objeto `styles` com `as const`
- **Documento:** `@docs/guidelines/global.md` - Seção "UI & Styling"
- **Infração:** Linhas 26-47: Classes Tailwind aplicadas diretamente no JSX
- **Impacto:** Dificulta manutenção de estilos, reduz reusabilidade, viola padrão de separação de estilos

### 6. Interface Não Exportada (Prioridade: Alta)
- **Requisito:** Interfaces devem ser exportadas para reutilização
- **Documento:** `@docs/guidelines/global.md` - Seção "TypeScript" e `@docs/Tech Challenge/architectural-analysis-prompt.md` - Seção "TypeScript"
- **Infração:** Linha 8: `interface Props` não é exportada e tem nome genérico
- **Impacto:** Não pode ser reutilizada em outros arquivos, reduz modularidade, dificulta testes

### 7. Uso Inadequado do Headless UI Button (Prioridade: Alta)
- **Requisito:** Usar componentes UI de forma apropriada conforme documentação
- **Documento:** `@docs/guidelines/global.md` - Seção "UI & Styling" - "Component Libraries"
- **Infração:** Linha 4: Importa `Button` do Headless UI mas deveria usar o Button customizado do projeto (`@/components/ui`)
- **Impacto:** Inconsistência de UI, perde variantes e estilos customizados, mistura componentes de diferentes bibliotecas

### 8. Nomenclatura de Interface (Prioridade: Média)
- **Requisito:** Interfaces devem ter nomes descritivos
- **Documento:** `@docs/guidelines/global.md` - Seção "Naming Conventions"
- **Infração:** Linha 8: `interface Props` - Nome genérico demais, deveria ser `WelcomeCardProps`
- **Impacto:** Dificulta busca no código, reduz clareza, conflitos potenciais de nomenclatura

### 9. Valores Hardcoded em Português (Prioridade: Média)
- **Requisito:** Código e comentários devem estar em inglês
- **Documento:** `@docs/guidelines/global.md` - Seção "Best Practices" - "Comments"
- **Infração:** 
  - Linha 19: `accountType = 'Conta Corrente'` - Default value em português
  - Linha 28: "Olá" hardcoded
  - Linha 33: "Saldo" hardcoded
  - Linha 42: "••••••" (ok, mas deveria ter texto alternativo)
- **Impacto:** Inconsistência de idioma, dificulta internacionalização, viola diretriz de idioma

### 10. Prop Opcional Não Utilizada (Prioridade: Baixa)
- **Requisito:** Props devem ter propósito claro e serem utilizadas adequadamente
- **Documento:** `@docs/guidelines/global.md` - Seção "Code Style"
- **Infração:** Linha 12: `showBalance?: boolean` está definida na interface mas nunca é usada no componente
- **Impacto:** Código morto, confusão sobre funcionalidade, interface inconsistente

### 11. Storybook Incompleto (Prioridade: Média)
- **Requisito:** Storybook deve ter `tags: ['autodocs']` e `argTypes` completos
- **Documento:** `@docs/Tech Challenge/architectural-analysis-prompt.md` - Seção "Documentação"
- **Infração:** WelcomeCard.stories.tsx possui `tags: ['autodocs']` mas não tem `argTypes` documentados
- **Impacto:** Documentação automática incompleta, dificulta uso do componente

## ✅ Pontos em Conformidade

1. **TypeScript Forte:** Uso adequado de tipagem sem `any`, props bem definidas
2. **Storybook Configurado:** Arquivo `.stories.tsx` presente com `tags: ['autodocs']`
3. **Uso de Funções Utilitárias:** Uso correto de `formatCurrency` e `formatDateToLong`
4. **Estado Local Simples:** Uso adequado de `useState` para controle de visibilidade
5. **Responsividade:** Classes responsivas aplicadas (`sm:flex-row`)
6. **Estrutura Visual Clara:** Divisão lógica entre saudação e informações de saldo
7. **Feedback Visual:** Ícone muda de Eye para EyeOff conforme estado

## 💡 Pontos de Melhoria

1. **Refatorar para Server Component:** Wrapper Server Component com Client Component interno
2. **Substituir Headless UI Button:** Usar Button do projeto
3. **Adicionar Semântica HTML:** Usar elementos semânticos apropriados
4. **Implementar Acessibilidade Completa:** Adicionar ARIA labels, live regions, contexto para leitores de tela
5. **Criar Objeto de Estilos:** Mover classes para objeto `styles`
6. **Exportar Interface:** Criar interface com nome adequado e exportá-la
7. **Remover Prop Não Utilizada:** Remover `showBalance` ou implementar funcionalidade
8. **Constantes de Texto:** Criar arquivo de constantes para textos
9. **Melhorar Storybook:** Adicionar `argTypes` completos

## 📝 Plano de Ação

### 1. Refatorar Arquitetura de Componente (Prioridade: Crítica)
Separar em Server e Client Components:

**WelcomeCard.tsx (Server Component):**
```typescript
import WelcomeCardClient from './WelcomeCardClient';

/**
 * Props for the WelcomeCard component
 * 
 * @interface WelcomeCardProps
 * @property {string} name - User's name for greeting
 * @property {number} balance - Account balance amount
 * @property {string} [accountType='Checking Account'] - Type of account
 * @property {Date} [date=new Date()] - Date to display
 */
export interface WelcomeCardProps {
  name: string;
  balance: number;
  accountType?: string;
  date?: Date;
}

/**
 * WelcomeCard component displays a greeting with account balance information
 * Server Component wrapper that passes data to client component
 * 
 * @component
 * @example
 * ```tsx
 * <WelcomeCard 
 *   name="John" 
 *   balance={2500} 
 *   accountType="Checking Account" 
 * />
 * ```
 */
export default function WelcomeCard({ 
  name, 
  balance, 
  accountType = 'Checking Account', 
  date = new Date() 
}: WelcomeCardProps) {
  return (
    <WelcomeCardClient 
      name={name} 
      balance={balance} 
      accountType={accountType} 
      date={date} 
    />
  );
}
```

**WelcomeCardClient.tsx (Client Component):**
```typescript
'use client';

import { formatCurrency, formatDateToLong } from '@/lib/formatter';
import { Button } from '@/components/ui';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { WelcomeCardProps } from './WelcomeCard';
import { styles } from './WelcomeCard.styles';
import { WELCOME_CARD_TEXT } from './WelcomeCard.constants';

/**
 * Client-side component for WelcomeCard with interactive balance visibility toggle
 */
export default function WelcomeCardClient({
  name,
  balance,
  accountType = WELCOME_CARD_TEXT.defaultAccountType,
  date = new Date(),
}: WelcomeCardProps) {
  // Use state to manage the visibility of the balance
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  return (
    <article 
      className={styles.container}
      aria-labelledby="welcome-greeting"
      aria-describedby="account-balance"
    >
      <header className={styles.greetingSection}>
        <h2 id="welcome-greeting" className={styles.greeting}>
          {WELCOME_CARD_TEXT.greeting(name)}
        </h2>
        <time 
          className={styles.date}
          dateTime={date.toISOString()}
        >
          {formatDateToLong(date)}
        </time>
      </header>

      <section 
        id="account-balance"
        className={styles.balanceSection}
        aria-label="Account balance information"
      >
        <div className={styles.balanceHeader}>
          <span className={styles.balanceLabel}>
            {WELCOME_CARD_TEXT.balanceLabel}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className={styles.toggleButton}
            onClick={toggleBalanceVisibility}
            aria-label={isBalanceVisible 
              ? WELCOME_CARD_TEXT.ariaLabels.hideBalance 
              : WELCOME_CARD_TEXT.ariaLabels.showBalance
            }
            aria-pressed={isBalanceVisible}
          >
            {isBalanceVisible ? (
              <EyeOff size={24} aria-hidden="true" />
            ) : (
              <Eye size={24} aria-hidden="true" />
            )}
          </Button>
        </div>

        <div className={styles.divider} role="separator" />

        <span className={styles.accountType}>
          {accountType}
        </span>
        <div 
          className={styles.balanceAmount}
          aria-live="polite"
          aria-atomic="true"
        >
          {isBalanceVisible ? (
            <span aria-label={`Balance: ${formatCurrency(balance)}`}>
              {formatCurrency(balance)}
            </span>
          ) : (
            <>
              <span aria-label="Balance hidden">••••••</span>
              <span className="sr-only">
                {WELCOME_CARD_TEXT.ariaLabels.balanceHidden}
              </span>
            </>
          )}
        </div>
      </section>
    </article>
  );
}
```

### 2. Criar Objeto de Estilos (Prioridade: Alta)
**WelcomeCard.styles.ts:**
```typescript
/**
 * Styles for WelcomeCard component
 */
export const styles = {
  container: 'bg-dark text-white p-6 rounded-md shadow-md flex justify-between items-start gap-6 flex-col sm:flex-row',
  greetingSection: '',
  greeting: 'text-24',
  date: 'text-base mt-2',
  balanceSection: 'w-[125px] flex flex-col items-end gap-1',
  balanceHeader: 'w-full flex items-center justify-between gap-2 text-orange font-medium text-16',
  balanceLabel: '',
  toggleButton: 'cursor-pointer',
  divider: 'w-full border-orange my-2',
  accountType: 'text-sm',
  balanceAmount: 'text-lg font-bold',
} as const;
```

### 3. Criar Constantes de Texto (Prioridade: Alta)
**WelcomeCard.constants.ts:**
```typescript
/**
 * Text constants for WelcomeCard component
 * Prepared for future internationalization
 */
export const WELCOME_CARD_TEXT = {
  greeting: (name: string) => `Hello, ${name}! :)`,
  balanceLabel: 'Balance',
  defaultAccountType: 'Checking Account',
  hiddenBalance: '••••••',
  ariaLabels: {
    showBalance: 'Show account balance',
    hideBalance: 'Hide account balance',
    balanceHidden: 'Your balance is currently hidden. Click the eye icon to reveal it.',
    balanceSection: 'Account balance information',
  },
} as const;
```

### 4. Adicionar JSDoc Completo (Prioridade: Crítica)
Já incluído no Plano de Ação 1.

### 5. Atualizar Storybook (Prioridade: Média)
**WelcomeCard.stories.tsx:**
```typescript
import { Meta, StoryObj } from '@storybook/react';
import WelcomeCard from './WelcomeCard';

const meta: Meta<typeof WelcomeCard> = {
  component: WelcomeCard,
  tags: ['autodocs'],
  title: 'Components/Cards/WelcomeCard',
  parameters: {
    docs: {
      description: {
        component: 'Displays a personalized greeting with account balance information. Users can toggle balance visibility for privacy.',
      },
    },
  },
  argTypes: {
    name: {
      control: 'text',
      description: "User's name for personalized greeting",
      table: {
        type: { summary: 'string' },
      },
    },
    balance: {
      control: 'number',
      description: 'Account balance amount (will be formatted as currency)',
      table: {
        type: { summary: 'number' },
      },
    },
    accountType: {
      control: 'text',
      description: 'Type of account (e.g., Checking Account, Savings Account)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Checking Account' },
      },
    },
    date: {
      control: 'date',
      description: 'Date to display (will be formatted to long format)',
      table: {
        type: { summary: 'Date' },
        defaultValue: { summary: 'new Date()' },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof WelcomeCard>;

export const Default: Story = {
  args: {
    name: 'Joana',
    balance: 2500,
    accountType: 'Checking Account',
  },
};

export const HighBalance: Story = {
  args: {
    name: 'John',
    balance: 125000.50,
    accountType: 'Premium Checking',
  },
};

export const SavingsAccount: Story = {
  args: {
    name: 'Maria',
    balance: 5000,
    accountType: 'Savings Account',
  },
};

export const LongName: Story = {
  args: {
    name: 'João Pedro da Silva Santos',
    balance: 3500,
    accountType: 'Checking Account',
  },
};
```

### 6. Implementar Testes de Acessibilidade (Prioridade: Baixa)
Adicionar teste para verificar acessibilidade:

```typescript
/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WelcomeCardClient from './WelcomeCardClient';

describe('WelcomeCard Accessibility', () => {
  it('should have proper ARIA labels', () => {
    render(
      <WelcomeCardClient 
        name="John" 
        balance={2500} 
        accountType="Checking Account" 
      />
    );

    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toHaveAttribute('aria-label', 'Show account balance');
    expect(toggleButton).toHaveAttribute('aria-pressed', 'false');
  });

  it('should announce balance visibility changes', async () => {
    const user = userEvent.setup();
    render(
      <WelcomeCardClient 
        name="John" 
        balance={2500} 
        accountType="Checking Account" 
      />
    );

    const toggleButton = screen.getByRole('button');
    await user.click(toggleButton);

    expect(toggleButton).toHaveAttribute('aria-label', 'Hide account balance');
    expect(toggleButton).toHaveAttribute('aria-pressed', 'true');
  });
});
```

## 📊 Mapeamento
**Arquivo:** `src/components/cards/WelcomeCard/WelcomeCard.tsx`  
**Status:** ✅ Criado  
**Link:** `@docs/Tech Challenge/analysis-mapping.md`

