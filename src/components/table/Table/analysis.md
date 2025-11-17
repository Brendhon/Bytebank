# Análise Arquitetural: Componente Table

## 📋 Resumo Executivo

**Status Geral:** ✅ Bom (com melhorias recomendadas)

O componente Table é bem implementado, demonstrando uso adequado de genéricos TypeScript, hooks (`useState`, `useMemo`) e boas práticas de componentização. Utiliza corretamente paginação integrada e renderização customizável por coluna. As principais oportunidades de melhoria concentram-se em **nomenclatura** (exportação sem nome e tipo genérico não nomeado), **comentários excessivos**, **acessibilidade** (atributos ARIA para tabela e paginação), **textos hardcoded em português** e **isolamento de estilos**. Não há violações críticas.

**Conformidade com Requisitos Técnicos:** 75%

---

## 🚨 Requisitos Técnicos Infringidos

### 1. **Nomenclatura de Componentes** (Prioridade: Alta)
- **Requisito:** Componentes devem ter nomes explícitos para facilitar debugging e rastreamento
- **Documento:** `@docs/guidelines/global.md` - Seção "Naming" + "Code Style"
- **Infração:** Exportação padrão sem nome explícito na função (`export const Table = <T,>({ ... }) => { ... }`)
- **Impacto:** Dificulta debugging em React DevTools e stack traces

### 2. **Nomenclatura de Tipos** (Prioridade: Alta)
- **Requisito:** Tipos devem ter nomes descritivos e exportáveis para reutilização
- **Documento:** `@docs/guidelines/global.md` - Seção "TypeScript"
- **Infração:** Tipo `GenericTableProps` não está exportado, limitando reutilização
- **Impacto:** Outros componentes não podem referenciar o tipo externamente

### 3. **Internacionalização** (Prioridade: Alta)
- **Requisito:** Textos de UI devem ser externalizáveis para suportar i18n
- **Documento:** `@docs/guidelines/global.md` - Boas práticas de desenvolvimento
- **Infração:** Texto hardcoded "Nenhum dado encontrado" em português (linha 63)
- **Impacto:** Dificulta internacionalização; não segue padrão se o projeto for multi-idioma

### 4. **Acessibilidade (ARIA)** (Prioridade: Alta)
- **Requisito:** Componentes de UI devem ser acessíveis com atributos ARIA apropriados
- **Documento:** `@docs/guidelines/global.md` - Seção "UI & Styling" (acessibilidade)
- **Infração:** Falta de atributos semânticos e ARIA para tabelas (`aria-label`, `caption`, `scope`)
- **Impacto:** Usuários de screen readers não recebem contexto adequado sobre a estrutura da tabela

### 5. **Isolamento de Estilos** (Prioridade: Média)
- **Requisito:** Estilos devem ser isolados em objeto no final do arquivo
- **Documento:** `@docs/guidelines/global.md` - "Create a const at the end of the file with the styles"
- **Infração:** Classes CSS inline e `cellClassName` misturadas no corpo do componente (linha 38)
- **Impacto:** Não segue princípios de Clean Architecture; dificulta manutenção de estilos

### 6. **Comentários Excessivos** (Prioridade: Média)
- **Requisito:** Código deve ser autoexplicativo; comentários devem agregar valor contextual
- **Documento:** `@docs/guidelines/global.md` - Princípio de "Code Style"
- **Infração:** Múltiplos comentários redundantes (linhas 19, 22, 25-34, 37, 58, 69)
- **Impacto:** Poluição visual; comentários não agregam informação além do que o código expressa

### 7. **Keys em Listas** (Prioridade: Média)
- **Requisito:** Keys de listas devem ser estáveis e únicas
- **Documento:** React Best Practices
- **Infração:** Uso de `index` como key para linhas da tabela (linha 72: `key={rowIndex}`)
- **Impacto:** Pode causar problemas de renderização e performance em listas dinâmicas

---

## Pontos em Conformidade

1. **Modularidade e Estrutura de Diretórios:**
   - O componente está corretamente posicionado em `@/components/table/Table/`, seguindo a estrutura modular.
   - Organizado com componente e stories no mesmo diretório.

2. **TypeScript e Tipagem Genérica:**
   - Utiliza genéricos TypeScript (`<T>`) de forma adequada para criar tabela reutilizável.
   - Tipo `GenericTableProps<T>` bem definido com propriedades claras.
   - Usa `TableColumn<T>` de tipos centralizados.

3. **Client Component Adequado:**
   - Corretamente marcado como `'use client'` pois usa hooks e estado.

4. **Componentização e Reutilização:**
   - Componente genérico altamente reutilizável para diferentes tipos de dados.
   - Sistema de renderização customizável por coluna através da prop `render`.
   - Integração com componente `Paginator` de forma modular.

5. **Performance:**
   - Uso adequado de `useMemo` para evitar recálculos desnecessários de dados paginados.
   - Cálculo eficiente de paginação client-side.

6. **Paginação Condicional:**
   - Implementa lógica inteligente para mostrar paginador apenas quando necessário.
   - Suporta modo sem paginação (todos os dados).

7. **Estado de Vazio:**
   - Trata adequadamente o caso de dados vazios com mensagem informativa.

8. **Documentação em Storybook:**
   - Possui stories demonstrando diferentes casos de uso.
   - Inclui `tags: ['autodocs']`.

9. **Responsividade:**
   - Usa `overflow-x-auto` para garantir que tabelas largas sejam scrolláveis.

---

## Pontos de Melhoria

1. **Exportação do Componente:**
   - O componente está sendo exportado como `export default` sem nome explícito.
   - Dificulta debugging em ferramentas de desenvolvimento.

2. **Tipo Não Exportado:**
   - Tipo `GenericTableProps` não está exportado, limitando reutilização.
   - Outros componentes não podem referenciar o tipo.

3. **Texto Hardcoded:**
   - "Nenhum dado encontrado" está hardcoded em português.
   - Deveria ser uma prop configurável ou usar sistema de i18n.

4. **Acessibilidade:**
   - Falta de `aria-label` ou `caption` para descrever a tabela.
   - Células de cabeçalho não têm `scope="col"`.
   - Falta de `role` ou atributos ARIA para melhorar navegação por screen readers.

5. **Isolamento de Estilos:**
   - Classes CSS inline misturadas no corpo do componente.
   - Não segue diretriz de isolar estilos em objeto no final do arquivo.

6. **Comentários Redundantes:**
   - Múltiplos comentários que apenas descrevem o que o código já demonstra.
   - Aumenta verbosidade sem agregar valor.

7. **Keys de Lista com Index:**
   - Usa `rowIndex` como key, o que pode causar problemas se os dados forem reordenados.
   - Idealmente deveria usar um identificador único do objeto.

8. **Falta de Documentação JSDoc:**
   - Ausência de JSDoc na interface e no componente.
   - Prejudica experiência do desenvolvedor.

9. **Prop `pageSize` Opcional mas com Default:**
   - Comentário diz "If omitted, no pagination" mas há default de 10.
   - Inconsistência entre comentário e implementação.

---

## Plano de Ação

### 1. Refatorar Nomenclatura
**Prioridade: Alta**

- Adicionar nome explícito ao componente:
  ```typescript
  export const Table = <T>({ data, columns, pageSize = 10 }: TableProps<T>) => {
    // ...
  }
  ```
- Exportar o tipo:
  ```typescript
  export interface TableProps<T> {
    data: T[];
    columns: TableColumn<T>[];
    pageSize?: number;
    emptyMessage?: string; // Adicionar para i18n
  }
  ```

### 2. Melhorar Acessibilidade
**Prioridade: Alta**

- Adicionar atributos ARIA e semânticos:
  ```typescript
  <table className="w-full" role="table" aria-label="Data table">
    <caption className="sr-only">Table displaying {data.length} items</caption>
    <thead>
      <tr>
        {columns.map((col, idx) => (
          <th key={idx} scope="col" className={...}>
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  </table>
  ```

### 3. Adicionar Prop para Texto Vazio
**Prioridade: Alta**

- Tornar mensagem de "vazio" configurável:
  ```typescript
  export interface TableProps<T> {
    // ...
    emptyMessage?: string;
  }
  
  // No componente
  {data.length === 0 && (
    <tr>
      <td colSpan={columns.length} className="text-center py-4">
        <span className="text-gray">
          {emptyMessage || 'No data available'}
        </span>
      </td>
    </tr>
  )}
  ```

### 4. Isolar Estilos
**Prioridade: Média**

- Mover classes para objeto `styles` no final do arquivo:
  ```typescript
  const styles = {
    container: `flex flex-col gap-4`,
    tableWrapper: `overflow-x-auto bg-white border border-gray rounded-sm`,
    table: `w-full`,
    thead: `bg-light-green border-b border-gray`,
    cell: `px-8 w-[200px] h-[50px] text-dark text-left`,
    headerCell: `text-16-semi h-[40px]`,
    bodyCell: `text-14`,
    row: `hover:opacity-70 transition-opacity duration-200`,
    emptyCell: `text-center py-4`,
    paginatorWrapper: `flex justify-end`,
  } as const;
  ```

### 5. Remover Comentários Redundantes
**Prioridade: Média**

- Remover comentários das linhas 19, 22, 25-34, 37, 58, 69.
- Manter apenas comentários que expliquem decisões de design.

### 6. Melhorar Keys de Lista
**Prioridade: Média**

- Adicionar prop `rowKey` para identificador único:
  ```typescript
  export interface TableProps<T> {
    // ...
    rowKey?: keyof T | ((row: T, index: number) => string | number);
  }
  
  // No componente
  {pagedData.map((row, rowIndex) => {
    const key = typeof rowKey === 'function' 
      ? rowKey(row, rowIndex) 
      : row[rowKey] || rowIndex;
    
    return (
      <tr key={key} className={styles.row}>
        {/* ... */}
      </tr>
    );
  })}
  ```

### 7. Adicionar Documentação JSDoc
**Prioridade: Baixa**

- Adicionar JSDoc ao tipo e componente:
  ```typescript
  /**
   * Generic table component with pagination support
   * @template T - Type of data objects to display
   * @param data - Array of data objects to display in the table
   * @param columns - Column definitions with labels and accessors
   * @param pageSize - Number of items per page (default: 10, omit for no pagination)
   * @param emptyMessage - Message to display when data is empty
   * @param rowKey - Unique key for each row (function or property name)
   */
  ```

### 8. Corrigir Inconsistência de PageSize
**Prioridade: Baixa**

- Clarificar comportamento do `pageSize`:
  ```typescript
  // Opção 1: Default undefined (sem paginação)
  pageSize?: number; // Se omitido, sem paginação
  
  // Opção 2: Manter default 10 e ajustar comentário
  pageSize?: number; // Default: 10
  ```

### 9. Adicionar Prop para Classes Customizáveis (Opcional)
**Prioridade: Baixa**

- Permitir customização de estilos:
  ```typescript
  export interface TableProps<T> {
    // ...
    className?: string;
    tableClassName?: string;
    headerClassName?: string;
  }
  ```

### 10. Considerar Loading State (Opcional)
**Prioridade: Baixa**

- Adicionar suporte para estado de loading:
  ```typescript
  export interface TableProps<T> {
    // ...
    loading?: boolean;
    loadingMessage?: string;
  }
  
  {loading && (
    <tr>
      <td colSpan={columns.length} className="text-center py-4">
        <span className="text-gray">{loadingMessage || 'Loading...'}</span>
      </td>
    </tr>
  )}
  ```

