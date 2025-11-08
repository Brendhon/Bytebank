# Análise Arquitetural: Componente CreditCard

## 📋 Resumo Executivo
**Status:** 🔴 Crítico (<50%)  
O componente CreditCard apresenta múltiplas violações de padrões de código e acessibilidade. As principais preocupações são: exportação anônima, ausência de JSDoc, falta de acessibilidade WCAG, estilos inline no TSX, e interface duplicada. O componente também não possui validação de entrada adequada.

**Conformidade:** 30%

## 🚨 Requisitos Técnicos Infringidos

### 1. Exportação Anônima (Prioridade: Crítica)
- **Requisito:** Componentes devem ser exportados com nome explícito usando `export default function ComponentName()`
- **Documento:** `@docs/guidelines/global.md` - Seção "Code Style" e `@docs/Tech Challenge/architectural-analysis-prompt.md` - Seção "Nomenclatura e Estrutura"
- **Infração:** Linha 10: `export default ({ ... }: CreditCardProps) => {` - Exportação anônima
- **Impacto:** Dificulta debugging (aparece como "Anonymous" no React DevTools), prejudica stack traces, viola convenções

### 2. Ausência de JSDoc (Prioridade: Crítica)
- **Requisito:** Interfaces e componentes devem ter documentação JSDoc completa
- **Documento:** `@docs/guidelines/global.md` - Seção "Documentation" e `@docs/Tech Challenge/architectural-analysis-prompt.md` - Seção "Documentação"
- **Infração:** Ausência de JSDoc na interface `CreditCardProps` (linha 4) e no componente (linha 10)
- **Impacto:** Dificulta entendimento do código, reduz efetividade do Storybook autodocs, não documenta comportamento do componente

### 3. Falta de Acessibilidade (Prioridade: Crítica)
- **Requisito:** Componentes devem ter atributos ARIA apropriados e HTML semântico conforme WCAG
- **Documento:** `@docs/Tech Challenge/architectural-analysis-prompt.md` - Seção "Acessibilidade (WCAG)"
- **Infração:** 
  - Linha 31: `<div>` genérico sem role ou aria-label
  - Dados do cartão não possuem contexto para leitores de tela
  - Estado "Bloqueado" não é anunciado adequadamente
  - Informações mascaradas (`••••`) não informam usuário que dados estão ocultos
- **Impacto:** Cartão inacessível para usuários com deficiência visual, viola WCAG 2.1 AA, impossibilita compreensão adequada do conteúdo

### 4. Estilos Inline no TSX (Prioridade: Alta)
- **Requisito:** Não usar classes Tailwind diretamente no TSX; definir estilos em objeto `styles` com `as const`
- **Documento:** `@docs/guidelines/global.md` - Seção "UI & Styling"
- **Infração:** Linhas 31-56: Classes Tailwind aplicadas diretamente no JSX
- **Impacto:** Dificulta manutenção de estilos, reduz reusabilidade, viola padrão de separação de estilos

### 5. Interface Duplicada/Estendida (Prioridade: Alta)
- **Requisito:** Interfaces devem ser claras e evitar duplicação
- **Documento:** `@docs/guidelines/global.md` - Seção "TypeScript" - "Prefer interfaces"
- **Infração:** Linha 4: `CreditCardProps extends ICreditCard` - Interface duplica propriedades já definidas em `ICreditCard`
- **Impacto:** Confusão sobre qual interface usar, possível duplicação de código, falta de clareza

### 6. Falta de Validação de Input (Prioridade: Alta)
- **Requisito:** Dados devem ser validados antes de serem processados
- **Documento:** `@docs/guidelines/global.md` - Seção "Best Practices"
- **Infração:** Não há validação de formato para `number`, `expiration`
- **Impacto:** Aceita dados inválidos, pode causar bugs, não valida formato de cartão

### 7. Lógica de Negócio no Componente (Prioridade: Média)
- **Requisito:** Separar lógica de apresentação da lógica de negócio
- **Documento:** `@docs/architecture/modular-architecture.md` - Seção "Separação de Responsabilidades"
- **Infração:** Linhas 22-28: Lógica de formatação de nome dentro do componente
- **Impacto:** Componente acumula responsabilidades, dificulta testes unitários, viola Single Responsibility Principle

### 8. Valores Hardcoded (Prioridade: Média)
- **Requisito:** Evitar valores hardcoded, usar constantes ou configuração
- **Documento:** `@docs/guidelines/global.md` - Seção "Best Practices"
- **Infração:** 
  - Linha 39: "Byte" hardcoded
  - Linha 40: "Platinum" hardcoded
  - Linha 42: "Bloqueado" hardcoded (texto em português)
- **Impacto:** Dificulta internacionalização, reduz flexibilidade, viola princípio DRY

### 9. Semântica HTML Inadequada (Prioridade: Média)
- **Requisito:** Usar HTML semântico apropriado
- **Documento:** `@docs/Tech Challenge/architectural-analysis-prompt.md` - Seção "Acessibilidade (WCAG)"
- **Infração:** Uso excessivo de `<div>` e `<span>` genéricos sem semântica
- **Impacto:** Reduz acessibilidade, dificulta interpretação por leitores de tela

## ✅ Pontos em Conformidade

1. **TypeScript Forte:** Uso adequado de tipagem sem `any`
2. **Storybook Configurado:** Arquivo `.stories.tsx` presente com `tags: ['autodocs']` e múltiplas variantes
3. **Uso de Utilitários:** Uso correto da função `cn` para composição de classes
4. **Componentização:** Estrutura de componente funcional adequada
5. **Condicional de Variante:** Lógica para diferenciar cartão físico/digital

## 💡 Pontos de Melhoria

1. **Criar Utilitário de Formatação:** Mover lógica de nome para função utilitária
2. **Validação de Formato:** Adicionar validação de Luhn para número do cartão
3. **Objeto de Estilos:** Criar objeto `styles` com todas as classes
4. **Constantes de Configuração:** Criar arquivo de constantes para textos e configurações
5. **Melhorar Storybook:** Adicionar documentação completa na documentação

## 📝 Plano de Ação

### 1. Adicionar Exportação Nomeada e JSDoc (Prioridade: Crítica)
```typescript
/**
 * Props for the CreditCard component
 * 
 * @interface CreditCardProps
 * @property {'physical' | 'digital'} variant - Type of credit card (physical or digital)
 * @property {boolean} showInfo - Whether to show card information
 * @property {boolean} blocked - Whether the card is blocked
 * @property {string} name - Cardholder name
 * @property {string} number - Card number
 * @property {string} expiration - Card expiration date (MM/YY format)
 */
export interface CreditCardProps {
  variant: "physical" | "digital";
  showInfo: boolean;
  blocked: boolean;
  name: string;
  number: string;
  expiration: string;
}

/**
 * CreditCard component displays a stylized credit card
 * 
 * @component
 * @example
 * ```tsx
 * <CreditCard 
 *   variant="physical" 
 *   showInfo={false}
 *   blocked={false}
 *   name="John Doe"
 *   number="1234 5678 9012 3456"
 *   expiration="12/25"
 * />
 * ```
 */
export default function CreditCard(props: CreditCardProps) {
  // ... component implementation
}
```

### 2. Implementar Acessibilidade Completa (Prioridade: Crítica)
```typescript
export default function CreditCard({
  variant,
  showInfo,
  name,
  blocked,
  number,
  expiration,
}: CreditCardProps) {
  const isPhysical = variant === "physical";
  const cardType = isPhysical ? "Physical" : "Digital";
  const formattedName = formatCardholderName(name);

  return (
    <article
      className={cn(styles.container, isPhysical ? styles.physical : styles.digital)}
      role="article"
      aria-label={`${cardType} credit card${blocked ? ', blocked' : ''}`}
      aria-describedby="card-details"
    >
      <header className={styles.header}>
        <div className={styles.brandContainer}>
          <div className={styles.brandName} aria-label="Card brand: Byte">
            Byte
          </div>
          <div className={styles.cardTier} aria-label="Card tier: Platinum">
            Platinum
          </div>
        </div>
        {blocked && (
          <span 
            className={styles.blockedBadge}
            role="status"
            aria-live="polite"
            aria-label="Card status: Blocked"
          >
            Blocked
          </span>
        )}
      </header>

      <div 
        className={styles.detailsContainer}
        id="card-details"
      >
        <div className={styles.detailsRow}>
          <span aria-label={`Cardholder: ${formattedName}`}>
            {formattedName}
          </span>
          <span aria-label={`Expiration: ${showInfo ? expiration : 'hidden'}`}>
            {showInfo ? expiration : '••••'}
          </span>
        </div>

        <div className={styles.detailsRow}>
          <span 
            aria-label={`Card number: ${showInfo ? number : 'hidden'}`}
          >
            {showInfo ? number : '•••• •••• •••• ••••'}
          </span>
        </div>
      </div>
      
      {!showInfo && (
        <span className="sr-only">
          Card information is hidden. Enable visibility to view details.
        </span>
      )}
    </article>
  );
}
```

### 3. Criar Utilitários de Formatação (Prioridade: Alta)
Criar arquivo `@/lib/cardUtils.ts`:

```typescript
/**
 * Formats cardholder name to show first and last name only
 * @param {string} fullName - Full name of the cardholder
 * @returns {string} Formatted name (First Last)
 */
export function formatCardholderName(fullName: string): string {
  const nameParts = fullName.trim().split(/\s+/);
  
  if (nameParts.length === 0) return '';
  if (nameParts.length === 1) return nameParts[0];
  
  return `${nameParts[0]} ${nameParts[nameParts.length - 1]}`;
}

/**
 * Validates card number using Luhn algorithm
 * @param {string} cardNumber - Card number to validate
 * @returns {boolean} Whether the card number is valid
 */
export function validateCardNumber(cardNumber: string): boolean {
  const cleaned = cardNumber.replace(/\s/g, '');
  
  if (!/^\d{13,19}$/.test(cleaned)) return false;
  
  let sum = 0;
  let isEven = false;
  
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i]);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
}

```

### 4. Criar Objeto de Estilos (Prioridade: Alta)
```typescript
const styles = {
  container: 'rounded-md text-white p-4 w-[270px] h-[150px] flex flex-col justify-between',
  physical: 'bg-blue',
  digital: 'bg-gray',
  header: 'flex items-center justify-between',
  brandContainer: 'flex flex-col gap-1',
  brandName: 'italic text-24 font-semibold',
  cardTier: 'text-sm',
  blockedBadge: 'text-white text-14-semi bg-dark rounded-md p-2',
  detailsContainer: 'flex flex-col gap-1',
  detailsRow: 'flex justify-between text-center text-14',
} as const;
```

### 5. Criar Constantes de Configuração (Prioridade: Média)
Criar arquivo `CreditCard.constants.ts`:

```typescript
/**
 * Credit card configuration constants
 */
export const CARD_CONFIG = {
  brand: {
    name: 'Byte',
    tier: 'Platinum',
  },
  labels: {
    blocked: 'Blocked',
    hidden: '••••',
  },
  dimensions: {
    width: 270,
    height: 150,
  },
} as const;
```

### 6. Atualizar Storybook com Documentação Completa (Prioridade: Média)
```typescript
const meta: Meta<typeof CreditCard> = {
  component: CreditCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: 'CreditCard component displays a stylized credit card.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['physical', 'digital'],
      description: 'Type of credit card (physical or digital)',
    },
    showInfo: {
      control: 'boolean',
      description: 'Whether to show card information (expiration and number)',
    },
    blocked: {
      control: 'boolean',
      description: 'Whether the card is blocked',
    },
    name: {
      control: 'text',
      description: 'Cardholder full name (will be formatted to show first and last name only)',
    },
    number: {
      control: 'text',
      description: 'Card number',
    },
    expiration: {
      control: 'text',
      description: 'Card expiration date (MM/YY format)',
    },
  },
  args: {
    name: "Joana Fonseca Gomes",
    blocked: false,
    number: "1234 5678 9012 3456",
    expiration: "12/34",
    variant: "physical",
  },
};
```

## 📊 Mapeamento
**Arquivo:** `src/components/cards/CreditCard/CreditCard.tsx`  
**Status:** ✅ Criado  
**Link:** `@docs/Tech Challenge/analysis-mapping.md`

