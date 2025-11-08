# Análise Arquitetural: Componente: AccountForm

## 📋 Resumo Executivo

**Status:** ⚠️ Requer Atenção (70%)

O componente `AccountForm` apresenta uma implementação funcional e bem estruturada, utilizando corretamente React Hook Form e Zod para validação. No entanto, foram identificadas violações críticas relacionadas à **acessibilidade (WCAG)** e **padrões de código** estabelecidos nas diretrizes do projeto. As principais infrações incluem: ausência de documentação JSDoc, exportação de componente sem nome explícito, classes Tailwind não isoladas em objeto de estilos, falta de atributos ARIA para acessibilidade e interface de props não exportada. Embora o componente funcione adequadamente, é necessário realizar ajustes para alinhá-lo completamente aos padrões arquiteturais e de qualidade do projeto.

**Conformidade:** 70%

---

## 🚨 Requisitos Técnicos Infringidos

### 1. Acessibilidade (WCAG) - Atributos ARIA Ausentes (Prioridade: Crítica)

- **Requisito:** Elementos interativos e não-semânticos devem possuir atributos ARIA apropriados (`aria-label`, `aria-describedby`, `role`) para garantir acessibilidade a leitores de tela.
- **Documento:** `@docs/Tech Challenge/component-analysis-prompt.md` - Seção "3. Acessibilidade (WCAG)"
- **Infração:**
  - **Linha 111-116:** Os botões "Excluir conta" e "Salvar alterações" não possuem `aria-label` descritivo. Embora contenham texto visível, não há indicação clara do contexto para leitores de tela sobre o que a ação afeta (ex: "Excluir permanentemente minha conta do Bytebank").
  - **Linha 128-148:** O componente `Modal` não possui atributos ARIA essenciais como `role="dialog"`, `aria-modal="true"`, `aria-labelledby` ou `aria-describedby` para associar o título e descrição ao modal.
  - **Linha 134:** O botão de submit do modal não possui `aria-disabled` quando está desabilitado (`isSubmitDisabled`), dificultando a compreensão do estado para tecnologias assistivas.
- **Impacto:** Usuários de leitores de tela e outras tecnologias assistivas não conseguem navegar ou compreender completamente o componente, violando critérios WCAG 2.1 de nível A e AA. Isso compromete a inclusão e pode resultar em não conformidade legal (como a Lei Brasileira de Inclusão - LBI).

### 2. Nomenclatura e Exportação de Componente (Prioridade: Alta)

- **Requisito:** O componente deve ser exportado com um nome explícito, utilizando `export default function ComponentName(...)` ou `export const ComponentName = (...)`.
- **Documento:** `@docs/Tech Challenge/component-analysis-prompt.md` - Seção "1. Nomenclatura e Estrutura de Arquivos"
- **Infração:**
  - **Linha 18:** O componente é exportado como `export default ({ onDelete, onSubmit, defaultValues }: AccountFormProps) => {...}`, ou seja, uma arrow function anônima.
- **Impacto:** 
  - Dificulta a depuração (stack traces mostram `<anonymous>` ou `default` ao invés de `AccountForm`).
  - Complica a inspeção com React DevTools.
  - Reduz a legibilidade do código e dificulta importações nomeadas para testes ou refatorações.

### 3. Isolamento de Estilos com Tailwind CSS (Prioridade: Alta)

- **Requisito:** Classes Tailwind devem ser agrupadas em um objeto `styles` ao final do arquivo, utilizando `as const` para garantir imutabilidade. As classes não devem estar espalhadas diretamente no JSX.
- **Documento:** `@docs/guidelines/global.md` - Seção "UI & Styling"
- **Infração:**
  - **Linhas 58-149:** Classes Tailwind estão inseridas diretamente no JSX em múltiplos elementos (`<section>`, `<h2>`, `<Fieldset>`, `<div>`, etc.), violando a diretriz de não usar classes diretamente nos componentes TSX.
  - Exemplos:
    - Linha 58: `className="card gap-4 flex flex-col sm:flex-row"`
    - Linha 60: `className="text-20-bold text-dark-gray"`
    - Linha 67: `className="flex flex-col gap-4 w-full md:max-w-[350px]"`
    - Linha 110: `className='flex flex-col justify-between items-center mt-4 sm:flex-row gap-4'`
    - Linha 136: `className="text-dark max-w-[450px] text-center md:text-left"`
- **Impacto:** 
  - Reduz a manutenibilidade do código, tornando difícil atualizar estilos de forma centralizada.
  - Dificulta a leitura do JSX, misturando lógica de apresentação com estrutura.
  - Viola padrão arquitetural estabelecido no projeto.

### 4. Documentação JSDoc Ausente (Prioridade: Média)

- **Requisito:** A interface de props e a assinatura do componente devem possuir documentação JSDoc clara e completa, descrevendo o propósito, parâmetros e comportamento.
- **Documento:** `@docs/Tech Challenge/component-analysis-prompt.md` - Seção "6. Documentação"
- **Infração:**
  - **Linha 14-16:** A interface `AccountFormProps` não possui documentação JSDoc explicando as props (`onDelete`, `onSubmit`, `defaultValues`).
  - **Linha 18:** O componente principal não possui JSDoc descrevendo seu propósito, uso e exemplos.
- **Impacto:** 
  - Dificulta a compreensão e o uso do componente por outros desenvolvedores.
  - Reduz a qualidade da documentação automática gerada pelo Storybook (`autodocs`).
  - Viola os padrões de documentação do projeto.

### 5. Interface de Props Não Exportada (Prioridade: Média)

- **Requisito:** Interfaces e tipos devem ser exportados para permitir reutilização em outros locais da aplicação.
- **Documento:** `@docs/Tech Challenge/component-analysis-prompt.md` - Seção "2. TypeScript e Tipagem"
- **Infração:**
  - **Linha 14:** A interface `AccountFormProps` não é exportada (`interface AccountFormProps extends FormProps<AccountFormData>`).
- **Impacto:** 
  - Impossibilita a reutilização do tipo em testes, wrappers ou outros componentes que possam precisar tipar props do `AccountForm`.
  - Reduz a flexibilidade e manutenibilidade do código.

### 6. HTML Semântico Inadequado (Prioridade: Média)

- **Requisito:** O componente deve utilizar tags HTML semânticas apropriadas para melhorar acessibilidade e SEO.
- **Documento:** `@docs/Tech Challenge/component-analysis-prompt.md` - Seção "3. Acessibilidade (WCAG)"
- **Infração:**
  - **Linha 58:** O componente utiliza `<section>` como elemento raiz, mas o conteúdo é claramente um formulário (`<form>`). O uso de `<form>` seria mais semântico e melhoraria a acessibilidade, permitindo que leitores de tela identifiquem a área como um formulário.
- **Impacto:** 
  - Reduz a acessibilidade e a semântica do HTML.
  - Leitores de tela não identificam a área como um formulário, dificultando a navegação.
  - Perde benefícios nativos do `<form>` (como submit com Enter, validação nativa do navegador).

### 7. Storybook - argTypes Não Configurados (Prioridade: Média)

- **Requisito:** A story do Storybook deve incluir `argTypes` configurados para descrever e controlar as props no painel de controles.
- **Documento:** `@docs/Tech Challenge/component-analysis-prompt.md` - Seção "6. Documentação"
- **Infração:**
  - **Arquivo:** `AccountForm.stories.tsx` não possui a configuração de `argTypes` no objeto `meta`.
- **Impacto:** 
  - A documentação interativa no Storybook fica incompleta.
  - Reduz a capacidade de testar diferentes combinações de props visualmente.
  - Dificulta a compreensão do comportamento das props para desenvolvedores.

### 8. Comentários em Português (Prioridade: Baixa)

- **Requisito:** Todos os comentários no código devem ser escritos em **inglês**.
- **Documento:** `@docs/guidelines/global.md` - Seção "Best Practices - Comments"
- **Infração:**
  - **Linhas 19, 22, 23, 26, 28, 36, 45:** Comentários estão em português:
    - `// State to delete modal`
    - `// State loadings`
    - `// State for password input in modal`
    - `// State to form`
    - `// Handle delete account`
    - `// Handle submit`
    - `// Show loading` / `// Hide loading` / `// Call onSubmit function`
- **Impacto:** 
  - Inconsistência com as diretrizes globais do projeto.
  - Dificulta a colaboração em equipes internacionais ou com desenvolvedores que não falam português.

---

## ✅ Pontos em Conformidade

1. **TypeScript e Tipagem Forte:** O componente utiliza TypeScript com tipagem forte, sem uso de `any`. As props são bem tipadas através de `AccountFormProps` que estende `FormProps<AccountFormData>`, garantindo segurança de tipos.

2. **Validação com Zod e React Hook Form:** O componente utiliza corretamente o `zodResolver` com `accountSchema` para validação, seguindo as diretrizes do projeto de usar Zod com React Hook Form.

3. **Client Component Apropriado:** A diretiva `'use client'` é aplicada corretamente (linha 1), pois o componente utiliza hooks como `useState` e `useForm`, que exigem execução no cliente.

4. **Separação de Responsabilidades:** O componente delega a lógica de negócio para as props `onSubmit` e `onDelete`, mantendo-se focado na apresentação e gerenciamento de estado local.

5. **Headless UI para Componentes Acessíveis:** Utiliza `Fieldset` do Headless UI (linha 67) para agrupamento semântico de campos de formulário.

6. **Iconografia com lucide-react:** O ícone `Mail` (linha 9) é importado corretamente da biblioteca `lucide-react`, seguindo as diretrizes do projeto.

7. **Storybook Configurado:** O componente possui uma story no Storybook (`AccountForm.stories.tsx`) com a tag `tags: ['autodocs']` para geração automática de documentação.

8. **Gerenciamento de Estado Local:** O componente utiliza `useState` para gerenciar estados específicos da UI (modal de deleção, loading, password), mantendo o estado encapsulado e próximo de onde é usado.

9. **Optional Chaining para Props Opcionais:** O acesso a `defaultValues` (linha 32) é feito de forma segura com spread operator e fallback para objeto vazio.

10. **Componente Reutilizável de Input:** O componente utiliza um componente `Input` customizado e consistente (linha 12), promovendo reutilização e padronização.

11. **Next.js Image Optimization (parcial):** O componente `Illustration` (linha 64) provavelmente utiliza `next/image` internamente, conforme análise do código fonte de `Illustration.tsx`.

---

## 💡 Pontos de Melhoria

### 1. Gerenciamento de Loading Incompleto

**Descrição:** O componente gerencia o estado de loading apenas para o submit do formulário (`loadingSubmit`), mas não gerencia loading para a ação de delete (`onDelete`).

**Por que é um problema:** 
- Quando o usuário clica em "Confirmar" no modal de deleção, não há feedback visual de que a operação está em andamento.
- Se a operação `onDelete` demorar (ex: chamada de API lenta), o usuário pode clicar múltiplas vezes ou achar que nada aconteceu.

**Sugestão:** Adicionar um estado `loadingDelete` e passar para o componente `Modal` através de uma prop de loading.

### 2. Validação de Senha no Modal Inconsistente com Zod

**Descrição:** A validação de senha no modal de deleção (linha 146) é feita manualmente inline (`password.length < 6`), enquanto o restante do formulário utiliza Zod para validação.

**Por que é um problema:**
- Cria inconsistência nos padrões de validação.
- Se as regras de senha mudarem (ex: no schema Zod), a validação do modal não será atualizada automaticamente.
- Lógica de validação espalhada reduz a manutenibilidade.

**Sugestão:** Criar um schema Zod separado para o modal de deleção ou reutilizar a validação de senha do `accountSchema`.

### 3. Responsividade Pode Ser Melhorada

**Descrição:** As classes responsivas são básicas (ex: `sm:flex-row`, `md:max-w-[350px]`), mas o layout pode não se adaptar idealmente em breakpoints intermediários (tablets em modo portrait).

**Por que é um problema:**
- Pode resultar em uma experiência de usuário subótima em dispositivos como tablets (768px-1024px).
- Falta de testes visuais em múltiplos breakpoints pode causar overflow ou espaçamento inadequado.

**Sugestão:** Revisar o layout em breakpoints `md` e `lg`, potencialmente ajustando larguras máximas e direção de flex para otimizar o uso do espaço.

### 4. Falta de Feedback de Erro para onDelete/onSubmit

**Descrição:** O componente não trata erros que possam ser lançados pelas funções `onDelete` ou `onSubmit`. Se uma operação falhar, não há feedback visual para o usuário.

**Por que é um problema:**
- Se `onDelete` ou `onSubmit` lançarem um erro (ex: falha de rede), o usuário não receberá nenhuma notificação.
- O componente ficará em um estado inconsistente (ex: loading ativo para sempre).

**Sugestão:** Envolver as chamadas de `onDelete` e `onSubmit` em blocos `try/catch` e utilizar o `ToastContext` do projeto para exibir mensagens de erro ao usuário.

### 5. Acessibilidade da Ilustração

**Descrição:** O componente `Illustration` (linha 64) não possui um `alt` descritivo, utilizando apenas `src='settings.svg'`.

**Por que é um problema:**
- Se a prop `alt` do componente `Illustration` não for passada, o texto alternativo pode ser genérico ou ausente.
- Usuários de leitores de tela não saberão o contexto ou significado da ilustração.

**Sugestão:** Passar uma prop `alt` descritiva, como `alt="Ilustração de configurações de conta do Bytebank"` ou `alt=""` se a imagem for puramente decorativa.

### 6. Campos de Senha sem Toggle de Visibilidade no Modal

**Descrição:** O input de senha no modal de deleção (linha 140-147) não possui um toggle de visibilidade (ícone de olho), diferentemente de como é implementado no componente `Input` (ver `Input.tsx` linhas 96-103).

**Por que é um problema:**
- Inconsistência de UX: no formulário principal, os campos de senha têm toggle de visibilidade, mas no modal não.
- Usuários podem errar a digitação da senha e não têm como verificar antes de enviar.

**Sugestão:** O componente `Input` já suporta `type="password"` com toggle automático. Garantir que o mesmo comportamento está sendo aplicado no modal.

---

## 📋 Plano de Ação

### 1. Adicionar Atributos ARIA para Acessibilidade (Prioridade: Crítica)

**Ação:**
- Adicionar `aria-label` descritivo aos botões:

```typescript
<Button
  variant="orange"
  onClick={() => setIsDeleteOpen(true)}
  aria-label="Excluir permanentemente minha conta do Bytebank"
>
  Excluir conta
</Button>

<Button
  variant="blue"
  onClick={handleSubmit(handleFormSubmit)}
  loading={loadingSubmit}
  aria-label="Salvar alterações da minha conta"
>
  Salvar alterações
</Button>
```

- Verificar se o componente `Modal` possui os atributos ARIA necessários. Caso não possua, adicionar:

```typescript
// No componente Modal (Modal.tsx)
<div role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description">
  <h2 id="modal-title">{title}</h2>
  <div id="modal-description">{children}</div>
</div>
```

- Adicionar `aria-disabled` ao botão de submit do modal quando desabilitado.

### 2. Renomear Componente para Exportação Explícita (Prioridade: Alta)

**Ação:** Refatorar a exportação do componente (linha 18) para usar uma função nomeada:

```typescript
export default function AccountForm({ onDelete, onSubmit, defaultValues }: AccountFormProps) {
  // ... resto do código
}
```

### 3. Isolar Classes Tailwind em Objeto de Estilos (Prioridade: Alta)

**Ação:** Criar um objeto `styles` ao final do arquivo e substituir todas as classes inline por referências ao objeto:

```typescript
// Ao final do arquivo, antes do export
/**
 * AccountForm component styles
 */
const styles = {
  container: `card gap-4 flex flex-col sm:flex-row`,
  title: `text-20-bold text-dark-gray`,
  illustration: ``,
  fieldset: `flex flex-col gap-4 w-full md:max-w-[350px]`,
  buttonContainer: `flex flex-col justify-between items-center mt-4 sm:flex-row gap-4`,
  modalDescription: `text-dark max-w-[450px] text-center md:text-left`,
} as const;
```

Depois, substituir no JSX:

```typescript
<section className={styles.container}>
  <h2 className={styles.title}>Minha conta</h2>
  <Fieldset className={styles.fieldset}>
    {/* ... */}
  </Fieldset>
</section>
```

### 4. Adicionar Documentação JSDoc (Prioridade: Média)

**Ação:** Documentar a interface e o componente:

```typescript
/**
 * AccountForm component props
 * @interface AccountFormProps
 */
export interface AccountFormProps extends FormProps<AccountFormData> {
  /** Callback function triggered when user confirms account deletion. Receives the user's password for verification. */
  onDelete: (password: string) => Promise<void>;
}

/**
 * AccountForm component for managing user account settings
 * 
 * Allows users to:
 * - Update their name, password
 * - Delete their account (with password confirmation)
 * 
 * Uses React Hook Form with Zod validation for form management
 * 
 * @param props - AccountForm component props
 * @returns A form component for account management
 * 
 * @example
 * ```tsx
 * <AccountForm
 *   defaultValues={{ name: 'John Doe', email: 'john@example.com' }}
 *   onSubmit={handleAccountUpdate}
 *   onDelete={handleAccountDelete}
 * />
 * ```
 */
export default function AccountForm({ onDelete, onSubmit, defaultValues }: AccountFormProps) {
  // ... código do componente
}
```

### 5. Exportar Interface AccountFormProps (Prioridade: Média)

**Ação:** Adicionar `export` à interface (linha 14):

```typescript
export interface AccountFormProps extends FormProps<AccountFormData> {
  onDelete: (password: string) => Promise<void>;
}
```

### 6. Substituir `<section>` por `<form>` (Prioridade: Média)

**Ação:** Refatorar o elemento raiz para usar `<form>` e integrar com React Hook Form:

```typescript
<form onSubmit={handleSubmit(handleFormSubmit)} className={styles.container}>
  {/* ... conteúdo do formulário ... */}
  
  <div className={styles.buttonContainer}>
    <Button
      type="button"
      variant="orange"
      onClick={() => setIsDeleteOpen(true)}
    >
      Excluir conta
    </Button>

    <Button
      type="submit"
      variant="blue"
      loading={loadingSubmit}
    >
      Salvar alterações
    </Button>
  </div>
</form>
```

### 7. Configurar argTypes no Storybook (Prioridade: Média)

**Ação:** Atualizar `AccountForm.stories.tsx`:

```typescript
const meta: Meta<typeof AccountForm> = {
  component: AccountForm,
  tags: ['autodocs'],
  argTypes: {
    onSubmit: {
      description: 'Callback triggered when form is submitted',
      action: 'submitted',
    },
    onDelete: {
      description: 'Callback triggered when account deletion is confirmed',
      action: 'deleted',
    },
    defaultValues: {
      description: 'Default values for the form fields',
      control: 'object',
    },
  },
};
```

### 8. Traduzir Comentários para Inglês (Prioridade: Baixa)

**Ação:** Substituir todos os comentários em português por inglês:

```typescript
// State for delete modal
const [isDeleteOpen, setIsDeleteOpen] = useState(false);

// Loading state for form submission
const [loadingSubmit, setLoadingSubmit] = useState(false);

// Password input state for modal
const [password, setPassword] = useState('');

// Form state management
const { register, handleSubmit, formState: { errors } } = useForm<AccountFormData>({
  resolver: zodResolver(accountSchema),
  defaultValues: {
    ...(defaultValues || {})
  },
});

// Handle account deletion
const handleDelete = async () => {
  // Close modal
  setIsDeleteOpen(false);

  // Call delete callback
  await onDelete(password);
};

// Handle form submission
const handleFormSubmit = async (data: AccountFormData) => {
  // Show loading state
  setLoadingSubmit(true);

  // Call submit callback
  await onSubmit(data);

  // Hide loading state
  setLoadingSubmit(false);
};
```

### 9. Adicionar Gerenciamento de Loading para Delete (Prioridade: Média)

**Ação:** Adicionar estado de loading e tratamento de erro:

```typescript
const [loadingDelete, setLoadingDelete] = useState(false);

const handleDelete = async () => {
  try {
    setLoadingDelete(true);
    setIsDeleteOpen(false);
    await onDelete(password);
  } catch (error) {
    // Use ToastContext to show error message
    console.error('Failed to delete account:', error);
  } finally {
    setLoadingDelete(false);
  }
};
```

E passar o loading para o Modal (verificar se o componente Modal suporta essa prop).

### 10. Adicionar Tratamento de Erro (Prioridade: Média)

**Ação:** Adicionar try/catch em `handleFormSubmit`:

```typescript
const handleFormSubmit = async (data: AccountFormData) => {
  try {
    setLoadingSubmit(true);
    await onSubmit(data);
    // Optional: Show success toast
  } catch (error) {
    // Use ToastContext to show error message
    console.error('Failed to update account:', error);
  } finally {
    setLoadingSubmit(false);
  }
};
```

---

## 📊 Mapeamento

**Arquivo:** `src/components/form/AccountForm/AccountForm.tsx`  
**Status:** ✅ Criado  
**Link:** `@docs/Tech Challenge/analysis-mapping.md`

---

**Data da Análise:** 2025-11-08  
**Analisado por:** Sistema de Análise Arquitetural Automatizada  
**Versão do Documento:** 1.0

