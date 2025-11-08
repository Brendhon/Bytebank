# Prompt de Análise Arquitetural de Componentes

## Objetivo

Analisar componentes React/TypeScript verificando conformidade com requisitos arquiteturais em `@docs/architecture/*` e `@docs/guidelines/global.md`.

---

## Documentos de Referência

1. `@docs/guidelines/global.md` - Diretrizes globais (TypeScript, Next.js, Tailwind, documentação)
2. `@docs/architecture/modular-architecture.md` - Modularidade e Clean Architecture
3. `@docs/architecture/performance-optimization.md` - Performance e otimização
4. `@docs/architecture/security.md` - Segurança
5. `@docs/architecture/state-management.md` - Gerenciamento de estado

> **⚠️ Não avaliar:** Testes e Internacionalização (i18n)

---

## Critérios de Avaliação

### 1. Nomenclatura e Estrutura
- Exportação com nome explícito (`export default function ComponentName()`)
- Interfaces/tipos descritivos e exportados
- Convenções: PascalCase (componentes), camelCase (funções/variáveis)

### 2. TypeScript
- Tipagem forte (sem `any`)
- Interfaces exportadas para reutilização
- Genéricos quando aplicável

### 3. Acessibilidade (WCAG)
- Atributos ARIA apropriados (`role`, `aria-label`, `aria-live`, etc.)
- HTML semântico (`scope`, `caption`, `alt`)
- Navegação por teclado e screen readers

### 4. Estilos e UI
- Tailwind CSS conforme diretrizes
- Estilos isolados em objeto `styles` (template literals com `as const`)
- Função `cn` para classes condicionais
- Responsividade
- `next/image`, `lucide-react`, Headless UI quando apropriado

### 5. Performance
- `useMemo`/`useCallback` apenas quando necessário
- `'use client'` apenas se necessário
- Evita `useEffect` desnecessários

### 6. Documentação
- JSDoc completo (interface e componente)
- Storybook com `tags: ['autodocs']` e `argTypes`
- Comentários que agregam valor

### 7. Boas Práticas React
- Keys de lista com IDs únicos (não `index`)
- Props opcionais com optional chaining
- Separação adequada de responsabilidades

---

## Estrutura do Documento `analysis.md`

Criar arquivo `analysis.md` no **mesmo diretório do componente**:

```markdown
# Análise Arquitetural: Componente [Nome]

## 📋 Resumo Executivo
**Status:** [✅ Excelente (95-100%) / ✅ Bom (70-94%) / ⚠️ Requer Atenção (50-69%) / 🔴 Crítico (<50%)]
[Parágrafo resumindo estado geral, pontos fortes/fracos, violações críticas]
**Conformidade:** [X%]

## 🚨 Requisitos Técnicos Infringidos
> Se não houver: "Nenhum requisito técnico infringido."

### [Número]. [Nome] (Prioridade: Crítica/Alta/Média/Baixa)
- **Requisito:** [O que é esperado]
- **Documento:** `@docs/[caminho]` - Seção "[seção]"
- **Infração:** [O que está errado]
- **Impacto:** [Consequências]

## Pontos em Conformidade
1. **[Categoria]:** [Descrição]

## Pontos de Melhoria
1. **[Nome]:** [Descrição e por que é problema]

## Plano de Ação
### 1. [Nome] (Prioridade: Crítica/Alta/Média/Baixa)
- [Descrição]
- Código exemplo (se aplicável)

## 📊 Mapeamento
**Arquivo:** `[caminho relativo a src]`  
**Status:** [✅ Criado / ⚠️ Pendente / ❌ Não criado]  
**Link:** `@docs/Tech Challenge/analysis-mapping.md`
```

**Prioridades:**
- **Crítica**: Bugs que impedem funcionalidade ou violam WCAG/segurança
- **Alta**: Dificulta manutenção/debugging
- **Média**: Não segue padrões mas não afeta funcionalidade
- **Baixa**: Melhorias opcionais

---

## Instruções de Execução

1. **Leia o componente**: `.tsx`, `.stories.tsx`, tipos relacionados
2. **Consulte documentos**: `@docs/architecture/*` e `@docs/guidelines/global.md`
3. **Avalie critérios**: Identifique conformidade ✅, infrações ❌, melhorias 💡
4. **Calcule conformidade**: (conformes / total) × 100
5. **Crie `analysis.md`**: Português brasileiro, específico, objetivo
6. **Atualize mapping**: Marque "Analysis Criado" ✅ e "Implementado" ⚠️/✅ em `@docs/Tech Challenge/analysis-mapping.md`

---

## Observações

- Cite linhas de código quando relevante
- Foque em melhorias acionáveis
- Sempre cite documento de referência e seção específica
- Mantenha mapping atualizado após criar análise ou implementar melhorias