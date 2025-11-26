# Prompt de Análise Arquitetural de Código (Hooks, Serviços, etc.)

Leia o @docs/analysis/base-analysis-prompt.md antes de ler este documento.

---

## Critérios de Avaliação de Código

### 1. Nomenclatura e Estrutura de Arquivos
- **Convenção de Nomenclatura:**
    - **Hooks:** `useCamelCase`.
    - **Funções/Variáveis:** `camelCase`.
    - **Arquivos:** `lowercase-hyphenated.ts` ou `camelCase.ts` conforme o padrão do diretório.
- **Exportação:** Funções e variáveis são exportadas de forma explícita (`export const functionName = (...)`).
- **Tipos e Interfaces:** Tipos e interfaces são definidos com nomes descritivos e exportados para reutilização.

### 2. TypeScript e Tipagem
- **Tipagem Forte:** O código é estritamente tipado, sem o uso de `any`.
- **Reutilização de Tipos:** Interfaces e tipos são exportados para permitir sua reutilização em outros locais da aplicação.
- **Uso de Genéricos:** Genéricos são utilizados quando apropriado para criar funções e hooks flexíveis e reutilizáveis.
- **Tipos de Retorno:** Funções e hooks têm tipos de retorno explícitos.

### 3. Performance
- **Memoização:** `useMemo` e `useCallback` (em hooks) são utilizados de forma criteriosa para evitar cálculos ou recriações de funções desnecessárias.
- **Lógica Eficiente:** O código é escrito de forma a ser performático, evitando loops desnecessários, manipulações de dados complexas e ineficientes.
- **Side Effects:** Em hooks, `useEffect` é utilizado de forma controlada, com um array de dependências bem definido.

### 4. Documentação
- **JSDoc:** Funções, hooks e tipos exportados possuem documentação JSDoc clara e completa, explicando seu propósito, parâmetros e retorno.
- **Comentários:** O código contém comentários que agregam valor, explicando lógicas de negócio complexas ou decisões de implementação importantes.

### 5. Boas Práticas e Princípios de Design
- **Responsabilidade Única (SRP):** Cada função, hook ou serviço tem uma responsabilidade única e bem definida.
- **Clean Code:** O código é legível, conciso e de fácil manutenção.
- **Acoplamento:** O código busca baixo acoplamento, dependendo de abstrações em vez de implementações concretas sempre que possível.
- **Imutabilidade:** O estado e os dados são tratados como imutáveis para evitar efeitos colaterais inesperados.
