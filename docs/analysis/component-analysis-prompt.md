# Prompt de Análise Arquitetural de Componentes

Leia e siga as diretrizes do @docs/analysis/base-analysis-prompt.md antes de ler este documento.

---

## Critérios de Avaliação de Componentes

### 1. Nomenclatura e Estrutura de Arquivos
- **Convenção de Nomenclatura:** O nome do componente segue o padrão `PascalCase`.
- **Exportação:** O componente é exportado de forma explícita (`export const ComponentName = (...)` ou `export default function ComponentName()`).
- **Tipos e Interfaces:** As props e outros tipos são definidos em interfaces com nomes descritivos (e.g., `ComponentNameProps`) e exportados para reutilização.

### 2. TypeScript e Tipagem
- **Tipagem Forte:** O código é estritamente tipado, sem o uso de `any`.
- **Reutilização de Tipos:** Interfaces e tipos são exportados para permitir sua reutilização em outros locais da aplicação.
- **Uso de Genéricos:** Genéricos são utilizados quando apropriado para criar componentes flexíveis e reutilizáveis.

### 3. Acessibilidade (WCAG)
- **Atributos ARIA:** Atributos ARIA (`role`, `aria-label`, `aria-live`, etc.) são aplicados corretamente para garantir a acessibilidade de elementos não-semânticos ou dinâmicos.
- **HTML Semântico:** O componente utiliza tags HTML semânticas apropriadas (e.g., `scope` para tabelas, `caption`, `alt` para imagens).
- **Navegabilidade:** O componente é totalmente navegável e funcional utilizando apenas o teclado e é compatível com leitores de tela.

### 4. Estilos e UI
- **Tailwind CSS:** O estilo é implementado exclusivamente com Tailwind CSS, seguindo as diretrizes do projeto.
- **Isolamento de Estilos:** As classes do Tailwind são agrupadas em um objeto `styles` no final do arquivo, utilizando `as const` para garantir a imutabilidade.
- **Classes Condicionais:** A função `cn` (ou similar) é utilizada para aplicar classes de forma condicional e legível.
- **Responsividade:** O componente é totalmente responsivo e se adapta a diferentes tamanhos de tela.
- **Recursos Visuais:**
    - **Imagens:** Utiliza o componente `next/image` para otimização de imagens.
    - **Ícones:** Utiliza a biblioteca `lucide-react` para iconografia.
    - **Componentes Primitivos:** Utiliza Headless UI para construir componentes complexos e acessíveis.

### 5. Performance
- **Memoização:** `useMemo` e `useCallback` são utilizados de forma criteriosa, apenas quando há um ganho de performance claro e mensurável.
- **Client Components:** A diretiva `'use client'` é aplicada apenas quando estritamente necessário (e.g., uso de hooks como `useState` ou `useEffect`).
- **Side Effects:** `useEffect` é utilizado de forma controlada, com um array de dependências bem definido para evitar execuções desnecessárias.

### 6. Documentação
- **JSDoc:** A interface de props e a assinatura do componente possuem documentação JSDoc clara e completa.
- **Storybook:**
    - O componente possui uma story no Storybook.
    - A story inclui a tag `tags: ['autodocs']` para geração automática de documentação.
    - `argTypes` são configurados para descrever e controlar as props no Storybook.
- **Comentários:** O código contém comentários que agregam valor, explicando lógicas complexas ou decisões de implementação importantes.

### 7. Boas Práticas de React
- **Keys de Lista:** Ao renderizar listas, `keys` únicas e estáveis (preferencialmente IDs) são utilizadas em vez do índice do array.
- **Props Opcionais:** O acesso a props opcionais é feito de forma segura, utilizando optional chaining (`?.`).
- **Separação de Responsabilidades:** O componente tem uma responsabilidade única e bem definida, delegando lógicas de negócio para hooks ou serviços.
